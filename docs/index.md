---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
title: "Главная"
hero:
  image:
    src: https://ppkslavyanova.ru/wp-content/uploads/2025/03/%D0%94%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD-%D0%B1%D0%B5%D0%B7-%D0%BD%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F-1-3.png
  name: "Пермский политехнический колледж"
  text: "имени Н.Г. Славянова"
  tagline: Технологии как смысл жизни
  actions:
    - theme: brand
      text: Основные образовательные программы
      link: /program
    - theme: alt
      text: О нас
      link: /about
    - theme: alt
      text: НОВОСТИ
      link: /news/

features:
  - title: Инструкция для регистрации и входа в ЭПОС
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
    link: /news
    icon: 🧸
  - title: Расписание
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
    link: /schedule
    icon: 🗓️
  - title: Специальности
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
    link: /news
    icon: 📚
  - title: Приёмная комиссия
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
    link: /news
    icon: 🏢 

    
---

<style>
  :root {
    --vp-home-hero-tagline-font-size: 30px;
    --vp-home-hero-text-font-size: 50px;
    --vp-home-hero-name-font-size: 67px;
    --vp-home-hero-name-color: transparent;
    --vp-home-hero-name-background: -webkit-linear-gradient(
      120deg,#bd34fe,#41d1ff
    );
  }

  .VPHero .name {
    font-size: var(--vp-home-hero-name-font-size) !important;
  }

  .VPHero .text {
    font-size: var(--vp-home-hero-text-font-size) !important;
  }

  .VPHero .tagline {
    font-size: var(--vp-home-hero-tagline-font-size) !important;
  }

  /* Мобильные стили */
  @media (max-width: 768px) {
    :root {
      --vp-home-hero-tagline-font-size: 20px;
      --vp-home-hero-text-font-size: 32px;
      --vp-home-hero-name-font-size: 42px;
    }
    
    .VPHero .name,
    .VPHero .text,
    .VPHero .tagline {
      text-align: center;
    }
    
    .VPHero .actions {
      justify-content: center;
    }
  }

  /* Очень маленькие экраны */
  @media (max-width: 480px) {
    :root {
      --vp-home-hero-tagline-font-size: 18px;
      --vp-home-hero-text-font-size: 28px;
      --vp-home-hero-name-font-size: 36px;
    }
  }
</style>

<br>

# Последние новости
<script setup>
import NewsTest from './components/NewsIndex.vue'
</script>

<NewsTest />

# Реставрация учебного корпуса
<video controls="controls" src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/7075899640376.mp4"></video>

<br>

# Партнёры

<table>
    <tr style="background-color:rgb(255, 255, 255);">
        <th style="width: 16.6%; background-color:rgb(255, 255, 255);"><img src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/motovoliha.png" alt="Описание изображения"></th>
        <th style="width: 16.6%; background-color:rgb(255, 255, 255);"><img src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/elcam_neftemash.png" alt="Описание изображения"></th>
        <th style="width: 16.6%; background-color:rgb(255, 255, 255);"><img src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/asoik.png" alt="Описание изображения"></th>
        <th style="width: 16.6%; background-color:rgb(255, 255, 255);"><img src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/galopolimer.png" alt="Описание изображения"></th>
        <th style="width: 16.6%; background-color:rgb(255, 255, 255);"><img src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/ekskurs.jpg" alt="Описание изображения"></th>
        <th style="width: 16.6%; background-color:rgb(255, 255, 255);"><img src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/%D0%B3%D0%B0%D0%BB%D0%BE%D0%BF%D0%BE%D0%BB%D0%B8%D0%BC%D0%B5%D1%80.webp" alt="Описание изображения"></th>
    </tr>
    <tr style="background-color:rgb(255, 255, 255);">
        <td><img src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/stroi_ural.png" alt="Описание изображения"></td>
        <td><img src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/torgmash.png" alt="Описание изображения"></td>
        <td><img src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/promoil.png" alt="Описание изображения"></td>
        <td><img src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/pcbk.png" alt="Описание изображения"></td>
        <td><img src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/ertelecom-2048x335.png" alt="Описание изображения"></td>
        <td><img src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/%D0%A2-%D0%BF%D0%BB%D1%8E%D1%81.png" alt="Описание изображения"></td>
    </tr>
    <tr style="background-color:rgb(255, 255, 255);">
        <td><img src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/kama_sud.png" alt="Описание изображения"></td>
        <td><img src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/Novomet-group-logo-2048x563.png" alt="Описание изображения"></td>
        <td><img src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/peremena-perm_logo_blue.png" alt="Описание изображения"></td>
        <td><img src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/iscra.png" alt="Описание изображения"></td>
        <td><img src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/proton.png" alt="Описание изображения"></td>
        <td><img src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/%D0%9A%D0%B5%D0%B4%D1%80%D0%BE%D0%BD.svg" alt="Описание изображения"></td>
    </tr>
    <tr style="background-color:rgb(255, 255, 255);">
        <td><img src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/sinergiya.png" alt="Описание изображения"></td>
        <td><img src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/%D0%9C%D0%B0%D1%88%D0%B8%D0%BD%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C.svg" alt="Описание изображения"></td>
        <td><img src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/%D0%A1%D0%9A%D0%91.webp" alt="Описание изображения"></td>
        <td><img src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/sayac.png" alt="Описание изображения"></td>
        <td><img src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/%D0%9E%D0%B4%D0%BA-%D0%9F%D0%9C.webp" alt="Описание изображения"></td>
        <td><img src="https://ppkslavyanova.ru/wp-content/uploads/2025/03/%D0%AD%D0%B4%D0%BD%D0%B0.webp" alt="Описание изображения"></td>
    </tr>
</table>