<!-- docs/components/ProgramParser.vue -->
<script setup>
import { ref, onMounted, computed } from 'vue'

const programs = ref({
  workers: [],
  specialists: []
})
const loading = ref(true)
const error = ref(null)

// Данные для управления расширяемыми ячейками
const expandedCell = ref(null)
const expandedItems = ref([])

// Фильтры и группировка
const selectedYears = ref([])
const selectedCodes = ref([])
const groupByYear = ref(true)
const showFilters = ref(false)

onMounted(async () => {
  try {
    const allPdfFiles = import.meta.glob('../program/**/*.pdf', {
      as: 'url',
      eager: true
    })

    const programsMap = {}

    for (const [path, url] of Object.entries(allPdfFiles)) {
      const parts = path.split('/')
      const year = parts[parts.length - 3]
      const code = parts[parts.length - 2]
      const fileName = parts[parts.length - 1].toLowerCase()

      if (!programsMap[`${year}/${code}`]) {
        programsMap[`${year}/${code}`] = {
          year,
          code,
          files: []
        }
      }

      programsMap[`${year}/${code}`].files.push({
        fileName,
        url
      })
    }

    for (const programKey in programsMap) {
      const { year, code, files } = programsMap[programKey]

      const metadataUrl = `/docs/program/${year}/${code}/metadata.txt`
      const metadataResponse = await fetch(metadataUrl)
      const metadataContent = await metadataResponse.text()
      const metadata = parseMetadata(metadataContent)

      const programType = code.split('.')[1] === '01' ? 'workers' : 'specialists'

      const program = {
        code,
        year,
        ...metadata,
        ...categorizeFiles(files, code, metadata.group || '', year, metadata.materialsLink)
      }

      programs.value[programType].push(program)
    }

    programs.value.workers.sort((a, b) => a.code.localeCompare(b.code))
    programs.value.specialists.sort((a, b) => a.code.localeCompare(b.code))

  } catch (e) {
    error.value = 'Ошибка загрузки данных о программах'
    console.error('ProgramParser error:', e)
  } finally {
    loading.value = false
  }
})

// Вычисляемые свойства для уникальных годов и кодов
const uniqueYears = computed(() => {
  const years = new Set()
  programs.value.workers.forEach(p => years.add(p.year))
  programs.value.specialists.forEach(p => years.add(p.year))
  return Array.from(years).sort((a, b) => b - a) // Сортировка по убыванию
})

const uniqueCodes = computed(() => {
  const codes = new Set()
  programs.value.workers.forEach(p => codes.add(p.code))
  programs.value.specialists.forEach(p => codes.add(p.code))
  return Array.from(codes).sort()
})

// Группировка программ по годам
const groupedWorkers = computed(() => {
  if (!groupByYear.value) return { 'Все программы': filterPrograms(programs.value.workers) }

  const groups = {}
  filterPrograms(programs.value.workers).forEach(program => {
    if (!groups[program.year]) {
      groups[program.year] = []
    }
    groups[program.year].push(program)
  })
  return groups
})

const groupedSpecialists = computed(() => {
  if (!groupByYear.value) return { 'Все программы': filterPrograms(programs.value.specialists) }

  const groups = {}
  filterPrograms(programs.value.specialists).forEach(program => {
    if (!groups[program.year]) {
      groups[program.year] = []
    }
    groups[program.year].push(program)
  })
  return groups
})

function filterPrograms(programs) {
  if (selectedYears.value.length === 0 && selectedCodes.value.length === 0) {
    return programs
  }

  return programs.filter(program => {
    const yearMatch = selectedYears.value.length === 0 || selectedYears.value.includes(program.year)
    const codeMatch = selectedCodes.value.length === 0 || selectedCodes.value.includes(program.code)
    return yearMatch && codeMatch
  })
}

function toggleYearSelection(year) {
  const index = selectedYears.value.indexOf(year)
  if (index === -1) {
    selectedYears.value.push(year)
  } else {
    selectedYears.value.splice(index, 1)
  }
}

function toggleCodeSelection(code) {
  const index = selectedCodes.value.indexOf(code)
  if (index === -1) {
    selectedCodes.value.push(code)
  } else {
    selectedCodes.value.splice(index, 1)
  }
}

function resetFilters() {
  selectedYears.value = []
  selectedCodes.value = []
}

function selectAllYears() {
  selectedYears.value = uniqueYears.value.slice()
}

function selectAllCodes() {
  selectedCodes.value = uniqueCodes.value.slice()
}

function parseMetadata(content) {
  const lines = content.split('\n')
  const metadata = {}

  lines.forEach(line => {
    const [key, value] = line.split(':').map(item => item.trim())
    if (key && value) {
      metadata[key.toLowerCase()] = value
    }
  })

  // Обработка относительного пути для методических материалов
  let materialsLink = metadata['методические материалы'] || ''
  if (materialsLink.startsWith('./')) {
    materialsLink = materialsLink.substring(2) // Удаляем './' в начале
  }

  return {
    type: metadata['тип программы'] || '',
    name: metadata['наименование профессий, специальностей'] || '',
    duration: metadata['срок обучения'] || '',
    form: metadata['форма обучения'] || '',
    group: metadata['группа'] || '',
    materialsLink
  }
}

function extractYearFromGroup(group) {
  const match = group.match(/-(\d{2})$/)
  if (match) {
    return '20' + match[1]
  }
  return null
}

function categorizeFiles(files, code, group, defaultYear, materialsLink) {
  const categorized = {
    description: { url: '', exists: false, displayName: '' },
    curriculum: { url: '', exists: false, displayName: '' },
    schedule: { url: '', exists: false, displayName: '' },
    annotations: { url: '', exists: false, displayName: '' },
    disciplines: { url: '', exists: false, displayName: '' },
    methods: [],
    education: [],
    materialsLink: { 
      url: materialsLink ? `../program/${defaultYear}/${code}/${materialsLink}` : '', 
      exists: !!materialsLink, 
      displayName: `Методические материалы ${group}` 
    }
  }

  const codeLower = code.toLowerCase()
  const yearFromGroup = extractYearFromGroup(group) || defaultYear

  files.forEach(file => {
    const fileName = file.fileName.toLowerCase()

    if (fileName.startsWith(`${yearFromGroup}_описание_${codeLower}`)) {
      categorized.description = {
        url: file.url,
        exists: true,
        displayName: `Основная образовательная программа ${code} ООП СПО ${yearFromGroup}`
      }
    } else if (fileName.startsWith(`${yearFromGroup}_учебный_план_${codeLower}`)) {
      categorized.curriculum = {
        url: file.url,
        exists: true,
        displayName: `Учебный план ${group}`
      }
    } else if (fileName.startsWith(`${yearFromGroup}_график_${codeLower}`)) {
      categorized.schedule = {
        url: file.url,
        exists: true,
        displayName: `Календарные учебные графики ${group}`
      }
    } else if (fileName.startsWith(`${yearFromGroup}_аннотации_${codeLower}`)) {
      categorized.annotations = {
        url: file.url,
        exists: true,
        displayName: `Аннотации к рабочим программам ${yearFromGroup}`
      }
    } else if (fileName.startsWith(`${yearFromGroup}_рабочие_программы_${codeLower}`)) {
      categorized.disciplines = {
        url: file.url,
        exists: true,
        displayName: `Рабочие программы по дисциплинам ${yearFromGroup}`
      }
    } else if (fileName.startsWith(`${yearFromGroup}_воспитание_${codeLower}_`)) {
      const parts = fileName.split('_')
      const fileNumber = parts[parts.length - 1].split('.')[0]

      let eduType = ''
      switch(fileNumber) {
        case '1':
          eduType = 'Программа воспитательной работы'
          break
        case '2':
          eduType = 'Рабочие программы воспитания. Календарные планы воспитательной работы.'
          break
        default:
          eduType = 'Программа воспитательной работы'
      }

      categorized.education.push({
        url: file.url,
        exists: true,
        displayName: eduType
      })
    }
  })

  return categorized
}

function expandCell(event, items, cellId) {
  if (items.length <= 1) return

  expandedCell.value = cellId
  expandedItems.value = items
}

function collapseCell() {
  expandedCell.value = null
  expandedItems.value = []
}
</script>

<template>
  <div class="program-parser">
    <div v-if="loading">Загрузка данных о программах...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="!programs.workers.length && !programs.specialists.length" class="no-data">
      Нет данных о программах для отображения
    </div>
    <template v-else>
      <!-- Панель управления -->
      <div class="control-panel">
        <div class="control-group">
          <button
            class="control-button"
            @click="showFilters = !showFilters"
            :class="{ active: selectedYears.length > 0 || selectedCodes.length > 0 }"
          >
            <span class="icon">🔍</span>
            Фильтры
            <span v-if="selectedYears.length > 0 || selectedCodes.length > 0" class="badge">
              {{ selectedYears.length + selectedCodes.length }}
            </span>
          </button>

          <button
            class="control-button"
            @click="groupByYear = !groupByYear"
            :class="{ active: groupByYear }"
          >
            <span class="icon">{{ groupByYear ? '🗂' : '📄' }}</span>
            {{ groupByYear ? 'Группировка по годам' : 'Плоский список' }}
          </button>

          <button
            v-if="selectedYears.length > 0 || selectedCodes.length > 0"
            class="control-button reset"
            @click="resetFilters"
          >
            <span class="icon">❌</span>
            Сбросить фильтры
          </button>
        </div>

        <!-- Панель фильтров -->
        <div v-if="showFilters" class="filters-panel">
          <div class="filter-section">
            <h3>Год программы</h3>
            <div class="filter-options">
              <button class="filter-option-select-all" @click="selectAllYears">Выбрать все</button>
              <div class="filter-options-grid">
                <label v-for="year in uniqueYears" :key="`year-${year}`" class="filter-option">
                  <input
                    type="checkbox"
                    :value="year"
                    :checked="selectedYears.includes(year)"
                    @change="toggleYearSelection(year)"
                  >
                  <span class="checkmark"></span>
                  {{ year }}
                </label>
              </div>
            </div>
          </div>

          <div class="filter-section">
            <h3>Код программы</h3>
            <div class="filter-options">
              <button class="filter-option-select-all" @click="selectAllCodes">Выбрать все</button>
              <div class="filter-options-grid">
                <label v-for="code in uniqueCodes" :key="`code-${code}`" class="filter-option">
                  <input
                    type="checkbox"
                    :value="code"
                    :checked="selectedCodes.includes(code)"
                    @change="toggleCodeSelection(code)"
                  >
                  <span class="checkmark"></span>
                  {{ code }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Программы подготовки рабочих -->
      <section v-if="programs.workers.length">
        <h2>Программы подготовки квалифицированных рабочих, служащих</h2>

        <template v-for="(group, year) in groupedWorkers" :key="`workers-${year}`">
          <h3 v-if="groupByYear">{{ year }}</h3>
          <div v-if="group.length" class="table-responsive">
            <table class="program-table">
              <thead>
                <tr>
                  <th>Код</th>
                  <th>Наименование профессий, специальностей</th>
                  <th>Срок обучения</th>
                  <th>Форма обучения</th>
                  <th>Описание основных образовательных программ</th>
                  <th>Учебные планы</th>
                  <th>Календарный учебный график</th>
                  <th>Аннотации к рабочим программам</th>
                  <th>Рабочие программы по дисциплинам</th>
                  <th>Методические материалы</th>
                  <th>Рабочая программа воспитания, календарный план воспитательной работы</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="program in group" :key="`worker-${program.year}-${program.code}`">
                  <td>{{ program.code }}</td>
                  <td>{{ program.name }}</td>
                  <td>{{ program.duration }}</td>
                  <td>{{ program.form }}</td>

                  <td>
                    <a v-if="program.description.exists" :href="program.description.url" target="_blank">
                      {{ program.description.displayName }}
                    </a>
                    <span v-else class="placeholder">—</span>
                  </td>
                  <td>
                    <a v-if="program.curriculum.exists" :href="program.curriculum.url" target="_blank">
                      {{ program.curriculum.displayName }}
                    </a>
                    <span v-else class="placeholder">—</span>
                  </td>
                  <td>
                    <a v-if="program.schedule.exists" :href="program.schedule.url" target="_blank">
                      {{ program.schedule.displayName }}
                    </a>
                    <span v-else class="placeholder">—</span>
                  </td>
                  <td>
                    <a v-if="program.annotations.exists" :href="program.annotations.url" target="_blank">
                      {{ program.annotations.displayName }}
                    </a>
                    <span v-else class="placeholder">—</span>
                  </td>
                  <td>
                    <a v-if="program.disciplines.exists" :href="program.disciplines.url" target="_blank">
                      {{ program.disciplines.displayName }}
                    </a>
                    <span v-else class="placeholder">—</span>
                  </td>
                  <td>
                    <a v-if="program.materialsLink.exists" :href="program.materialsLink.url" target="_blank">
                      {{ program.materialsLink.displayName }}
                    </a>
                    <template v-else-if="program.methods.length">
                      <a
                        v-for="(item, i) in program.methods"
                        :key="`methods-${i}`"
                        :href="item.url"
                        target="_blank"
                        class="expandable-link"
                      >
                        {{ item.displayName }}
                      </a>
                    </template>
                    <span v-else class="placeholder">—</span>
                  </td>
                  <td
                    class="expandable-cell"
                    :class="{ 'is-expanded': expandedCell === `education-${program.code}` }"
                    @mouseenter="expandCell($event, program.education, `education-${program.code}`)"
                    @mouseleave="collapseCell"
                  >
                    <div class="cell-content">
                      <template v-if="program.education.length">
                        <a
                          v-for="(item, i) in program.education"
                          :key="`education-${i}`"
                          :href="item.url"
                          target="_blank"
                          class="expandable-link"
                        >
                          {{ item.displayName }}
                        </a>
                      </template>
                      <span v-else class="placeholder">—</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="no-programs-in-group">
            Нет программ, соответствующих выбранным фильтрам
          </div>
        </template>
      </section>

      <!-- Программы подготовки специалистов -->
      <section v-if="programs.specialists.length">
        <h2>Программы подготовки специалистов среднего звена</h2>

        <template v-for="(group, year) in groupedSpecialists" :key="`specialists-${year}`">
          <h3 v-if="groupByYear">{{ year }}</h3>
          <div v-if="group.length" class="table-responsive">
            <table class="program-table">
              <thead>
                <tr>
                  <th>Код</th>
                  <th>Наименование профессий, специальностей</th>
                  <th>Срок обучения</th>
                  <th>Форма обучения</th>
                  <th>Описание основных образовательных программ</th>
                  <th>Учебные планы</th>
                  <th>Календарный учебный график</th>
                  <th>Аннотации к рабочим программам</th>
                  <th>Рабочие программы по дисциплинам</th>
                  <th>Методические материалы</th>
                  <th>Рабочая программа воспитания, календарный план воспитательной работы</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="program in group" :key="`specialist-${program.year}-${program.code}`">
                  <td>{{ program.code }}</td>
                  <td>{{ program.name }}</td>
                  <td>{{ program.duration }}</td>
                  <td>{{ program.form }}</td>

                  <td>
                    <a v-if="program.description.exists" :href="program.description.url" target="_blank">
                      {{ program.description.displayName }}
                    </a>
                    <span v-else class="placeholder">—</span>
                  </td>
                  <td>
                    <a v-if="program.curriculum.exists" :href="program.curriculum.url" target="_blank">
                      {{ program.curriculum.displayName }}
                    </a>
                    <span v-else class="placeholder">—</span>
                  </td>
                  <td>
                    <a v-if="program.schedule.exists" :href="program.schedule.url" target="_blank">
                      {{ program.schedule.displayName }}
                    </a>
                    <span v-else class="placeholder">—</span>
                  </td>
                  <td>
                    <a v-if="program.annotations.exists" :href="program.annotations.url" target="_blank">
                      {{ program.annotations.displayName }}
                    </a>
                    <span v-else class="placeholder">—</span>
                  </td>
                  <td>
                    <a v-if="program.disciplines.exists" :href="program.disciplines.url" target="_blank">
                      {{ program.disciplines.displayName }}
                    </a>
                    <span v-else class="placeholder">—</span>
                  </td>
                  <td>
                    <a v-if="program.materialsLink.exists" :href="program.materialsLink.url" target="_blank">
                      {{ program.materialsLink.displayName }}
                    </a>
                    <template v-else-if="program.methods.length">
                      <a
                        v-for="(item, i) in program.methods"
                        :key="`methods-${i}`"
                        :href="item.url"
                        target="_blank"
                        class="expandable-link"
                      >
                        {{ item.displayName }}
                      </a>
                    </template>
                    <span v-else class="placeholder">—</span>
                  </td>
                  <td
                    class="expandable-cell"
                    :class="{ 'is-expanded': expandedCell === `education-${program.code}` }"
                    @mouseenter="expandCell($event, program.education, `education-${program.code}`)"
                    @mouseleave="collapseCell"
                  >
                    <div class="cell-content">
                      <template v-if="program.education.length">
                        <a
                          v-for="(item, i) in program.education"
                          :key="`education-${i}`"
                          :href="item.url"
                          target="_blank"
                          class="expandable-link"
                        >
                          {{ item.displayName }}
                        </a>
                      </template>
                      <span v-else class="placeholder">—</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="no-programs-in-group">
            Нет программ, соответствующих выбранным фильтрам
          </div>
        </template>
      </section>
    </template>
  </div>
</template>

<style scoped>
.program-parser {
  width: 100%;
  max-width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  margin: 1rem 0;
  font-size: 0.9rem;
}

.table-responsive {
  overflow-x: auto;
  margin-bottom: 1.5rem;
  -webkit-overflow-scrolling: touch;
  width: 100%;
}

.program-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.75rem;
  table-layout: fixed;
}

.program-table th, .program-table td {
  border: 1px solid var(--vp-c-divider);
  padding: 0.3rem;
  text-align: center;
  word-wrap: break-word;
  vertical-align: middle;
}

.program-table th {
  background-color: var(--vp-c-brand);
  color: var(--vp-c-white);
  font-weight: 600;
  font-size: 0.75rem;
  position: sticky;
  top: 0;
}

.program-table tr:nth-child(even) {
  background-color: var(--vp-c-bg-soft);
}

.program-table tr:hover {
  background-color: var(--vp-c-default-soft);
}

.program-table th:nth-child(1),
.program-table td:nth-child(1) {
  width: 7%;
}

.program-table th:nth-child(2),
.program-table td:nth-child(2) {
  width: 5%;
}

.program-table th:nth-child(3),
.program-table td:nth-child(3) {
  width: 12%;
}

.program-table th:nth-child(4),
.program-table td:nth-child(4) {
  width: 5%;
}

.program-table th:nth-child(5),
.program-table td:nth-child(5) {
  width: 6%;
}

.program-table th:nth-child(n+6),
.program-table td:nth-child(n+6) {
  width: 7%;
}

.placeholder {
  color: var(--vp-c-text-2);
  font-style: italic;
  font-size: 0.7rem;
}

.error {
  color: var(--vp-c-red);
  font-weight: 500;
}

.no-data, .no-programs-in-group {
  color: var(--vp-c-text-2);
  text-align: center;
  padding: 1rem;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 0.5rem;
  background-color: var(--vp-c-bg-soft);
  margin: 1rem 0;
}

.expandable-cell {
  position: relative;
  max-height: 1.5em;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.expandable-cell.is-expanded {
  max-height: 500px;
  overflow-y: auto;
  background-color: var(--vp-c-bg-soft);
}

.cell-content {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.2rem 0;
}

.expandable-link {
  color: var(--vp-c-brand);
  text-decoration: none;
  font-size: 0.7rem;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  transition: background-color 0.2s;
  white-space: normal;
  text-align: left;
  word-break: break-word;
}

.expandable-link:hover {
  background-color: var(--vp-c-default-soft);
  text-decoration: underline;
}

h2 {
  font-size: 1rem;
  margin: 1rem 0 0.5rem;
  color: var(--vp-c-text-1);
}

h3 {
  font-size: 0.9rem;
  margin: 1rem 0 0.5rem;
  color: var(--vp-c-text-2);
  padding: 0.5rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 4px;
}

a {
  color: var(--vp-c-brand);
  text-decoration: none;
  transition: color 0.25s;
  white-space: normal;
  word-break: break-word;
  display: inline-block;
  text-align: left;
}

a:hover {
  color: var(--vp-c-brand-dark);
  text-decoration: underline;
}

/* Стили для панели управления */
.control-panel {
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 1rem;
}

.control-group {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.control-button {
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.control-button:hover {
  background-color: var(--vp-c-bg-soft);
}

.control-button.active {
  background-color: var(--vp-c-brand);
  color: var(--vp-c-white);
  border-color: var(--vp-c-brand);
}

.control-button.reset {
  margin-left: auto;
  background-color: var(--vp-c-red-soft);
  border-color: var(--vp-c-red-soft);
}

.control-button.reset:hover {
  background-color: var(--vp-c-red-soft);
  opacity: 0.8;
}

.icon {
  font-size: 1rem;
}

.badge {
  background-color: var(--vp-c-brand-dark);
  color: white;
  border-radius: 50%;
  width: 1.2rem;
  height: 1.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  margin-left: 0.3rem;
}

/* Стили для панели фильтров */
.filters-panel {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.filter-section {
  margin-bottom: 1.5rem;
}

.filter-section h3 {
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  padding: 0;
  background: none;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-option-select-all {
  background: none;
  border: none;
  color: var(--vp-c-brand);
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.2rem 0;
  margin-bottom: 0.5rem;
  text-align: left;
}

.filter-option-select-all:hover {
  text-decoration: underline;
}

.filter-options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.5rem;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  position: relative;
  user-select: none;
}

.filter-option:hover {
  background-color: var(--vp-c-default-soft);
}

.filter-option input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: relative;
  height: 1rem;
  width: 1rem;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 3px;
}

.filter-option:hover input ~ .checkmark {
  background-color: var(--vp-c-bg-soft);
}

.filter-option input:checked ~ .checkmark {
  background-color: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.filter-option input:checked ~ .checkmark:after {
  display: block;
}

.filter-option .checkmark:after {
  left: 0.35rem;
  top: 0.15rem;
  width: 0.25rem;
  height: 0.5rem;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

@media (max-width: 768px) {
  .program-table {
    font-size: 0.7rem;
  }
  
  .program-table th, 
  .program-table td {
    padding: 0.2rem;
  }
  
  .program-table th:nth-child(1),
  .program-table td:nth-child(1) {
    width: 8%;
  }
  
  .program-table th:nth-child(2),
  .program-table td:nth-child(2) {
    width: 6%;
  }
  
  .program-table th:nth-child(3),
  .program-table td:nth-child(3) {
    width: 15%;
  }
  
  .program-table th:nth-child(n+4),
  .program-table td:nth-child(n+4) {
    width: 8%;
  }
  
  .expandable-cell.is-expanded {
    position: relative;
    z-index: 10;
    max-height: 200px;
  }
  
  a, .expandable-link {
    font-size: 0.65rem;
  }

  .control-group {
    flex-direction: column;
  }
  
  .control-button.reset {
    margin-left: 0;
  }
  
  .filter-options-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
}
</style>