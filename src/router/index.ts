import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import LocalCache from '@/utils/cache'
// 引入路由表
import routesMap from './routes'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
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
      }
    ]
  },
  {
    name: 'test',
    path: '/test',
    component: routesMap['test']
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to, _, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = LocalCache.getCache('token')
    if (token) {
      console.log('路由拦截的to.path: ', to.path)
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

export default router
