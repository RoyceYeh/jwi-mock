<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMenuOpen = ref(false)
const isScrolled = ref(false)
const isOverflowHidden = ref(false)
const showRecruitTop = ref(true)
const showRecruitBottom = ref(false)

// 切換菜單狀態
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value

  // 獲取 menubtn 元素並切換 closeBtn 類名
  const menuBtn = document.querySelector('.menubtn')
  if (menuBtn) {
    menuBtn.classList.toggle('closeBtn')
  }

  // 在移動設備上切換 body 的 overflow
  if (window.innerWidth <= 980) {
    isOverflowHidden.value = !isOverflowHidden.value
    document.body.style.overflow = isOverflowHidden.value ? 'hidden' : 'auto'
  }
}

// 關閉菜單
const closeMenu = () => {
  if (isMenuOpen.value) {
    isMenuOpen.value = false

    // 移除 closeBtn 類名
    const menuBtn = document.querySelector('.menubtn')
    if (menuBtn) {
      menuBtn.classList.remove('closeBtn')
    }

    if (window.innerWidth <= 980 && isOverflowHidden.value) {
      isOverflowHidden.value = false
      document.body.style.overflow = 'auto'
    }
  }
}

// 隱藏招募區塊
const hideRecruit = () => {
  showRecruitTop.value = false
  showRecruitBottom.value = false
}

// 監聽滾動事件
const handleScroll = () => {
  const scrollTop = window.scrollY
  const vh = window.innerHeight
  const menuBtnHeight = document.querySelector('.menubtn')?.clientHeight || 0

  isScrolled.value = scrollTop > vh - menuBtnHeight

  if (isScrolled.value) {
    showRecruitTop.value = false
    showRecruitBottom.value = true
  } else {
    showRecruitTop.value = true
    showRecruitBottom.value = false
  }
}

// 處理窗口大小變化
const updateOverflow = () => {
  if (window.innerWidth > 980 && isOverflowHidden.value) {
    isOverflowHidden.value = false
    document.body.style.overflow = 'auto'
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', updateOverflow)
  handleScroll() // 初始化狀態
})

onUnmounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', updateOverflow)
})
</script>

<template>
  <header :class="{ open: isMenuOpen, scroll: isScrolled, scrollOpen: isMenuOpen && isScrolled }">
    <div v-if="showRecruitTop" class="recruit recruittop">
      <a class="pic" href="https://www.104.com.tw/company/b8j2fc8" target="_blank"></a>
      <a class="x" href="javascript:;" @click="hideRecruit"></a>
    </div>
    <nav>
      <div class="language">
        <router-link class="logo" to="/">
          <div class="pic"><img src="../assets/images/menu.svg" alt="" /></div>
        </router-link>
        <a class="lang" href="javascript:;">繁體中文</a>
        <a class="lang" href="javascript:;">日本語</a>
      </div>
      <ul>
        <li>
          <router-link to="/about" @click="closeMenu">
            <span class="en">ABOUT</span>
            <span class="cn">關於傑森</span>
          </router-link>
        </li>
        <li>
          <router-link to="/news" @click="closeMenu">
            <span class="en">NEWS</span>
            <span class="cn">最新消息</span>
          </router-link>
        </li>
        <li>
          <router-link to="/works" @click="closeMenu">
            <span class="en">WORKS</span>
            <span class="cn">精彩案例</span>
          </router-link>
        </li>
        <li class="service">
          <router-link to="/#service" @click="closeMenu">
            <span class="en">SERVICES</span>
            <span class="cn">服務項目</span>
          </router-link>
        </li>
      </ul>
      <div class="contactBtns">
        <router-link to="/#contact" class="btn" @click="closeMenu">
          <p>聯絡我們</p>
        </router-link>
        <router-link to="/#contact" class="btn" @click="closeMenu">
          <p>菁英招募</p>
        </router-link>
      </div>
    </nav>
    <a class="menubtn" href="javascript:;" @click.prevent="toggleMenu">
      <span></span>
      <span></span>
      <p class="menu">MENU</p>
      <p class="close">CLOSE</p>
    </a>
    <div v-if="showRecruitBottom" class="recruit recruitbottom">
      <a class="pic" href="https://www.104.com.tw/company/b8j2fc8" target="_blank"></a>
      <a class="x" href="javascript:;" @click="hideRecruit"></a>
    </div>
  </header>
</template>
