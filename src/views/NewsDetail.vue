<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'
import AOS from 'aos'
import 'aos/dist/aos.css'

// 路由和數據
const route = useRoute()
const router = useRouter()
const news = ref({})
const allNews = ref([])
const loading = ref(true)

// 計算當前新聞ID（保證為數字類型）
const currentId = computed(() => Number(route.params.id))

// 格式化內容，確保段落和圖片正確顯示
const formatContent = (content) => {
  if (!content) return ''

  // 將純文本內容轉換為帶有段落的 HTML
  if (!content.includes('<')) {
    return content
      .split('\n')
      .filter((paragraph) => paragraph.trim())
      .map((paragraph) => {
        return `<p>${paragraph}</p>`
      })
      .join('')
  }

  return content
}

// 獲取新聞數據
const fetchNewsData = async () => {
  try {
    loading.value = true

    // 獲取當前新聞詳情
    const response = await api.getNewsById(currentId.value)
    news.value = response.data

    // 獲取所有新聞，用於前後導航
    const allNewsResponse = await api.getNews()
    // 確保所有ID都是數字類型，避免類型不匹配問題
    allNews.value = allNewsResponse.data.map((item) => ({
      ...item,
      id: Number(item.id),
    }))

    // 調試輸出
    const index = allNews.value.findIndex((item) => item.id === currentId.value)
    console.log('數據獲取完成', {
      currentId: currentId.value,
      allNewsCount: allNews.value.length,
      currentIndex: index,
      allNewsIds: allNews.value.map((item) => item.id),
    })

    if (index === -1) {
      console.error(`在新聞列表中找不到ID為 ${currentId.value} 的新聞，請檢查API返回的數據結構`)
    }
  } catch (error) {
    console.error('無法獲取新聞數據:', error)
    router.push('/news')
  } finally {
    loading.value = false
  }
}

// 計算前一篇新聞的 ID
const prevNewsId = computed(() => {
  if (!allNews.value.length) return null

  const index = allNews.value.findIndex((item) => item.id === currentId.value)
  console.log('計算前一篇時，當前索引:', index, '當前ID:', currentId.value)

  if (index <= 0) return null
  return allNews.value[index - 1].id
})

// 計算後一篇新聞的 ID
const nextNewsId = computed(() => {
  if (!allNews.value.length) return null

  const index = allNews.value.findIndex((item) => item.id === currentId.value)
  console.log('計算後一篇時，當前索引:', index, '當前ID:', currentId.value)

  if (index === -1 || index === allNews.value.length - 1) return null
  return allNews.value[index + 1].id
})

// 導航到前一篇文章
const goToPrev = () => {
  if (prevNewsId.value) {
    console.log('導航到前一篇:', prevNewsId.value)
    router.push(`/news/${prevNewsId.value}`)
  }
}

// 導航到後一篇文章
const goToNext = () => {
  if (nextNewsId.value) {
    console.log('導航到後一篇:', nextNewsId.value)
    router.push(`/news/${nextNewsId.value}`)
  }
}

// 監聽路由變化，當參數改變時重新獲取數據
watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      console.log(`路由參數從 ${oldId} 變為 ${newId}，重新獲取數據`)
      window.scrollTo(0, 0)
      fetchNewsData()
    }
  },
  { immediate: true }
)

// 生命周期鉤子
onMounted(() => {
  // 初始化 AOS 動畫
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
  })
})
</script>

<template>
  <div class="project">
    <section class="news_content">
      <a class="toplogo" href="/">
        <img src="@/assets/images/logo1.svg" alt="傑森全球整合行銷" />
      </a>

      <div class="title">
        <div class="container lock">
          <h2>
            <span v-for="(char, index) in 'NEWS'" :key="index" data-aos="fade-up-right" :data-aos-delay="(index + 1) * 100" data-aos-duration="500">
              {{ char }}
            </span>
          </h2>
          <p data-aos="fade-up-right" data-aos-delay="600" data-aos-duration="500">最新消息</p>
        </div>
        <div class="breadcrumb">
          <div class="container">
            <div class="pic">
              <img src="@/assets/images/home.svg" alt="首頁" />
            </div>
            <router-link to="/">
              <p>首頁</p>
            </router-link>
            <i>/</i>
            <router-link to="/news">
              <span>最新消息</span>
            </router-link>
            <i>/</i>
            <a class="grey" href="javascript:;">
              <span>{{ news.title || '載入中...' }}</span>
            </a>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="container" v-if="!loading">
          <div class="date">{{ news.date }}</div>
          <h3>{{ news.title }}</h3>
          <div class="edit">
            <!-- 主圖 -->
            <figure v-if="news.image">
              <img :src="news.image" :alt="news.title" />
            </figure>

            <!-- 文章內容 -->
            <div v-html="formatContent(news.content)"></div>

            <!-- 標籤 -->
            <div class="tags" v-if="news.tags && news.tags.length">
              <span v-for="(tag, index) in news.tags" :key="index" class="tag">{{ tag }}</span>
            </div>
          </div>

          <div class="pagination">
            <a class="prev" @click="goToPrev" :class="{ disabled: !prevNewsId }">
              <div class="pic"></div>
              <span>PREV</span>
            </a>

            <router-link to="/news">LIST</router-link>

            <a class="next" @click="goToNext" :class="{ disabled: !nextNewsId }">
              <span>NEXT</span>
              <div class="pic"></div>
            </a>
          </div>
        </div>
        <div class="container" v-else>
          <div class="loading">
            <p>載入中...</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
