<!-- src/views/WorkDetail.vue -->
<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const workId = computed(() => route.params.id)
const work = ref(null)
const relatedWorks = ref([])
const loading = ref(true)
const error = ref(null)

// 將內容分段處理，避免使用 v-html
const contentParagraphs = computed(() => {
  if (!work.value || !work.value.content) return []
  return work.value.content.split('\n').filter((paragraph) => paragraph.trim() !== '')
})

const fetchWorkDetail = async () => {
  try {
    loading.value = true
    const response = await api.getWorksById(workId.value)
    work.value = response.data
    loading.value = false

    // 獲取隨機推薦作品
    fetchRandomWorks()
  } catch (err) {
    console.error('Failed to fetch work details:', err)
    error.value = '無法載入案例詳情，請稍後再試'
    loading.value = false
  }
}

const fetchRandomWorks = async () => {
  try {
    // 獲取所有作品
    const response = await api.getWorks()
    const allWorks = response.data

    // 過濾掉當前正在查看的作品
    const filteredWorks = allWorks.filter((item) => String(item.id) !== String(workId.value))

    // 打亂順序並選取前3個
    const shuffled = shuffleArray(filteredWorks)
    relatedWorks.value = shuffled.slice(0, 3)
  } catch (err) {
    console.error('Failed to fetch random works:', err)
  }
}

// Fisher-Yates 洗牌算法實現隨機排序
const shuffleArray = (array) => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// 監聽路由參數變化，當 ID 改變時重新獲取資料
watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      console.log(`Route ID changed from ${oldId} to ${newId}, fetching new data...`)
      fetchWorkDetail()
      // 滾動回頁面頂部
      window.scrollTo(0, 0)
    }
  },
  { immediate: true }
)

onMounted(() => {
  // 初始獲取已移到 watch 中使用 immediate: true 處理
})
</script>

<template>
  <section class="work_content">
    <div class="title">
      <div class="container lock">
        <h2>
          <span data-aos="fade-up-right" data-aos-delay="100" data-aos-duration="500">W</span>
          <span data-aos="fade-up-right" data-aos-delay="200" data-aos-duration="500">O</span>
          <span data-aos="fade-up-right" data-aos-delay="300" data-aos-duration="500">R</span>
          <span data-aos="fade-up-right" data-aos-delay="400" data-aos-duration="500">K</span>
          <span data-aos="fade-up-right" data-aos-delay="500" data-aos-duration="500">S</span>
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
          <router-link to="/works">
            <span>精彩案例</span>
          </router-link>
          <i>/</i>
          <router-link class="grey" :to="{ name: 'WorkDetail', params: { id: workId } }">
            <span>{{ work?.title || '載入中...' }}</span>
          </router-link>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="container" v-if="loading">
        <div class="loading">載入中...</div>
      </div>

      <div class="container" v-else-if="error">
        <div class="error">{{ error }}</div>
      </div>

      <div class="container" v-else-if="work">
        <div class="date">{{ work.date }}</div>
        <h3>{{ work.title }}</h3>

        <div class="edit">
          <!-- 顯示主圖 -->
          <figure v-if="work.image">
            <img :src="work.image" :alt="work.title" />
          </figure>

          <!-- 安全顯示內容段落 -->
          <p v-for="(paragraph, index) in contentParagraphs" :key="index">
            {{ paragraph }}
          </p>
        </div>

        <div class="others" v-if="relatedWorks.length > 0">
          <p class="sub">其他精彩案例</p>
          <ul>
            <li class="list" v-for="relatedWork in relatedWorks" :key="relatedWork.id">
              <router-link :to="{ name: 'WorkDetail', params: { id: String(relatedWork.id) } }">
                <div class="pic">
                  <div class="bg" :style="{ backgroundImage: `url('${relatedWork.image}')` }"></div>
                </div>
                <h3>{{ relatedWork.title }}</h3>
                <p class="text">{{ relatedWork.content }}</p>
                <div class="tags">
                  <div class="tag" v-for="(tag, index) in relatedWork.tags" :key="index">
                    <p>{{ tag }}</p>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
