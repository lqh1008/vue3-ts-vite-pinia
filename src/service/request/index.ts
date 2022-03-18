import axios from 'axios'
import type { AxiosInstance } from 'axios'

import type { HYRequestInterceptors, HYRequestConfig } from './types'

// 服务方式使用loading
import { ElLoading } from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

const DEFAULT_LOADING = true

class HYRequest {
  instance: AxiosInstance
  intercsptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.intercsptors = config.interceptors

    // 实例请求拦截
    this.instance.interceptors.request.use(
      this.intercsptors?.requestInterceptor,
      this.intercsptors?.requestInterceptorCatch
    )

    // 实例响应拦截
    this.instance.interceptors.response.use(
      this.intercsptors?.responseInterceptor,
      this.intercsptors?.responseInterceptorCatch
    )

    // 所有实例请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有请求拦截成功')
        console.log(this.showLoading)
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        console.log(err)
      }
    )

    // 所有实例响应拦截
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有响应拦截成功')
        this.loading?.close()
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败～，错误信息')
        } else {
          return data
        }
      },
      (err) => {
        this?.loading?.close()
        if (err.response.status === 404) {
          console.log('404错误～～～')
        }
        console.log(err)
      }
    )
  }

  request<T>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求的请求处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // console.log(res)

          // 单个请求对响应的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          this.showLoading = DEFAULT_LOADING

          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          console.log(err)
        })
    })
  }

  get<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  patch<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }

  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

export default HYRequest
