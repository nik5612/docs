<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { format, subDays, parse, isToday } from 'date-fns'
import { ru } from 'date-fns/locale'

const scheduleData = ref([])
const selectedDate = ref(format(new Date(), 'dd.MM.yyyy'))
const availableDates = ref([])
const last7Days = ref([])
const filterTeachers = ref([])
const filterGroups = ref([])
const groupBy = ref('none')
const showTeachersDropdown = ref(false)
const showGroupsDropdown = ref(false)


const parseHtmlSchedule = (htmlText) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlText, 'text/html')
  const rows = doc.querySelectorAll('tr.R8, tr.R18')
  
  const data = []
  let currentGroup = ''
  
  rows.forEach(row => {
    const groupCell = row.querySelector('td[colspan="6"]')
    if (groupCell) {
      currentGroup = groupCell.textContent.trim()
      return
    }
    
    const cells = row.querySelectorAll('td')
    if (cells.length >= 6) {
      const classroom = cells[4].textContent.trim()
      
      // Разделяем кабинет и адрес
      let cabinet = classroom
      let address = 'Уральская 78'
      
      if (classroom.includes('Спортивный зал')) {
        cabinet = 'Спортивный зал'
        address = 'Уральская 78'
      } 
      else if (classroom.includes('Электромонтажная')) {
        cabinet = 'Электромонтажная мастерская'
        address = 'Уральская 78Б'
      }
      else if (classroom.includes('Мастерская')) {
        cabinet = 'Мастерская'
        address = 'Уральская 78В'
      }
      else if (classroom.includes('Актовый зал')) {
        cabinet = 'Актовый зал'
        address = 'Уральская 78'
      }
      else if (classroom.includes('Библиотека')) {
        cabinet = 'Библиотека'
        address = 'Уральская 78'
      }
      else if (classroom.includes('Лебедева')) {
        cabinet = classroom.slice(0, 2)
        address = 'Лебедева 25А'
      }
      else if (classroom.includes(',')) {
        const parts = classroom.split(', ')
        cabinet = parts[0]
        address = parts[1] || address
      }
      else if (classroom.match(/^\d/)) {
        cabinet = classroom.slice(0, 3)
      }

      const lesson = {
        Номер: cells[0].textContent.trim(),
        Подгруппа: cells[1].textContent.trim(),
        Дисциплина: cells[2].textContent.trim(),
        Преподаватель: cells[3].textContent.trim(),
        Кабинет: cabinet,
        Адрес: address,
        Группа: currentGroup
      }
      data.push(lesson)
    }
  })
  
  return data
}

const generateLast7Days = () => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i)
    const dateStr = format(date, 'dd.MM.yyyy')
    return {
      dateStr,
      displayStr: format(date, 'dd.MM'),
      isToday: isToday(date),
      isAvailable: availableDates.value.includes(dateStr)
    }
  })
}

const loadAvailableDates = async () => {
  try {
    const response = await fetch('/schedule/')
    const text = await response.text()
    availableDates.value = text.match(/\d{2}\.\d{2}\.\d{4}(?=\.htm)/g) || []
    last7Days.value = generateLast7Days()
  } catch (error) {
    console.error('Ошибка загрузки дат:', error)
  }
}

const loadSchedule = async (date) => {
  try {
    const response = await fetch(`/schedule/${date}.htm`)
    if (!response.ok) throw new Error('Файл не найден')
    const text = await response.text()
    scheduleData.value = parseHtmlSchedule(text)
  } catch (error) {
    scheduleData.value = []
    console.error('Ошибка загрузки:', error)
  }
}

const selectDate = (dateStr) => {
  selectedDate.value = dateStr
}

const parseCustomDate = (dateStr) => {
  return parse(dateStr, 'dd.MM.yyyy', new Date())
}

const teachersList = computed(() => {
  const teachers = new Set()
  scheduleData.value.forEach(item => {
    if (item.Преподаватель) {
      teachers.add(item.Преподаватель)
    }
  })
  return Array.from(teachers).sort()
})

const groupsList = computed(() => {
  const groups = new Set()
  scheduleData.value.forEach(item => {
    if (item.Группа) {
      groups.add(item.Группа)
    }
  })
  return Array.from(groups).sort()
})

const processedData = computed(() => {
  let filtered = [...scheduleData.value]
  
  if (filterTeachers.value.length > 0) {
    filtered = filtered.filter(item => 
      filterTeachers.value.includes(item.Преподаватель))
  }
  
  if (filterGroups.value.length > 0) {
    filtered = filtered.filter(item => 
      filterGroups.value.includes(item.Группа))
  }
  
  if (groupBy.value === 'none') {
    filtered.sort((a, b) => {
      if (a.Группа === b.Группа) {
        return a.Номер - b.Номер
      }
      return a.Группа.localeCompare(b.Группа)
    })
  } else {
    filtered.sort((a, b) => a.Номер - b.Номер)
  }
  
  if (groupBy.value === 'group') {
    const groups = new Map()
    filtered.forEach(item => {
      if (!groups.has(item.Группа)) {
        groups.set(item.Группа, [])
      }
      groups.get(item.Группа).push(item)
    })
    return Array.from(groups.entries())
  } 
  else if (groupBy.value === 'teacher') {
    const teachers = new Map()
    filtered.forEach(item => {
      if (!teachers.has(item.Преподаватель)) {
        teachers.set(item.Преподаватель, [])
      }
      teachers.get(item.Преподаватель).push(item)
    })
    return Array.from(teachers.entries())
  }
  
  return filtered
})

const toggleTeacher = (teacher) => {
  const index = filterTeachers.value.indexOf(teacher)
  if (index === -1) {
    filterTeachers.value.push(teacher)
  } else {
    filterTeachers.value.splice(index, 1)
  }
}

const toggleGroup = (group) => {
  const index = filterGroups.value.indexOf(group)
  if (index === -1) {
    filterGroups.value.push(group)
  } else {
    filterGroups.value.splice(index, 1)
  }
}

const toggleTeachersDropdown = () => {
  showTeachersDropdown.value = !showTeachersDropdown.value
  if (showTeachersDropdown.value) {
    showGroupsDropdown.value = false
  }
}

const toggleGroupsDropdown = () => {
  showGroupsDropdown.value = !showGroupsDropdown.value
  if (showGroupsDropdown.value) {
    showTeachersDropdown.value = false
  }
}

watch(groupBy, (newVal) => {
  if (newVal === 'teacher') {
    filterGroups.value = []
  } else if (newVal === 'group') {
    filterTeachers.value = []
  }
  showTeachersDropdown.value = false
  showGroupsDropdown.value = false
})

onMounted(async () => {
  await loadAvailableDates()
  loadSchedule(selectedDate.value)
})

watch(selectedDate, loadSchedule)
</script>

<template>
  <div class="schedule-container">
    <div class="date-navigation">
      <div class="date-tabs">
        <button
          v-for="day in last7Days"
          :key="day.dateStr"
          @click="selectDate(day.dateStr)"
          :class="{ 
            'active': selectedDate === day.dateStr,
            'available': day.isAvailable,
            'today': day.isToday,
            'not-available': !day.isAvailable
          }"
        >
          {{ day.displayStr }}
          <span v-if="day.isToday" class="today-badge">●</span>
        </button>
      </div>
      
      <div class="calendar-input">
        <input 
          type="date" 
          :value="format(parseCustomDate(selectedDate), 'yyyy-MM-dd')"
          @input="selectedDate = format(new Date($event.target.value), 'dd.MM.yyyy')"
          :max="format(new Date(), 'yyyy-MM-dd')"
        />
      </div>  
    </div>  

    <div class="selected-date">
      {{ format(parseCustomDate(selectedDate), 'EEEE, d MMMM yyyy', { locale: ru }) }}
    </div>

    <div class="filters-panel">
      <div class="filter-group">
        <div class="dropdown">
          <button 
            class="dropdown-toggle"
            @click="toggleGroupsDropdown"
            :disabled="groupBy === 'teacher'"
          >
            Группы: {{ filterGroups.length ? `${filterGroups.length} выбрано` : 'Все' }}
          </button>
          <div v-if="showGroupsDropdown" class="dropdown-menu">
            <div class="dropdown-search">
              <input type="text" placeholder="Поиск..." class="search-input">
            </div>
            <div class="dropdown-items">
              <label 
                v-for="group in groupsList" 
                :key="group"
                class="dropdown-item"
              >
                <input 
                  type="checkbox" 
                  :checked="filterGroups.includes(group)"
                  @change="toggleGroup(group)"
                >
                {{ group }}
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div class="filter-group">
        <div class="dropdown">
          <button 
            class="dropdown-toggle"
            @click="toggleTeachersDropdown"
            :disabled="groupBy === 'group'"
          >
            Преподаватели: {{ filterTeachers.length ? `${filterTeachers.length} выбрано` : 'Все' }}
          </button>
          <div v-if="showTeachersDropdown" class="dropdown-menu">
            <div class="dropdown-search">
              <input type="text" placeholder="Поиск..." class="search-input">
            </div>
            <div class="dropdown-items">
              <label 
                v-for="teacher in teachersList" 
                :key="teacher"
                class="dropdown-item"
              >
                <input 
                  type="checkbox" 
                  :checked="filterTeachers.includes(teacher)"
                  @change="toggleTeacher(teacher)"
                >
                {{ teacher }}
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div class="filter-group">
        <label>Группировка:</label>
        <div class="group-options">
          <label>
            <input type="radio" v-model="groupBy" value="none" /> Нет
          </label>
          <label>
            <input type="radio" v-model="groupBy" value="group" /> По группам
          </label>
          <label>
            <input type="radio" v-model="groupBy" value="teacher" /> По преподавателям
          </label>
        </div>
      </div>
    </div>

    <div class="schedule-content">
      <template v-if="scheduleData.length">
        <!-- Режим без группировки -->
        <div v-if="groupBy === 'none'" class="schedule-table-container">
          <table class="schedule-table">
            <thead>
              <tr>
                <th class="col-number">№</th>
                <th class="col-group">Группа</th>
                <th class="col-subgroup">Подгр.</th>
                <th class="col-discipline">Дисциплина</th>
                <th class="col-teacher">Преподаватель</th>
                <th class="col-room">Кабинет</th>
                <th class="col-address">Адрес</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in processedData" :key="index">
                <td class="col-number">{{ row.Номер }}</td>
                <td class="col-group">{{ row.Группа }}</td>
                <td class="col-subgroup">{{ row.Подгруппа }}</td>
                <td class="col-discipline">{{ row.Дисциплина }}</td>
                <td class="col-teacher">{{ row.Преподаватель }}</td>
                <td class="col-room">{{ row.Кабинет }}</td>
                <td class="col-address">{{ row.Адрес }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Режим группировки по группам -->
        <template v-else-if="groupBy === 'group'">
          <div v-for="[group, items] in processedData" :key="group" class="schedule-table-container">
            <h3 class="group-header">Группа: {{ group }}</h3>
            <table class="schedule-table">
              <thead>
                <tr>
                  <th class="col-number">№</th>
                  <th class="col-subgroup">Подгр.</th>
                  <th class="col-discipline">Дисциплина</th>
                  <th class="col-teacher">Преподаватель</th>
                  <th class="col-room">Кабинет</th>
                  <th class="col-address">Адрес</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in items" :key="index">
                  <td class="col-number">{{ row.Номер }}</td>
                  <td class="col-subgroup">{{ row.Подгруппа }}</td>
                  <td class="col-discipline">{{ row.Дисциплина }}</td>
                  <td class="col-teacher">{{ row.Преподаватель }}</td>
                  <td class="col-room">{{ row.Кабинет }}</td>
                  <td class="col-address">{{ row.Адрес }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
        
        <!-- Режим группировки по преподавателям -->
        <template v-else-if="groupBy === 'teacher'">
          <div v-for="[teacher, items] in processedData" :key="teacher" class="schedule-table-container">
            <h3 class="group-header">Преподаватель: {{ teacher }}</h3>
            <table class="schedule-table">
              <thead>
                <tr>
                  <th class="col-number">№</th>
                  <th class="col-group">Группа</th>
                  <th class="col-subgroup">Подгр.</th>
                  <th class="col-discipline">Дисциплина</th>
                  <th class="col-room">Кабинет</th>
                  <th class="col-address">Адрес</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in items" :key="index">
                  <td class="col-number">{{ row.Номер }}</td>
                  <td class="col-group">{{ row.Группа }}</td>
                  <td class="col-subgroup">{{ row.Подгруппа }}</td>
                  <td class="col-discipline">{{ row.Дисциплина }}</td>
                  <td class="col-room">{{ row.Кабинет }}</td>
                  <td class="col-address">{{ row.Адрес }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </template>
      <div v-else class="no-data-message">
        Нет данных для выбранной даты.
      </div>
    </div>
  </div>
</template>

<style scoped>
.schedule-container {
  width: 100%;
  max-width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
}

.date-navigation {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.date-tabs {
  display: flex;
  gap: 12px;
  flex-grow: 1;
  overflow-x: auto;
  padding: 10px 5px 15px 5px;
  scrollbar-width: none;
}

.date-tabs::-webkit-scrollbar {
  display: none;
}

.date-tabs button {
  padding: 9px 19px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 500;
  transition: 
    border-color 0.25s,
    background-color 0.25s,
    color 0.25s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.date-tabs button:hover {
  background: var(--vp-c-brand-light) !important;
  color: var(--vp-c-brand);
}

.date-tabs button.active {
  background: var(--vp-c-brand) !important;
  color: var(--vp-c-white);
  border-color: var(--vp-c-brand) !important;
}

.date-tabs button.today {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.date-tabs button.today.active {
  background: var(--vp-c-brand);
  color: var(--vp-c-white);
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 1px var(--vp-c-brand);
}

.dark .date-tabs button.today {
  background: var(--vp-c-bg-soft-down);
}

.today-badge {
  width: 8px !important;
  height: 8px !important;
  background: var(--vp-c-brand-dark) !important;
}

.calendar-input input {
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.9rem;
}

.selected-date {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--vp-c-text-1);
}

.filters-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
  padding: 15px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
  position: relative;
}

.dropdown {
  position: relative;
}

.dropdown-toggle {
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  min-width: 200px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown-toggle:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.dropdown-toggle::after {
  content: "▼";
  font-size: 0.7em;
  margin-left: 10px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  min-width: 250px;
  max-height: 300px;
  overflow-y: auto;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
}

.dropdown-search {
  padding: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.search-input {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

.dropdown-items {
  padding: 5px 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  cursor: pointer;
  white-space: nowrap;
}

.dropdown-item:hover {
  background: var(--vp-c-default-soft);
}

.dropdown-item input {
  margin-right: 10px;
}

.group-options {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.group-options label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.schedule-content {
  width: 100%;
  margin-top: 20px;
}

.schedule-table-container {
  width: 100%;
  overflow-x: auto;
}

.schedule-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  word-break: break-word;
}

/* Фиксированные ширины колонок */
.col-number {
  width: 5%;
  min-width: 50px;
}

.col-group {
  width: 11%;
  min-width: 110px;
}

.col-subgroup {
  width: 7%;
  min-width: 80px;
}

.col-discipline {
  width: 35%;
  min-width: 180px;
}

.col-teacher {
  width: 15%;
  min-width: 150px;
}

.col-room {
  width: 10%;
  min-width: 90px;
}

.col-address {
  width: 17%;
  min-width: 120px;
}

.schedule-table th,
.schedule-table td {
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  text-align: left;
  word-wrap: break-word;
}

.schedule-table th {
  background-color: var(--vp-c-brand);
  color: white;
  font-weight: 600;
  position: sticky;
  top: 0;
}

.schedule-table tr:nth-child(even) {
  background-color: var(--vp-c-bg-soft);
}

.schedule-table tr:hover {
  background-color: var(--vp-c-default-soft);
}

.group-header {
  margin: 15px 0 10px 0;
  padding: 10px 15px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
  border-radius: 6px;
  font-size: 1.05rem;
}

.no-data-message {
  padding: 20px;
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .date-navigation {
    flex-direction: column;
    align-items: stretch;
  }
  
  .date-tabs {
    width: 100%;
  }
  
  .calendar-input {
    width: 100%;
  }
  
  .calendar-input input {
    width: 100%;
  }
  
  .filters-panel {
    flex-direction: column;
    gap: 15px;
  }
  
  .filter-group {
    width: 100%;
  }
  
  .dropdown-menu {
    min-width: 100%;
  }
  
  /* Адаптивные ширины для мобильных */
  .col-number {
    width: 8% !important;
    min-width: 40px !important;
  }
  
  .col-group {
    width: 15% !important;
    min-width: 100px !important;
  }
  
  .col-subgroup {
    width: 8% !important;
    min-width: 60px !important;
  }
  
  .col-discipline {
    width: 25% !important;
    min-width: 120px !important;
  }
  
  .col-teacher {
    width: 20% !important;
    min-width: 100px !important;
  }
  
  .col-room {
    width: 12% !important;
    min-width: 80px !important;
  }
  
  .col-address {
    width: 12% !important;
    min-width: 100px !important;
  }
}
</style>