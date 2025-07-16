<!-- docs/components/NewsParser.vue -->
<script setup>
import { ref, onMounted } from 'vue'

const news = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const newsFiles = import.meta.glob('docs/news/*/*/*.md', { 
      eager: true,
      query: '?raw'
    })
    
  news.value = Object.entries(newsFiles).map(([path, module]) => {
  const relativePath = path.replace('../news/', ''); // Путь относительно папки news
  const fileName = relativePath.split('/').pop().replace('.md', '');
  const content = module.default;
  
  const frontmatter = parseFrontmatter(content);
  
  return {
    url: `docs/news/${relativePath.replace('.md', '.html')}`,
    title: frontmatter.title || fileName,
    date: parseDate(frontmatter.date),
    excerpt: frontmatter.excerpt || '',
    image: frontmatter.image ? ensureAbsolutePath(frontmatter.image, relativePath) : null,
    rawContent: content
  }
});
    
    news.value.sort((a, b) => b.date - a.date)
  } catch (e) {
    error.value = 'Ошибка загрузки новостей'
    console.error('NewsParser error:', e)
  } finally {
    loading.value = false
  }
})

function parseFrontmatter(content) {
  const fmRegex = /^---\s*\n([\s\S]*?)\n---\s*\n?/
  const match = content.match(fmRegex)
  if (!match) return {}
  
  try {
    const frontmatter = {}
    match[1].split('\n').forEach(line => {
      const sepIndex = line.indexOf(':')
      if (sepIndex > 0) {
        const key = line.slice(0, sepIndex).trim()
        const value = line.slice(sepIndex + 1).trim()
        frontmatter[key] = value.replace(/^['"]|['"]$/g, '')
      }
    })
    return frontmatter
  } catch {
    return {}
  }
}

function parseDate(dateStr) {
  if (!dateStr) return new Date()
  try {
    // Пробуем разные форматы даты
    return new Date(dateStr.includes('-') ? dateStr : dateStr.split('.').reverse().join('-'))
  } catch {
    return new Date()
  }
}

function ensureAbsolutePath(imgPath, articlePath) {
  // Получаем директорию статьи (например: "2024/january/")
  const articleDir = articlePath.split('/').slice(0, -1).join('/');
  
  // Собираем полный путь к изображению
  return `docs/news/${articleDir}/${imgPath}`;
}
</script>

<template>
  <div class="news-parser">
    <div v-if="loading">Загрузка новостей...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <slot v-else :news="news" />
  </div>
</template>

