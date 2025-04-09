<script setup>
import { onMounted } from 'vue'
import Banner from '../components/home/Banner.vue'
import About from '../components/home/About.vue'
import News from '../components/home/News.vue'
import Works from '../components/home/Works.vue'
import Services from '../components/home/Services.vue'
import Contact from '../components/home/Contact.vue'

onMounted(() => {
  // 如果 URL 中有錨點，滾動到對應位置
  if (window.location.hash) {
    setTimeout(() => {
      const element = document.querySelector(window.location.hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 500)
  }
})
</script>

<template>
  <div>
    <Banner />
    <About />
    <News />
    <Works />
    <Services />
    <Contact />
  </div>
</template>
<style>
@import '@/assets/scss/index.scss';
</style>
