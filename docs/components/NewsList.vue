<!-- docs/components/NewsTest.vue -->
<script setup>
import NewsParser from './NewsParser.vue'
import { useData } from 'vitepress'

const { page } = useData()
</script>


<template>
  <NewsParser v-slot="{ news }">  
    <div v-for="item in news" :key="item.url" class="news-card">
      <div class="news-header">
        <h2 class="news-title">
          <a :href="item.url" class="news-link">{{ item.title }}</a>
        </h2>
        <time :datetime="item.date.toISOString()">
          {{ item.date.toLocaleDateString('ru-RU') }}
        </time>
      </div>
      
      <div v-if="item.image" class="news-image">
        <img :src="item.image" :alt="item.title" />
      </div>
      
      <p class="news-excerpt">{{ item.excerpt }}</p>
      
      <a :href="item.url" class="read-more">Читать далее →</a>
      
      <details v-if="item.meta" class="news-meta">
        <summary>Метаданные</summary>
        <pre>{{ JSON.stringify(item.meta, null, 2) }}</pre>
      </details>
    </div>
  </NewsParser>
</template>

<style scoped>
/* Исправление отступов у заголовка h2 */
.news-title {
  all: unset !important; /* Жёсткий сброс всех стилей */
  display: block !important;
  font-size: 1.5rem !important; /* Возвращаем нормальный размер */
  font-weight: bold !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  line-height: 1.2 !important;
}

.news-title::before,
.news-title::after {
  content: none !important; /* Убиваем псевдоэлементы */
}

.news-card {
  margin: 2rem 0;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.news-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.news-link {
  color: var(--vp-c-brand);
  text-decoration: none;
}

.news-link:hover {
  text-decoration: underline;
}

.news-image {
  margin: 0 !important; /* Убираем ВСЕ отступы у контейнера */
  padding: 0 !important;
  border: none !important;
}

.news-image img {
  display: block; /* Убираем лишние отступы снизу у img */
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  margin: 0 !important; /* Полностью убираем отступы */
  padding: 0 !important;
  border: none !important;
}

.news-excerpt {
  color: var(--vp-c-text-2);
  margin: 1rem 0;
}

.read-more {
  display: inline-block;
  color: var(--vp-c-brand);
  margin-top: 0.5rem;
}

.news-meta {
  margin-top: 1rem;
  font-size: 0.9rem;
  opacity: 0.7;
}
</style>