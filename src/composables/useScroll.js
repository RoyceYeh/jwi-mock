import { ref, onMounted, onUnmounted } from 'vue'

export function useScroll() {
  const scrollTop = ref(0)
  const isScrolled = ref(false)
  const isScrolledToBottom = ref(false)
  const showGoToTop = ref(false)

  // 更新滾動狀態
  const updateScroll = () => {
    scrollTop.value = window.scrollY

    // 檢查是否滾動超過視窗高度
    isScrolled.value = scrollTop.value > 100

    // 檢查是否滾動到底部
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    isScrolledToBottom.value = scrollTop.value + windowHeight >= documentHeight - 100

    // 顯示/隱藏返回頂部按鈕
    showGoToTop.value = scrollTop.value > windowHeight
  }

  // 平滑滾動到目標元素
  const scrollToElement = (selector, offset = 0) => {
    const element = document.querySelector(selector)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      })
    }
  }

  // 滾動到頂部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  onMounted(() => {
    window.addEventListener('scroll', updateScroll)
    updateScroll() // 初始化狀態
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll)
  })

  return {
    scrollTop,
    isScrolled,
    isScrolledToBottom,
    showGoToTop,
    scrollToElement,
    scrollToTop,
  }
}
