<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSwiper } from '@/composables/useSwiper'

// 引入圖片
import arrowdown from '@/assets/images/arrowdown.svg'
import header1 from '@/assets/images/header1.png'
import header2 from '@/assets/images/header2.png'
import header3 from '@/assets/images/header3.png'
import header4 from '@/assets/images/header4.png'

// 輪播數據
const slides = [
  { id: 1, image: header1, maskClass: '' },
  { id: 2, image: header2, maskClass: 'mask1' },
  { id: 3, image: header3, maskClass: '' },
  { id: 4, image: header4, maskClass: 'mask1' },
]

// 使用 Swiper 組合式函數
const { currentIndex: currentSlide, initSwiper } = useSwiper({
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  autoplay: {
    delay: 4250,
    disableOnInteraction: false,
  },
  loop: true,
})

// 動畫狀態
const isAnimating = ref([true, false, false, false])

// 更新動畫狀態的方法
const updateAnimationState = (index) => {
  // 重置所有輪播的動畫狀態
  isAnimating.value = isAnimating.value.map(() => false)
  // 設置當前輪播的動畫狀態
  isAnimating.value[index] = true
}

// 滾動到指定部分
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(async () => {
  // 初始化第一張輪播的動畫
  isAnimating.value[0] = true

  // 初始化 Swiper
  const swiper = await initSwiper('.banner-swiper', {
    on: {
      slideChangeTransitionStart: function () {
        // 更新當前輪播的動畫狀態
        updateAnimationState(this.realIndex)
      },
    },
  })
})
</script>

<template>
  <section class="banner">
    <h2 class="slogan">
      MISSION
      <span>打造專屬旅遊品牌的商業模組</span>
    </h2>

    <a class="scrolldown" href="javascript:;" @click.prevent="scrollToSection('service')">
      <div class="pic">
        <img :src="arrowdown" alt="scroll down" />
      </div>
    </a>

    <div class="swiper banner-swiper">
      <div class="swiper-wrapper">
        <div v-for="(slide, index) in slides" :key="slide.id" class="swiper-slide" :class="{ 'swiper-slide-active': index === currentSlide }">
          <div class="image-container" :class="{ animation: isAnimating[index] }" :style="{ backgroundImage: `url(${slide.image})` }"></div>
          <div class="mask" :class="slide.maskClass"></div>
        </div>
      </div>
    </div>
  </section>
</template>
