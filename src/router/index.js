import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import WorkList from '@/views/WorkList.vue'
import WorkDetail from '@/views/WorkDetail.vue'
import NewsList from '@/views/NewsList.vue'
import NewsDetail from '@/views/NewsDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/news',
    name: 'NewsList',
    component: NewsList,
  },
  {
    path: '/news/:id',
    name: 'NewsDetail',
    component: NewsDetail,
    // 路由參數變化時強制重新渲染組件
    props: true,
  },
  {
    path: '/works',
    name: 'WorkList',
    component: WorkList,
  },
  {
    path: '/works/:id',
    name: 'WorkDetail',
    component: WorkDetail,
    // 路由參數變化時強制重新渲染組件
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    } else {
      return { top: 0 }
    }
  },
})

export default router
