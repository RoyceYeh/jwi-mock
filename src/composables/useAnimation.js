import { ref, onMounted } from 'vue'

export function useAnimation() {
  const hasAOS = ref(false)

  // 初始化 AOS 動畫庫
  const initAOS = () => {
    if (window.AOS) {
      window.AOS.init({
        duration: 800,
        once: false,
        mirror: true,
      })
      hasAOS.value = true
    }
  }

  // 刷新 AOS 動畫
  const refreshAOS = () => {
    if (hasAOS.value && window.AOS) {
      window.AOS.refresh()
    }
  }

  onMounted(() => {
    initAOS()
  })

  return {
    hasAOS,
    initAOS,
    refreshAOS,
  }
}

// composables/useSwiper.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useSwiper(options = {}) {
  const swiperInstance = ref(null)
  const isInitialized = ref(false)

  // 初始化 Swiper
  const initSwiper = (selector, config = {}) => {
    if (window.Swiper) {
      const defaultConfig = {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        ...options,
      }

      swiperInstance.value = new window.Swiper(selector, {
        ...defaultConfig,
        ...config,
      })

      isInitialized.value = true
    }
  }

  // 銷毀 Swiper 實例
  const destroySwiper = () => {
    if (swiperInstance.value) {
      swiperInstance.value.destroy()
      swiperInstance.value = null
      isInitialized.value = false
    }
  }

  onUnmounted(() => {
    destroySwiper()
  })

  return {
    swiperInstance,
    isInitialized,
    initSwiper,
    destroySwiper,
  }
}
