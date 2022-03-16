import { createRouter, createWebHistory } from 'vue-router'

import mainVue from '@/views/main/main.vue'
import homeVue from '@/views/main/home/home.vue'
import loginVue from '@/views/login/login.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: loginVue
    },
    {
      path: '/',
      name: 'main',
      component: mainVue,
      redirect: '/main/home',
      children: [
        {
          path: '/main/home',
          name: 'home',
          component: homeVue
        }
      ]
    }
  ]
})

export default router
