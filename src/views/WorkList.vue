<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'
import WorkListContent from '../components/work/WorkListContent.vue'
import WorkPagination from '../components/work/WorkPagination.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

const works = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(9)
const loading = ref(true)
const error = ref(null)

const fetchWorks = async () => {
  try {
    loading.value = true
    const response = await api.getWorks()
    works.value = response.data
    loading.value = false
  } catch (err) {
    console.error('Failed to fetch works:', err)
    error.value = '無法載入案例數據，請稍後再試'
    loading.value = false
  }
}

const totalPages = computed(() => {
  return Math.ceil(works.value.length / itemsPerPage.value)
})

const paginatedWorks = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  return works.value.slice(startIndex, endIndex)
})

const handlePageChange = (page) => {
  currentPage.value = page
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(() => {
  // 初始化 AOS 動畫
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
  })
  fetchWorks()
})
</script>

<template>
  <section class="work_list">
    <div class="title">
      <div class="container lock">
        <h2>
          <span data-aos="fade-up-right" data-aos-delay="100" data-aos-duration="500">W</span>
          <span data-aos="fade-up-right" data-aos-delay="200" data-aos-duration="500">O</span>
          <span data-aos="fade-up-right" data-aos-delay="300" data-aos-duration="500">R</span>
          <span data-aos="fade-up-right" data-aos-delay="300" data-aos-duration="500">K</span>
          <span data-aos="fade-up-right" data-aos-delay="400" data-aos-duration="500">S</span>
        </h2>
        <p data-aos="fade-up-right" data-aos-delay="600" data-aos-duration="500">精彩案例</p>
      </div>
      <div class="breadcrumb">
        <div class="container">
          <div class="pic">
            <img src="../assets/images/home.svg" alt="Home" />
          </div>
          <router-link to="/">
            <p>首頁</p>
          </router-link>
          <i>/</i>
          <router-link class="grey" to="/works">
            <span>精彩案例</span>
          </router-link>
        </div>
      </div>
    </div>

    <WorkListContent :works="paginatedWorks" :loading="loading" />

    <div class="content" v-if="totalPages > 1">
      <div class="container">
        <WorkPagination :currentPage="currentPage" :totalPages="totalPages" @page-changed="handlePageChange" />
      </div>
    </div>
  </section>
</template>
