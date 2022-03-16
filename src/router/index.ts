import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 引入路由表
import routesMap from './routes'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: routesMap['login']
  },
  {
    path: '/main',
    component: routesMap['main']
  },
  {
    path: '/home',
    component: routesMap['home']
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
