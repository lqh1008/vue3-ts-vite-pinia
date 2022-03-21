import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import localCache from '@/utils/cache'
// 引入路由表
import routesMap from './routes'

import { firstMenu } from '@/utils/map-menus'

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
    component: routesMap['main']
    // redirect: '/main/home',
    // children: [
    //   {
    //     name: 'home',
    //     path: '/main/home',
    //     component: routesMap['home']
    //   }
    // ]
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

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }

  if (to.path === '/main') {
    console.log('firstMenu: ', firstMenu)
    return firstMenu.url
  }
})

export default router
