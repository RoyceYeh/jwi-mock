import { createApp, onMounted } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/main.scss'

onMounted(() => {
  // 全局初始化代碼，例如 AOS
  if (window.AOS) {
    window.AOS.init()
  }
})
// 創建 Vue 實例
const app = createApp(App)

// 使用路由
app.use(router)

// 掛載實例
app.mount('#app')
