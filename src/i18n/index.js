import { createI18n } from 'vue-i18n'

const messages = {
  'zh-TW': {
    nav: {
      about: '關於傑森',
      news: '最新消息',
      works: '精彩案例',
      services: '服務項目',
      clients: '合作客戶',
      contact: '聯絡我們',
      recruit: '菁英招募',
    },
    banner: {
      mission: 'MISSION',
      slogan: '打造專屬旅遊品牌的商業模組',
    },
  },
  ja: {
    nav: {
      about: '会社概要',
      news: 'お知らせ',
      works: '実績',
      services: 'サービス',
      clients: '取引先',
      contact: 'お問い合わせ',
      recruit: '採用情報',
    },
    banner: {
      mission: 'MISSION',
      slogan: '旅行ブランドのビジネスモデルを構築',
    },
  },
}

const i18n = createI18n({
  legacy: false,
  locale: 'zh-TW',
  fallbackLocale: 'zh-TW',
  messages,
})

export default i18n
