import axios from 'axios'

axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log(res.data)
})

// http://httpbin.org/ 模拟请求
axios
  .get('http://httpbin.org/get', {
    params: {
      name: 'lv'
    }
  })
  .then((res) => {
    console.log(res.data)
  })

axios
  .post('http://httpbin.org/post', {
    data: {
      name: 'lv'
    }
  })
  .then((res) => {
    console.log(res.data)
  })

axios.interceptors.request.use((config) => {
  console.log(config)
})
