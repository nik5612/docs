import { defineConfig } from 'vitepress'
import { themeConfig } from './themeConfig.mts'

export default defineConfig({
	base: '/docs/',
  themeConfig: themeConfig,
  // Базовые настройки путей
  // srcDir: '.',  // Корень проекта - /home/basealt/vitepress/
  // outDir: './dist',  // Директория сборки
  
  // Критически важные настройки маршрутизации 
  cleanUrls: true,
  // Настройки Vite
  vite: {
    optimizeDeps: {
      include: ['papaparse', 'date-fns']
    },
    plugins: [
      {
        name: 'markdown-loader',
        transform(code, id) {
          if (id.slice(-3) === '.md') {
            return { code }
          }
        }
      }
    ],
  },
  

  title: "ППП ии. И.И. Иииииииии",
  description: "A VitePress Site",
  lastUpdated: true,
})

