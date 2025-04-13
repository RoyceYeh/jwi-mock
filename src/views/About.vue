<script setup>
import { onMounted } from 'vue'
import AboutPage from '../components/about/AboutPage.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  // 在頁面加載時設置頁面標題
  document.title = '關於我們 - 傑森全球整合行銷'

  AOS.init()

  // 滾動到頁面頂部
  window.scrollTo(0, 0)
})
</script>

<template>
  <AboutPage />
</template>
