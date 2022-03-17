import HYRequest from './request'

const env = import.meta.env
const baseURL = env.VITE_BASE_URL as unknown as string
const timeout = env.VITE_TIMEOUT as unknown as number

const hyRequest = new HYRequest({
  baseURL,
  timeout,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('实例请求成功拦截')
      const token = ''
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      console.log('实例响应成功拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

// const hyRequest2 = new HYRequest()

export default hyRequest

// export { hyRequest2 }
