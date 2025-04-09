// src/services/api.js
import axios from 'axios'

// 設置 JSONBin.io 的基礎 URL
const apiClient = axios.create({
  baseURL: 'https://api.jsonbin.io/v3/b/', // JSONBin API 的基礎 URL
  headers: {
    'Content-Type': 'application/json',
  },
})

// 您的 Bin ID
const BIN_ID = '67f692bd8960c979a5817b4e'

export default {
  // 獲取所有新聞
  getNews() {
    return apiClient.get(`${BIN_ID}`).then((response) => {
      return { data: response.data.record.news }
    })
  },

  // 獲取特定 ID 的新聞
  getNewsById(id) {
    return apiClient.get(`${BIN_ID}`).then((response) => {
      const news = response.data.record.news.find((item) => String(item.id) === String(id))
      return { data: news }
    })
  },

  // 獲取最新的幾則新聞
  getLatestNews(limit = 3) {
    return apiClient.get(`${BIN_ID}`).then((response) => {
      // 按日期排序並限制數量
      const sortedNews = [...response.data.record.news].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit)
      return { data: sortedNews }
    })
  },

  // 作品相關 API
  getWorks() {
    return apiClient.get(`${BIN_ID}`).then((response) => {
      return { data: response.data.record.works }
    })
  },

  getWorksById(id) {
    return apiClient.get(`${BIN_ID}`).then((response) => {
      const work = response.data.record.works.find((item) => String(item.id) === String(id))
      return { data: work }
    })
  },

  getLatestWorks(limit = 6) {
    return apiClient.get(`${BIN_ID}`).then((response) => {
      // 按日期排序並限制數量
      const sortedWorks = [...response.data.record.works].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit)
      return { data: sortedWorks }
    })
  },
}
