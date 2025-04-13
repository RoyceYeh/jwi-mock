<script setup>
import { onMounted } from 'vue'
import Banner from '../components/home/Banner.vue'
import About from '../components/home/About.vue'
import News from '../components/home/News.vue'
import Works from '../components/home/Works.vue'
import Services from '../components/home/Services.vue'
import Contact from '../components/home/Contact.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  AOS.init({})
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
