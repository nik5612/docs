<!-- docs/components/NewsIndex.vue -->
<script setup>

import NewsParser from './NewsParser.vue'

const truncateText = (text, maxLength = 150) => {
  if (!text) return ''
  const trimmed = text.trim()
  return trimmed.length > maxLength 
    ? trimmed.substring(0, maxLength) + '...'
    : trimmed
}
</script>

<template>
  <NewsParser v-slot="{ news }">
    <div class="news-index-container">
      <div class="news-grid">
        <div v-for="item in news.slice(0, 4)" :key="item.url" class="news-card">
          <div class="news-image" v-if="item.image">
            <img :src="item.image" :alt="item.title" />
          </div>
          
          <div class="news-content">
            <h2 class="news-title">
              <a :href="item.url" class="news-link">{{ item.title }}</a>
            </h2>
            
            <time :datetime="item.date.toISOString()" class="news-date">
              {{ item.date.toLocaleDateString('ru-RU') }}
            </time>
            
            <p class="news-excerpt">{{ truncateText(item.excerpt) }}</p>
            
            <a :href="item.url" class="read-more">Читать далее →</a>
          </div>
        </div>
      </div>
      
      <div class="all-news-link">
        <a href="/docs/news/" class="all-news-button">Все новости →</a>
      </div>
    </div>
  </NewsParser>
</template>

<style scoped>
.news-index-container {
  width: 100%;
  padding: 1rem 0;
}

h1 {
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
  font-size: 1.8rem;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;
  width: 100%;
}

.news-card {
  height: 400px;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.news-image {
  width: 100%;
  height: 33.33%;
  min-height: 120px;
  overflow: hidden;
  flex-shrink: 0;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.news-card:hover .news-image img {
  transform: scale(1.05);
}

.news-content {
  padding: 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  border-top: 1px solid var(--vp-c-divider);
}

.news-title {
  font-size: 1.1rem;
  line-height: 1.4;
  margin: 0;
  padding: 0.6rem 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.news-date {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin: 0;
  padding: 0.3rem 1rem 0;
}

.news-excerpt {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin: 0;
  padding: 0.6rem 1rem;
  flex-grow: 1;
  overflow: hidden;
  line-height: 1.5;
  word-break: break-word;
}

.read-more {
  display: inline-block;
  color: var(--vp-c-brand);
  font-size: 0.9rem;
  text-decoration: none;
  margin: 0;
  padding: 0.5rem 1rem 0.8rem;
  margin-top: auto;
}

.read-more:hover {
  text-decoration: underline;
}

.all-news-link {
  margin-top: 2rem;
  text-align: right;
}

.all-news-button {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background-color: var(--vp-c-brand);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s ease;
}

@media (max-width: 1200px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
  }
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .news-card {
    height: auto;
    max-height: none;
  }
  
  .news-image {
    height: 160px;
    min-height: auto;
  }
}
</style>