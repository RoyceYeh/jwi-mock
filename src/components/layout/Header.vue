<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import menuIcon from '@/assets/images/menu.svg'

const router = useRouter()
const route = useRoute()

// 狀態管理
const isMenuOpen = ref(false)
const isScrolled = ref(false)
const isOverflowHidden = ref(false)
const showRecruitTop = ref(true)
const showRecruitBottom = ref(false)

// 判斷是否為首頁
const isHomePage = computed(() => route.path === '/' || route.path === '')

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

// 設置 header 位置和狀態
const updateHeaderState = () => {
  const scrollTop = window.scrollY
  const vh = window.innerHeight
  const menuBtnHeight = document.querySelector('.menubtn')?.clientHeight || 0

  // 只有在首頁才應用右下角位置邏輯
  if (isHomePage.value) {
    isScrolled.value = scrollTop > vh - menuBtnHeight
  } else {
    // 在非首頁上，總是應用 scroll 樣式（固定在頂部）
    isScrolled.value = true
  }

  // 更新招募區塊顯示狀態
  if (isScrolled.value) {
    showRecruitTop.value = false
    showRecruitBottom.value = true
  } else {
    showRecruitTop.value = true
    showRecruitBottom.value = false
  }
}

// 監聽滾動事件
const handleScroll = () => {
  updateHeaderState()
}

// 處理窗口大小變化
const updateOverflow = () => {
  if (window.innerWidth > 980 && isOverflowHidden.value) {
    isOverflowHidden.value = false
    document.body.style.overflow = 'auto'
  }
}

// 監聽路由變化
watch(
  () => route.path,
  () => {
    // 關閉菜單
    closeMenu()

    // 立即更新 header 狀態
    updateHeaderState()

    // 如果是首頁，延遲稍後再檢查一次，確保正確渲染
    if (isHomePage.value) {
      setTimeout(() => {
        updateHeaderState()
      }, 100)
    }
  },
  { immediate: true }
)

// 生命週期鉤子
onMounted(() => {
  // 添加事件監聽器
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', updateOverflow)

  // 初始化狀態
  updateHeaderState()
})

onUnmounted(() => {
  // 移除事件監聽器
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', updateOverflow)
})

// 處理錨點導航
const navigateToHash = (hash) => {
  closeMenu()

  // 如果已經在首頁，直接滾動
  if (isHomePage.value) {
    scrollToElement(hash)
  } else {
    // 先導航到首頁，然後滾動
    router.push('/').then(() => {
      setTimeout(() => {
        scrollToElement(hash)
      }, 500)
    })
  }
}

// 滾動到指定元素
const scrollToElement = (hash) => {
  setTimeout(() => {
    const element = document.querySelector(hash)
    if (element) {
      const headerHeight = document.querySelector('.scroll')?.clientHeight || 0
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - headerHeight - 20

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }, 300)
}
</script>

<template>
  <header :class="{ open: isMenuOpen, scroll: isScrolled, scrollOpen: isMenuOpen && isScrolled }">
    <div v-if="showRecruitTop" class="recruit recruittop">
      <a class="pic" href="https://www.104.com.tw/company/b8j2fc8" target="_blank"></a>
      <a class="x" href="javascript:;" @click="hideRecruit"></a>
    </div>
    <nav>
      <div class="language">
        <router-link class="logo" to="/" @click="closeMenu">
          <div class="pic"><img :src="menuIcon" alt="" /></div>
        </router-link>
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
          <a href="javascript:;" @click="navigateToHash('#service')">
            <span class="en">SERVICES</span>
            <span class="cn">服務項目</span>
          </a>
        </li>
      </ul>
      <div class="contactBtns">
        <a href="javascript:;" class="btn" @click="navigateToHash('#contact')">
          <p>聯絡我們</p>
        </a>
        <a href="javascript:;" class="btn" @click="navigateToHash('#contact')">
          <p>菁英招募</p>
        </a>
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
