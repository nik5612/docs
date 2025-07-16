import { DefaultTheme } from 'vitepress'
import { sidebarConfig } from './sidebarConfig.mts'


export const themeConfig: DefaultTheme.Config = {  
    logo: 'https://ppkslavyanova.ru/wp-content/uploads/2025/03/%D0%94%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD-%D0%B1%D0%B5%D0%B7-%D0%BD%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F-1-3.png',
    nav: [
      {
        text: 'Сведения об образовательной организации',
        items: [
          { text: 'Основные сведения', link: '/organization/about' },
          { text: 'Образование', link: '/organization/education' },
          { text: 'Материально-техническое обеспечение', link: '/organization/facilities' },
          { text: 'Финансово-хозяйственная деятельность', link: '/organization/finance' },
          { text: 'Международное сотрудничество', link: '/organization/international' },
          { text: 'Структура и органы управления', link: '/organization/structure' },
          { text: 'Образовательные стандарты', link: '/organization/standards' },
          { text: 'Стипендии и меры поддержки обучающихся', link: '/organization/scholarships' },
          { text: 'Вакантные места', link: '/organization/vacancies' },
          { text: 'Документы', link: '/organization/documents.md' },
          { text: 'Руководство и педагогический состав', link: '/organization/staff' },
          { text: 'Платные образовательные услуги', link: '/organization/paid-services' },
          { text: 'Доступная среда', link: '/organization/accessibility' }
        ]
      },
      {
        text: 'Абитуриенту',
        items: [
          { text: 'День открытых дверей', link: '/applicant/open-day' },
          { text: 'Приемная комиссия', link: '/applicant/admission' },
          { text: 'Рейтинг абитуриентов', link: '/applicant/rating' },
          { text: 'Образовательный кредит', link: '/applicant/education-loan' },
          { text: 'Специальности', link: '/applicant/specialties' }
        ]
      },
      {
        text: 'Студентам',
        items: [
          { text: 'График учебного процесса', link: '/students/schedule' },
          { text: 'Места прохождения практики', link: '/students/practice' },
          { text: 'Шаблоны для выпускной квалификационной работы', link: '/students/thesis-templates' },
          { text: 'Преподаватели', link: '/students/professors' },
          { text: 'История', link: '/students/history' },
          { text: 'Почта преподавателей', link: '/students/prof-email' },
          { text: 'Студенческое научное общество', link: '/students/science-club' },
          { text: 'Расписание занятий', link: '/schedule' },
          { text: 'Столовая в колледже', link: '/students/canteen' },
          { text: 'Методические указания для студентов', link: '/students/guidelines' },
          { text: 'Призывникам', link: '/students/conscription' },
          { text: 'Дополнительные образовательные услуги', link: '/students/extra-courses' },
          { text: 'Медпункт', link: '/students/med-center' },
          { text: 'Бесплатная юридическая помощь', link: '/students/legal-help' },
          { text: 'Трудоустройство. Центр содействия трудоустройству выпускников. Вакансии', link: '/students/employment' },
          { text: 'Образовательный кредит', link: '/students/credit' },
          { text: 'Библиотека', link: '/students/library' },
          { text: 'События', link: '/students/events' },
          { text: 'Издательский центр', link: '/students/publishing' },
          { text: 'Заочное отделение', link: '/students/extramural' },
          { text: 'Поиск работы с помощью портала "Работа в России"', link: '/students/job-portal' },
          { text: 'Общежитие', link: '/students/dormitory' },
          { text: 'Центр занятости JOBKADROV.RU', link: '/students/career-center' }
        ]
      },
      {
        text: 'Преподавателям',
        items: [
          { text: 'Расписание преподавателей', link: '/schedule' },
          { text: 'Гигиеническое обучение', link: '/teachers/hygiene-training' },
          { text: 'Педагогика', link: '/teachers/pedagogy' }
        ]
      },
      { text: 'Рубрики', link: '/guide/' },
      {
        text: 'Контакты',
        items: [
          { text: 'Карточка учреджения', link: '/contacts/institution-card' },
          { text: 'Контакты', link: '/contacts/contacts' },
          { text: 'Реквизиты для оплаты', link: '/contacts/payment-details' },
          { text: 'Обратная связь', link: '/contacts/feedback' }
        ]
      }
    ],

    sidebar: sidebarConfig,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/nik5612/vitepresstestproject' },
      { icon: 'gitlab', link: 'https://gitlab.basealt.space/' }
    ],

    footer: {
      message: 'Контакты: <a href="https://vk.com/ppkslavyanova_official">Группа в ВК</a>, sekretar@ppkslavyanova.ru, +7 (342) 260-21-92',
      copyright: '© 2025 – настоящее время, Никита Б. ГБПОУ "ППК им. Н.Г. Славянова" 1919 - 2025'
    },

    editLink: {
      pattern: 'https://github.com/nik5612/vitepresstestproject/edit/main/:path'
    },

//     search: {
//       provider: 'local',
//       options: {
//         locales: {
//           ru: { // используйте ключ `root`, если хотите перевести локаль по умолчанию
//             translations: {
//               button: {
//                 buttonText: 'Поиск',
//                 buttonAriaLabel: 'Поиск'
//               },
//               modal: {
//                 displayDetails: 'Отобразить подробный список',
//                 resetButtonTitle: 'Сбросить поиск',
//                 backButtonTitle: 'Закрыть поиск',
//                 noResultsText: 'Нет результатов по запросу',
//                 footer: {
//                   selectText: 'выбрать',
//                   selectKeyAriaLabel: 'выбрать',
//                   navigateText: 'перейти',
//                   navigateUpKeyAriaLabel: 'стрелка вверх',
//                   navigateDownKeyAriaLabel: 'стрелка вниз',
//                   closeText: 'закрыть',
//                   closeKeyAriaLabel: 'esc'
//                 }
//               },
//             }
//           }
//         }
//       }
//     }
  }