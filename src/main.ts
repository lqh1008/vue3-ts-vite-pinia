import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/assets/css/index.scss'
import 'element-plus/theme-chalk/base.css'

import App from './App.vue'
import router from './router/index'

// import '@/service/axios_demo'

import hyRequest from '@/service/index'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// console.log(import.meta.env.VITE_API_PREFIX)

hyRequest.request({
  url: '/home/multidata',
  method: 'GET',
  headers: {},
  interceptors: {
    requestInterceptor: (config) => {
      console.log('单独请求的config')
      config.headers!['token'] = '123'
      return config
    },
    responseInterceptor: (res) => {
      console.log('单独响应的response')
      return res
    }
  },
  showLoading: false
})

console.log(hyRequest.get)
