import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { useLoginStore } from '@/stores/login/login'

import 'normalize.css'
import '@/assets/css/index.scss'
import 'element-plus/theme-chalk/base.css'

import App from './App.vue'
import router from './router/index'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// 用于刷新页面在pinia拿到登录信息
useLoginStore().loadLoginInfo()
