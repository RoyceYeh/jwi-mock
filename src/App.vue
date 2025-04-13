<script setup>
import { computed } from 'vue'
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import { useRoute } from 'vue-router'
import logo1Img from '@/assets/images/logo1.svg'

// 使用路由參數創建唯一key，強制在路由參數變化時重新渲染組件
const route = useRoute()
const routeKey = computed(() => route.fullPath)
</script>

<template>
  <div class="project">
    <router-link to="/" class="toplogo">
      <img :src="logo1Img" alt="Logo" />
    </router-link>
    <Header />
    <!-- 使用:key確保路由變化時重新渲染組件 -->
    <router-view :key="routeKey" />
    <Footer />
  </div>
</template>
