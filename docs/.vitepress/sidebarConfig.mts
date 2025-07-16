import type { DefaultTheme } from 'vitepress'


export const sidebarConfig: DefaultTheme.Sidebar = {
  '/news/': (() => {
    // Импортируем функцию только когда она нужна
    const { generateNewsSidebar } = require('./generateNewsSidebar.js')
    return generateNewsSidebar()
  })(),

  // Для файлов из корня
  '/': [
    {
      text: 'Руководство11111111',
      items: [
        { text: 'Введение1', link: '/guide/introduction' },
        { text: 'Установка1', link: '/guide/installation' },
        { text: 'Конфигурация1', link: '/guide/configuration' }
      ]
    },
    {
      text: 'Продвинутые темы1',
      items: [
        { text: 'Плагины1', link: '/guide/plugins' },
        { text: 'Интеграции1', link: '/guide/integrations' }
      ]
    }
  ],    


  '/contacts/': [
    {
      text: 'Руководство2',
      items: [
        { text: 'Введение2', link: '/guide/introduction' },
        { text: 'Установка2', link: '/guide/installation' },
        { text: 'Конфигурация2', link: '/guide/configuration' }
      ]
    },
    {
      text: 'Продвинутые темы2',
      items: [
        { text: 'Плагины2', link: '/guide/plugins' },
        { text: 'Интеграции2', link: '/guide/integrations' }
      ]
    }
  ],


  '/guide/': [
    {
      text: 'API',
      items: [
        { text: 'Методы', link: '/api/methods' },
        { text: 'Типы', link: '/api/types' }
      ]
    }
  ],


  '/organization/': [
    {
      text: 'Примеры',
      items: [
        { text: 'Базовые', link: '/examples/basic' },
        { text: 'Продвинутые', link: '/examples/advanced' }
      ]
    }
  ]
}