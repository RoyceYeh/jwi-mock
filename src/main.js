import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/main.scss'
// 創建 Vue 實例
const app = createApp(App)

// 使用路由
app.use(router)

// 掛載實例
app.mount('#app')
