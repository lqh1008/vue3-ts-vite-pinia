import { fileURLToPath, URL } from 'url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// element-plus自动导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// node环境下获取环境变量
const MODE = process.env.NODE_ENV as string
const VITE_API_PREFIX = loadEnv(MODE, process.cwd()) as unknown as string

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8000,
    open: true,
    https: false,
    proxy: {
      [VITE_API_PREFIX]: {
        target: process.env.VUE_APP__URL,
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        ws: true
        // pathRewrite: {
        //   ['^' + [process.env.VUE_APP_BASE_API]]: '/'
        // }
      }
    }
  }
  // cssPreprocessOptions: {
  //   scss: {
  //     additionalData: '@/assets/css/index.scss;' // 全局公共样式
  //   }
  // }
})
