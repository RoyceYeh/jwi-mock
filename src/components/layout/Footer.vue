<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import footerIcon from '@/assets/images/footer.svg'

const isShowGotop = ref(false)

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

// 監聽滾動事件
const handleScroll = () => {
  // 獲取視窗高度
  const windowHeight = window.innerHeight
  // 獲取當前滾動位置
  const scrollTop = window.scrollY

  // 當滾動超過一個視窗高度時，顯示返回頂部按鈕
  isShowGotop.value = scrollTop > windowHeight
}

// 在組件掛載時添加滾動事件監聽
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // 初始檢查一次滾動狀態
  handleScroll()
})

// 在組件卸載時移除滾動事件監聽
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="content">
        <a class="logo" href="javascript:;">
          <div class="pic"><img :src="footerIcon" alt="" /></div>
        </a>
        <ul class="row">
          <li>
            <router-link to="/news">
              <span>●</span>
              NEWS
            </router-link>
          </li>
          <li>
            <router-link to="/works">
              <span>●</span>
              WORKS
            </router-link>
          </li>
          <li>
            <router-link to="/about">
              <span>●</span>
              ABOUT
            </router-link>
          </li>
          <li>
            <router-link to="/#service">
              <span>●</span>
              SERVICES
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="more lang"></div>
    <div class="copyright">
      <div class="container">
        <p>Copyright &copy; {{ new Date().getFullYear() }} 本網站僅供個人作品使用，不提供商業用途</p>
      </div>
    </div>
    <div class="gotop" :class="{ show: isShowGotop }">
      <a class="pic" href="javascript:;" @click.prevent="scrollToTop"></a>
    </div>
  </footer>
</template>
