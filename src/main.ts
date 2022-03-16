import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'element-plus/theme-chalk/base.css'

import App from './App.vue'
import router from './router/index'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
