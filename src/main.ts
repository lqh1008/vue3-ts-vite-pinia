declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: any
  }
}

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { globalRegister } from './global'

import { useLoginStore } from '@/stores/login/login'

import 'normalize.css'
import '@/assets/css/index.scss'
import 'element-plus/theme-chalk/base.css'

import App from './App.vue'
import router from './router/index'

const app = createApp(App)

app.use(createPinia())

// app.use调用参数里面的excutor，并且参数为app
app.use(globalRegister)
// 用于刷新页面在pinia拿到登录信息(注意这个位置，应当放在app.use(router)之前，不然会导致页面刷新路由匹配不准确)
useLoginStore().loadLoginInfo()

app.use(router)

app.mount('#app')

// 用于刷新页面在pinia拿到登录信息(注意这个位置，应当放在app.use(router)之前，不然会导致页面刷新路由匹配不准确)
// useLoginStore().loadLoginInfo()
