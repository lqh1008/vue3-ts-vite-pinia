import { fileURLToPath, URL } from 'url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// element-plus自动导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig(({ mode }) => {
  // const { VITE_BASE_URL, VITE_API_PREFIX } = loadEnv(mode, process.cwd())
  const modeConfig: { base?: string } = {}

  // 不同环境下不同配置
  if (mode === 'development') {
    console.log('DEVELOPMENT')

    modeConfig.base = '/'
  } else if (mode === 'production') {
    console.log('PRODUCTION')
    modeConfig.base = './'
  } else {
    console.log('MOCK')
  }

  return {
    base: modeConfig.base || '/',
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
      // open: true,
      // https: false,
      changeOrigin: true, // 如果接口跨域，需要进行这个参数配置

      cors: true, // 默认启用并允许任何源
      // open: true, // 在服务器启动时自动在浏览器中打开应用程序
      //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
      proxy: {
        '^/dev': {
          target: 'http://152.136.185.210:5000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev/, '')
        }
      }
      // proxy: {
      //   [VITE_API_PREFIX]: {
      //     target: VITE_BASE_URL,
      //     changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
      //     ws: true,
      //     pathRewrite: {
      //       ['^' + [VITE_API_PREFIX]]: '/'
      //     }
      //   }
      // }

      // proxy: {
      //   '/dev': {
      //     target: 'http://152.136.185.210:5000',
      //     changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
      //     ws: true,
      //     pathRewrite: {
      //       '^/dev': '/'
      //     }
      //   }
      // },
      // proxy: {
      //   '/dev': {
      //     target: 'http://152.136.185.210:5000',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/dev/, '')
      //   }
      // }
    }
    // cssPreprocessOptions: {
    //   scss: {
    //     additionalData: '@/assets/css/index.scss;' // 全局公共样式
    //   }
    // }
  }
})
