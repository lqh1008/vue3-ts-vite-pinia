import type {
  AxiosRequestConfig,
  AxiosResponse
  // AxiosRequestHeaders
} from 'axios'

// 接口可以接受泛型，函数可以
interface HYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

// interface IConfig extends AxiosRequestHeaders {
//   Authorization: string
// }

interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors<T>
  showLoading?: boolean
  // headers?: IConfig
}

export type { HYRequestInterceptors, HYRequestConfig }
