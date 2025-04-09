<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api'
import AOS from 'aos'
import 'aos/dist/aos.css'

// 元件引入
import NewsTitle from '@/components/news/NewsTitle.vue'
import NewsItem from '@/components/news/NewsItem.vue'
import NewsPagination from '@/components/news/NewsPagination.vue'

// 狀態
const newsList = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(10)
const loading = ref(true)

// 獲取新聞列表
const fetchNews = async () => {
  try {
    loading.value = true
    const response = await api.getNews()
    newsList.value = response.data
  } catch (error) {
    console.error('無法獲取新聞列表:', error)
  } finally {
    loading.value = false
  }
}

// 計算總頁數
const totalPages = computed(() => {
  return Math.ceil(newsList.value.length / itemsPerPage.value)
})

// 當前頁面的新聞
const paginatedNews = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  return newsList.value.slice(startIndex, endIndex)
})

// 計算要顯示的頁碼
const displayedPages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages = []

  if (total <= 5) {
    // 如果總頁數小於等於5，全部顯示
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // 如果總頁數大於5，顯示當前頁附近的頁碼
    if (current <= 3) {
      // 當前頁接近開始
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
    } else if (current >= total - 2) {
      // 當前頁接近結束
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      // 當前頁在中間
      for (let i = current - 2; i <= current + 2; i++) {
        pages.push(i)
      }
    }
  }

  return pages
})

// 翻頁方法
const goToPage = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    goToPage(currentPage.value + 1)
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1)
  }
}

// 生命周期鉤子
onMounted(() => {
  // 初始化 AOS 動畫
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
  })

  // 獲取新聞列表
  fetchNews()
})
</script>

<template>
  <div class="project">
    <section class="news_list">
      <a class="toplogo" href="/">
        <img src="@/assets/images/logo1.svg" alt="傑森全球整合行銷" />
      </a>

      <NewsTitle />

      <div class="content">
        <div class="container">
          <ul v-if="!loading">
            <NewsItem v-for="news in paginatedNews" :key="news.id" :news="news" />
          </ul>
          <div v-else class="loading">
            <p>載入中...</p>
          </div>

          <NewsPagination v-if="totalPages > 0" :current-page="currentPage" :total-pages="totalPages" :displayed-pages="displayedPages" @go-to-page="goToPage" @prev-page="prevPage" @next-page="nextPage" />
        </div>
      </div>
    </section>
  </div>
</template>
