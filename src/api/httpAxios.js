
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  },
  transformRequest: [function (data, headers) {
    // headers.token = store.state.token
    if (headers['Content-type'] === 'multipart/form-data') {
      return data
    } else {
      return JSON.stringify(data)
    }
  }]
})

// // 请求拦截器
// http.interceptors.request.use(
//   config => {
//     // 设置token，Content-Type
//     var token = sessionStorage.getItem('UserLoginToken')
//     config.headers.token = token
//     config.headers['Content-Type'] = 'application/json;charset=UTF-8'
//     // 请求显示loading效果
//     if (config.loading === true) {
//       // vm.$loading.show()
//     }
//     return config
//   },
//   error => {
//     // vm.$loading.hide()
//     return Promise.reject(error)
//   }
// )
// // 响应拦截器
// http.interceptors.response.use(
//   res => {
//     // vm.$loading.hide()
//     // token失效，重新登录
//     if (res.data.code === 401) {
//       //  重新登录
//     }
//     return res
//   },
//   error => {
//     // vm.$loading.hide()
//     return Promise.reject(error)
//   }
// )

export default http
