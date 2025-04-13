<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useSwiper } from '@/composables/useSwiper'
import api from '@/services/api'

const router = useRouter()

// 作品數據，初始為空陣列
const workItems = ref([])
const isLoading = ref(true)

// 總幻燈片數量 - 會根據 API 返回的實際作品數量動態設置
const TOTAL_SLIDES = computed(() => workItems.value.length)

// 進度條動畫狀態
const isBarAnimating = ref(false)

// 使用 Swiper 組合式函數
const {
  swiperInstance,
  currentIndex,
  initSwiper,
  slideNext: swiperSlideNext,
  slidePrev: swiperSlidePrev,
  startAutoplay,
} = useSwiper({
  slidesPerView: 2.36,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  // 關閉Swiper內置分頁
  pagination: false,
  breakpoints: {
    320: {
      slidesPerView: 1.25,
    },
    768: {
      slidesPerView: 1.25,
    },
    1280: {
      slidesPerView: 2,
    },
    1281: {
      slidesPerView: 2.36,
    },
  },
})

// 當前幻燈片索引 - 使用計算屬性，確保在有效範圍內
const currentSlide = computed(() => {
  if (TOTAL_SLIDES.value === 0) return 0
  return currentIndex.value % TOTAL_SLIDES.value
})

// 重置進度條動畫
const resetBarAnimation = () => {
  isBarAnimating.value = false
  setTimeout(() => {
    isBarAnimating.value = true
  }, 100)
}

// 自定義下一張按鈕處理
const nextSlide = () => {
  resetBarAnimation()
  swiperSlideNext()
}

// 自定義上一張按鈕處理
const prevSlide = () => {
  resetBarAnimation()
  swiperSlidePrev()
}

// 跳轉到詳情頁
const navigateToWork = (link) => {
  router.push(link)
}

// 查看全部作品
const viewAllWorks = () => {
  router.push('/works')
}

// 計算可視輪播項目
const visibleWorks = computed(() => {
  // 如果數據還在加載或沒有數據，返回空陣列
  if (isLoading.value || workItems.value.length === 0) {
    return []
  }

  // 當 swiper 還未初始化時，直接顯示前幾個項目
  if (!swiperInstance.value) {
    const count = window.innerWidth <= 768 ? 2 : window.innerWidth <= 1280 ? 2 : 3
    return workItems.value.slice(0, count)
  }

  // 根據當前索引計算可見項目
  const startIndex = currentSlide.value
  const slidesPerView = swiperInstance.value.params.slidesPerView
  const result = []

  for (let i = 0; i < Math.ceil(slidesPerView); i++) {
    const index = (startIndex + i) % TOTAL_SLIDES.value
    result.push(workItems.value[index])
  }

  return result
})

// 確保自動輪播功能正常
const ensureAutoplayWorks = () => {
  if (swiperInstance.value && !swiperInstance.value.autoplay.running) {
    swiperInstance.value.autoplay.start()
    console.log('重新啟動自動輪播')
  }
}

// 從 API 獲取作品數據
const fetchWorks = async () => {
  try {
    const response = await api.getLatestWorks(6) // 獲取最新的6個作品

    // 轉換 API 響應為所需的格式
    workItems.value = response.data.map((item) => ({
      id: item.id,
      image: item.image, // 使用 API 中的圖片 URL
      title: item.title,
      tags: item.tags,
      link: `/works/${item.id}`,
    }))

    isLoading.value = false // 數據加載完成

    // 等待 DOM 更新後初始化 Swiper
    await nextTick()
    initSwiperAfterDataLoaded()
  } catch (error) {
    console.error('Error fetching works:', error)
    isLoading.value = false
  }
}

// 在數據加載後初始化 Swiper
const initSwiperAfterDataLoaded = async () => {
  if (workItems.value.length > 0) {
    // 啟動進度條動畫
    isBarAnimating.value = true

    // 初始化 Swiper
    await initSwiper('.works-swiper', {
      on: {
        init: () => {
          // 確保自動播放啟動
          setTimeout(() => {
            startAutoplay()
            ensureAutoplayWorks()
          }, 100)
        },
        slideChange: () => {
          resetBarAnimation()
        },
      },
    })

    // 額外確保自動輪播功能正常
    setTimeout(() => {
      ensureAutoplayWorks()
    }, 1000)
  }
}

onMounted(() => {
  // 獲取數據
  fetchWorks()
})
</script>

<template>
  <section class="works">
    <div class="content">
      <div class="left">
        <div class="title">
          <h2>
            <span v-for="(letter, index) in 'WORKS'" :key="index" :data-aos="'fade-up-right'" :data-aos-delay="(index + 1) * 100" :data-aos-duration="500">
              {{ letter }}
            </span>
          </h2>
          <p data-aos="fade-up-right" data-aos-delay="600" data-aos-duration="500">精彩案例</p>
        </div>
        <div class="bar" :class="{ on: isBarAnimating }"></div>
      </div>
      <div v-if="isLoading" class="loading">
        <p>載入中...</p>
      </div>
      <div v-else-if="workItems.length === 0" class="no-data">
        <p>暫無作品資料</p>
      </div>
      <div v-else class="swiper_box">
        <div class="swiper works-swiper">
          <div class="swiper-wrapper">
            <div v-for="work in workItems" :key="work.id" class="swiper-slide">
              <a href="javascript:;" @click.prevent="navigateToWork(work.link)">
                <div class="pic">
                  <div class="bg" :style="{ backgroundImage: `url(${work.image})` }"></div>
                </div>
                <p class="text">{{ work.title }}</p>
                <div class="tags">
                  <div v-for="(tag, tagIndex) in work.tags" :key="tagIndex" class="tag">
                    <p>{{ tag }}</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="swiper-button-next" @click.prevent="nextSlide">
            <div class="pic"></div>
          </div>
          <div class="swiper-button-prev" @click.prevent="prevSlide">
            <div class="pic"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="more">
      <a class="btn" href="javascript:;" @click.prevent="viewAllWorks">
        <p>All projects</p>
      </a>
    </div>
    <div class="grayslogan">JWI Marketing</div>
  </section>
</template>
