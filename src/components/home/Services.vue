<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 引入圖片
import service1Img from '@/assets/images/service1.png'
import service2Img from '@/assets/images/service2.png'
import service3Img from '@/assets/images/service3.png'
import service4Img from '@/assets/images/service4.png'
import service5Img from '@/assets/images/service5.png'
import service6Img from '@/assets/images/service6.png'
import service7Img from '@/assets/images/service7.png'
import service8Img from '@/assets/images/service8.png'

// 服務項目數據
const serviceItems = ref([
  {
    id: 1,
    image: service1Img,
    titleCn: '大型活動',
    titleEn: 'Event',
  },
  {
    id: 2,
    image: service2Img,
    titleCn: '影像製作',
    titleEn: 'Video',
  },
  {
    id: 3,
    image: service3Img,
    titleCn: '通路行銷',
    titleEn: 'Trade',
  },
  {
    id: 4,
    image: service4Img,
    titleCn: '網站建置',
    titleEn: 'Website',
  },
  {
    id: 5,
    image: service5Img,
    titleCn: '媒體公關',
    titleEn: 'PR\nPromotion',
  },
  {
    id: 6,
    image: service6Img,
    titleCn: '媒體代理',
    titleEn: 'Agency',
  },
  {
    id: 7,
    image: service7Img,
    titleCn: '社群行銷',
    titleEn: 'Social',
  },
  {
    id: 8,
    image: service8Img,
    titleCn: '網路行銷',
    titleEn: 'Internet',
  },
])

// 隨機效果相關變數
const effectTimer = ref(null)
const selectedBoxes = ref([])

// 隨機選擇兩個盒子並添加效果
const addRandomEffects = () => {
  // 清除之前的效果
  selectedBoxes.value.forEach((id) => {
    const box = document.querySelector(`.service .items .box[data-id="${id}"]`)
    if (box) {
      box.classList.remove('effect')
    }
  })

  // 重置選擇
  selectedBoxes.value = []

  // 隨機選擇兩個盒子
  const totalBoxes = serviceItems.value.length
  const availableIndices = Array.from({ length: totalBoxes }, (_, i) => i + 1)

  for (let i = 0; i < 2; i++) {
    if (availableIndices.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableIndices.length)
      const selectedId = availableIndices.splice(randomIndex, 1)[0]
      selectedBoxes.value.push(selectedId)
    }
  }

  // 添加效果
  selectedBoxes.value.forEach((id) => {
    const box = document.querySelector(`.service .items .box[data-id="${id}"]`)
    if (box) {
      box.classList.add('effect')
    }
  })

  // 設定3.5秒後移除效果
  setTimeout(() => {
    selectedBoxes.value.forEach((id) => {
      const box = document.querySelector(`.service .items .box[data-id="${id}"]`)
      if (box) {
        box.classList.remove('effect')
      }
    })
  }, 3500)
}

// 鼠標移入事件處理
const handleMouseEnter = () => {
  // 清除定時器
  if (effectTimer.value) {
    clearInterval(effectTimer.value)
  }

  // 移除所有效果
  document.querySelectorAll('.service .items .box').forEach((box) => {
    box.classList.remove('effect')
  })
}

// 鼠標移出事件處理
const handleMouseLeave = () => {
  // 重新啟動定時器
  effectTimer.value = setInterval(addRandomEffects, 3600)
}

onMounted(() => {
  // 啟動隨機效果定時器
  effectTimer.value = setInterval(addRandomEffects, 3600)
})

onUnmounted(() => {
  // 清除定時器
  if (effectTimer.value) {
    clearInterval(effectTimer.value)
  }
})
</script>

<template>
  <section class="service" id="service">
    <div class="container">
      <div class="grayslogan">JWI Marketing</div>
      <div class="content">
        <div class="title">
          <h2>
            <span v-for="(letter, index) in 'SERVICES'" :key="index" :data-aos="'fade-up-right'" :data-aos-delay="(index + 1) * 100" :data-aos-duration="500">
              {{ letter }}
            </span>
          </h2>
          <p data-aos="fade-up-right" data-aos-delay="600" data-aos-duration="500">服務項目</p>
          <span data-aos="fade-up-right" data-aos-delay="700" data-aos-duration="500">以科技、知識、文創為軸心，結合社群、內容與商務的價值鏈，提供客戶全方位的整合行銷服務</span>
        </div>
        <div class="items">
          <div class="row">
            <a v-for="item in serviceItems" :key="item.id" :data-id="item.id" class="box" href="javascript:;" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
              <div class="pic" :style="{ backgroundImage: `url(${item.image})` }"></div>
              <span class="cn">{{ item.titleCn }}</span>
              <span class="en" v-html="item.titleEn.replace('\n', '<br>')"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
