---
layout: page
title: "Сотрудники"
---

<script setup>
  import {
    VPTeamPage,
    VPTeamPageTitle,
    VPTeamMembers,
    VPTeamPageSection
  } from 'vitepress/theme'

  const coreMembers = [
    {
      avatar: 'https://avatars.githubusercontent.com/u/124361445?v=4&size=64',
      name: 'Никита Б',
      title: 'Создатель',
      links: [
        { icon: 'github', link: 'https://github.com/' },
        { icon: 'twitter', link: 'https://twitter.com/' }
      ]
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/124361445?v=4&size=64',
      name: 'Никита Б',
      title: 'Создатель',
      links: [
        { icon: 'github', link: 'https://github.com/' },
        { icon: 'twitter', link: 'https://twitter.com/' }
      ]
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/124361445?v=4&size=64',
      name: 'Никита Б',
      title: 'Создатель',
      links: [
        { icon: 'github', link: 'https://github.com/' },
        { icon: 'twitter', link: 'https://twitter.com/' }
      ]
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/124361445?v=4&size=64',
      name: 'Никита Б',
      title: 'Создатель',
      links: [
        { icon: 'github', link: 'https://github.com/' },
        { icon: 'twitter', link: 'https://twitter.com/' }
      ]
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/124361445?v=4&size=64',
      name: 'Никита Б',
      title: 'Создатель',
      links: [
        { icon: 'github', link: 'https://github.com/' },
        { icon: 'twitter', link: 'https://twitter.com/' }
      ]
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/124361445?v=4&size=64',
      name: 'Никита Б',
      title: 'Создатель',
      links: [
        { icon: 'github', link: 'https://github.com/' },
        { icon: 'twitter', link: 'https://twitter.com/' }
      ]
    },
  ]
  const partners = [
    {
      avatar: 'https://avatars.githubusercontent.com/u/124361445?v=4&size=64',
      name: 'Никита Б',
      title: 'Создатель',
      links: [
        { icon: 'github', link: 'https://github.com/' },
        { icon: 'twitter', link: 'https://twitter.com/' }
      ]
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/124361445?v=4&size=64',
      name: 'Никита Б',
      title: 'Создатель',
      links: [
        { icon: 'github', link: 'https://github.com/' },
        { icon: 'twitter', link: 'https://twitter.com/' }
      ]
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/124361445?v=4&size=64',
      name: 'Никита Б',
      title: 'Создатель',
      links: [
        { icon: 'github', link: 'https://github.com/' },
        { icon: 'twitter', link: 'https://twitter.com/' }
      ]
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/124361445?v=4&size=64',
      name: 'Никита Б',
      title: 'Создатель',
      links: [
        { icon: 'github', link: 'https://github.com/' },
        { icon: 'twitter', link: 'https://twitter.com/' }
      ]
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/124361445?v=4&size=64',
      name: 'Никита Б',
      title: 'Создатель',
      links: [
        { icon: 'github', link: 'https://github.com/' },
        { icon: 'twitter', link: 'https://twitter.com/' }
      ]
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/124361445?v=4&size=64',
      name: 'Никита Б',
      title: 'Создатель',
      links: [
        { icon: 'github', link: 'https://github.com/' },
        { icon: 'twitter', link: 'https://twitter.com/' }
      ]
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/124361445?v=4&size=64',
      name: 'Никита Б',
      title: 'Создатель',
      links: [
        { icon: 'github', link: 'https://github.com/' },
        { icon: 'twitter', link: 'https://twitter.com/' }
      ]
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/124361445?v=4&size=64',
      name: 'Никита Б',
      title: 'Создатель',
      links: [
        { icon: 'github', link: 'https://github.com/' },
        { icon: 'twitter', link: 'https://twitter.com/' }
      ]
    },
  ]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Наша команда</template>
    <template #lead>jkdsh osupdihf podfih podshf sdofh sdofh sodfsh sdofh sofiusdh osdihf sdoifhsd osidhf sodifh sdoifhsd oisdh sodifh sdoifh doifhsd ofisdh osdihf difh idshf soidfhjs oifhsd shdfo hdofihs fishd foisdhfo dhfosdihf sodihf odsihf sodifh soifhsd oifsdhjof isdjhfoi sfoisd osdijf osdifjh doifj sodifj osdifj sdoifjh oisdhf odsihf odifh soidfh osdifh osdifh sdoifjhs diuifhsodifhsodifh dsoifh sodihf sodifh odsihf sodihf oisdhf osdhfo isdhfoi shoif hs oioisd io</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="medium" :members="coreMembers" />
  <VPTeamPageSection>
    <template #title>Партнёры</template>
    <template #lead>...</template>
    <template #members>
      <VPTeamMembers size="small" :members="partners" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>