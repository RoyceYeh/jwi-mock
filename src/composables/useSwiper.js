// src/composables/useSwiper.js

import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

/**
 * 使用 Swiper 的組合式函數
 * @param {Object} options - Swiper 配置選項
 * @returns {Object} Swiper 相關響應式狀態和方法
 */
export function useSwiper(options = {}) {
  const swiperInstance = ref(null)
  const isInitialized = ref(false)
  const currentIndex = ref(0)
  const totalSlides = ref(0)

  // 初始化 Swiper
  const initSwiper = async (selector, config = {}) => {
    // 確保 DOM 元素已渲染
    await nextTick()

    // 預設配置
    const defaultConfig = {
      modules: [Navigation, Pagination, Autoplay, EffectFade],
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return `<span class="${currentClass}"></span>` + '<span id="text">/</span>' + `<span class="${totalClass}"></span>`
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        init: (swiper) => {
          // 初始化時獲取總幻燈片數量（去除複製的幻燈片）
          if (swiper.loopedSlides) {
            totalSlides.value = swiper.slides.length - swiper.loopedSlides * 2
          } else {
            totalSlides.value = swiper.slides.length
          }
          currentIndex.value = swiper.realIndex
        },
        slideChange: (swiper) => {
          currentIndex.value = swiper.realIndex
        },
      },
      ...options,
    }

    try {
      // 創建 Swiper 實例
      swiperInstance.value = new Swiper(selector, {
        ...defaultConfig,
        ...config,
      })

      isInitialized.value = true

      // 返回 Swiper 實例
      return swiperInstance.value
    } catch (error) {
      console.error('初始化 Swiper 失敗:', error)
      return null
    }
  }

  // 更新 Swiper 配置
  const updateSwiper = (config = {}) => {
    if (!swiperInstance.value) return

    Object.keys(config).forEach((key) => {
      swiperInstance.value.params[key] = config[key]
    })

    swiperInstance.value.update()
  }

  // 切換到下一張幻燈片
  const slideNext = () => {
    if (swiperInstance.value) {
      swiperInstance.value.slideNext()
    }
  }

  // 切換到上一張幻燈片
  const slidePrev = () => {
    if (swiperInstance.value) {
      swiperInstance.value.slidePrev()
    }
  }

  // 切換到指定幻燈片
  const slideTo = (index, speed = 300, runCallbacks = true) => {
    if (swiperInstance.value) {
      swiperInstance.value.slideTo(index, speed, runCallbacks)
    }
  }

  // 啟用自動播放
  const startAutoplay = () => {
    if (swiperInstance.value && swiperInstance.value.autoplay) {
      swiperInstance.value.autoplay.start()
    }
  }

  // 停止自動播放
  const stopAutoplay = () => {
    if (swiperInstance.value && swiperInstance.value.autoplay) {
      swiperInstance.value.autoplay.stop()
    }
  }

  // 重新計算幻燈片（在視窗大小改變或類似情況下）
  const updateSize = () => {
    if (swiperInstance.value) {
      swiperInstance.value.updateSize()
      swiperInstance.value.updateSlides()
    }
  }

  // 獲取當前總幻燈片數量
  const getTotalSlides = () => {
    return totalSlides.value
  }

  // 設置自定義總幻燈片數量
  const setTotalSlides = (count) => {
    totalSlides.value = count

    // 如果自定義了總幻燈片數量，則手動更新分頁器
    if (swiperInstance.value && swiperInstance.value.pagination && swiperInstance.value.pagination.el) {
      const totalEl = swiperInstance.value.pagination.el.querySelector('.swiper-pagination-total')
      if (totalEl) {
        totalEl.textContent = count
      }
    }
  }

  // 銷毀 Swiper 實例
  const destroySwiper = () => {
    if (swiperInstance.value) {
      swiperInstance.value.destroy(true, true)
      swiperInstance.value = null
      isInitialized.value = false
    }
  }

  // 生命週期鉤子 - 組件卸載時清理資源
  onUnmounted(() => {
    destroySwiper()
  })

  return {
    swiperInstance,
    isInitialized,
    currentIndex,
    totalSlides,
    initSwiper,
    updateSwiper,
    slideNext,
    slidePrev,
    slideTo,
    startAutoplay,
    stopAutoplay,
    updateSize,
    getTotalSlides,
    setTotalSlides,
    destroySwiper,
  }
}
