import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/assets/css/index.scss'
import 'element-plus/theme-chalk/base.css'

import App from './App.vue'
import router from './router/index'

import '@/service/axios_demo'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

console.log(import.meta.env.VITE_API_PREFIX)
