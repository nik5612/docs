import { defineConfig } from 'vitepress'
import { themeConfig } from './themeConfig.mts'

export default defineConfig({
	base: '/docs/',
  themeConfig: themeConfig,
  cleanUrls: true,
  title: "ППП ии. И.И. Иииииииии",
  description: "A VitePress Site",
  lastUpdated: true,

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
})

