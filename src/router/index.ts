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
    name: 'login',
    path: '/login',
    component: routesMap['login']
  },
  {
    name: 'main',
    path: '/main',
    component: routesMap['main'],
    redirect: '/main/home',
    children: [
      {
        name: 'home',
        path: '/main/home',
        component: routesMap['home']
        // component: import('@/views/main/home/home.vue')
      }
    ]
  },
  {
    name: 'test',
    path: '/test',
    component: routesMap['test']
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
