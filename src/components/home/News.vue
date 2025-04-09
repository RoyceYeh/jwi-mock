<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
api

const router = useRouter()
const newsItems = ref([])
const isLoading = ref(true)

// 在組件掛載時從 API 獲取新聞數據
onMounted(async () => {
  try {
    // 獲取最新的3條新聞
    const response = await api.getLatestNews(3)
    // 將 API 響應數據映射到我們需要的格式
    newsItems.value = response.data.map((item) => ({
      id: item.id,
      date: item.date,
      title: item.title,
      link: `/news/${item.id}`,
    }))
    // console.log(newsItems.value)
  } catch (error) {
    console.error('Error fetching news:', error)
  } finally {
    isLoading.value = false
  }
})

const navigateToNews = (link) => {
  router.push(link)
}

const viewAllNews = () => {
  router.push('/news')
}
</script>

<template>
  <section class="news">
    <div class="title">
      <div class="container">
        <h2>
          <span v-for="(letter, index) in 'NEWS'" :key="index" :data-aos="'fade-up-right'" :data-aos-delay="(index + 1) * 100" :data-aos-duration="500">
            {{ letter }}
          </span>
        </h2>
        <p data-aos="fade-up-right" data-aos-delay="600" data-aos-duration="500">最新消息</p>
      </div>
    </div>
    <div class="list">
      <ul>
        <li v-for="(item, index) in newsItems" :key="item.id">
          <div class="container">
            <a class="line" href="javascript:;" @click.prevent="navigateToNews(item.link)">
              <div class="text">
                <span>{{ item.date }}</span>
                <p>{{ item.title }}</p>
              </div>
              <div class="detail">
                <p>VIEW DETAIL</p>
              </div>
              <div :class="['line_marquee', index % 2 === 1 ? 'line_marquee1' : '']">
                <div class="track">
                  <p>
                    <span>VIEW DETAIL</span>
                    <span class="content">VIEW DETAIL</span>
                    <span>VIEW DETAIL</span>
                    <span class="content">VIEW DETAIL</span>
                    <span>VIEW DETAIL</span>
                    <span class="content">VIEW DETAIL</span>
                    <span>VIEW DETAIL</span>
                    <span class="content">VIEW DETAIL</span>
                  </p>
                </div>
              </div>
            </a>
          </div>
        </li>
        <li>
          <div class="more">
            <a class="btn" href="javascript:;" @click.prevent="viewAllNews">
              <p>See more</p>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
