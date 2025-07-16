// docs/.vitepress/generateNewsSidebar.js
import { glob } from 'glob'
import fs from 'fs'
import path from 'path'

export function generateNewsSidebar() {
  // Получаем все MD файлы из папки news (относительно расположения этого скрипта)
  const newsFiles = glob.sync(path.join(__dirname, '../news/**/*.md'))
  
  const tree = {}
  
  // Строим древовидную структуру
  for (const filePath of newsFiles) {
    // Получаем относительный путь от папки news
    const relativePath = path.relative(
      path.join(__dirname, '../news'),
      filePath
    )
    
    const parts = relativePath.replace(/\.md$/, '').split(path.sep)
    if (parts.length !== 3) continue
    
    const [year, month, slug] = parts
    
    if (!tree[year]) tree[year] = {}
    if (!tree[year][month]) tree[year][month] = []
    
    // Читаем frontmatter для получения заголовка
    const content = fs.readFileSync(filePath, 'utf-8')
    const titleMatch = content.match(/^title:\s*(.*)$/m)
    const title = titleMatch ? titleMatch[1].trim() : slug
    
    tree[year][month].push({
      text: title,
      link: `/news/${year}/${month}/${slug}`
    })
  }
  
  // Сортируем годы по убыванию (новые сначала)
  const sortedYears = Object.keys(tree).sort().reverse()
  
  // Преобразуем дерево в формат, понятный VitePress
  const sidebar = [
    {
      items: [
        { text: 'Все новости', link: '/news/' }
      ]
    },
    {
      text: 'Архив новостей',
      items: sortedYears.map(year => ({
        text: year,
        collapsed: true,
        items: Object.keys(tree[year])
          .sort()
          .reverse() // Сортируем месяцы по убыванию
          .map(month => ({
            text: getMonthName(month),
            collapsed: true,
            items: tree[year][month]
          }))
      }))
    }
  ]
  
  return sidebar
}

// Вспомогательная функция для преобразования английского названия месяца в русское
function getMonthName(monthName) {
  const monthMap = {
    'january': 'Январь',
    'february': 'Февраль',
    'march': 'Март',
    'april': 'Апрель',
    'may': 'Май',
    'june': 'Июнь',
    'july': 'Июль',
    'august': 'Август',
    'september': 'Сентябрь',
    'october': 'Октябрь',
    'november': 'Ноябрь',
    'december': 'Декабрь'
  }
  
  // Приводим к lowercase на случай, если есть вариации регистра
  const lowerMonth = monthName.toLowerCase()
  return monthMap[lowerMonth] || monthName.charAt(0).toUpperCase() + monthName.slice(1)
}