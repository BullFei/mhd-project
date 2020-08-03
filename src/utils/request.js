// 引入axios
import axios from 'axios'

// 创建一个axios的实例对象  这样可以不污染axios本身
const instance = axios.create({
  // options
  // 基准路径
  baseURL: 'http://localhost:8080',
  // 网络超时时间
  timeout: 5000
})
// 处理请求拦截
// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance
