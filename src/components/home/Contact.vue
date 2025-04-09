<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import contactBgImg from '@/assets/images/contact.png'

const router = useRouter()

// 背景圖片樣式
const contactBgStyle = computed(() => ({
  backgroundImage: `url(${contactBgImg})`,
}))

// 聯絡資訊
const contactInfo = ref({
  address: '台北市內湖區石潭路151號',
  telephone: '02-8793-9688 (平日10:00-17:00)',
})

// 導航到關於頁面
const navigateToAbout = () => {
  router.push('/about')
}

// 電子郵件聯絡方式
const sendEmail = () => {
  window.location.href = 'mailto:contact@jwi.com.tw'
}

// 前往招募頁面
const navigateToRecruit = () => {
  window.open('https://www.104.com.tw/company/b8j2fc8', '_blank')
}
</script>

<template>
  <section class="contact" id="contact" :style="contactBgStyle">
    <div class="container">
      <div class="title">
        <h2>
          <span v-for="(letter, index) in 'CONTACT'" :key="index" :data-aos="'fade-up-right'" :data-aos-delay="(index + 1) * 100" :data-aos-duration="500">
            {{ letter }}
          </span>
        </h2>
      </div>
      <p class="subtitle">
        歡迎來電或透過電子郵箱與我們聯繫 點擊此處查看
        <a href="javascript:;" @click.prevent="navigateToAbout">關於傑森</a>
      </p>
      <div class="info">
        <p>
          Add
          <span>{{ contactInfo.address }}</span>
        </p>
        <p>
          Tel
          <span>{{ contactInfo.telephone }}</span>
        </p>
      </div>
      <div class="btns more">
        <a class="btn" href="javascript:;" @click.prevent="navigateToRecruit">
          <p>菁英招募</p>
        </a>
        <a class="btn" href="javascript:;" @click.prevent="sendEmail">
          <p>E-mail</p>
        </a>
      </div>
    </div>
  </section>
</template>
