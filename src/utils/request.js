import axios from 'axios'
import {
  getCookie,
  setCookie
} from '@/utils/dataProcessing'
import {
  Message,
  Loading
} from 'element-ui'
/* global __APIHOST__ */
// 基础设置
axios.defaults.baseURL = __APIHOST__
axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/json'
let loadingInstance

// 请求拦截器
axios.interceptors.request.use(config => {
  loadingInstance = Loading.service({
    fullscreen: true
  })
  // 添加公共请求头信息
  let token = getCookie('login_token') || ''
  config.data.head = {
    channel: 1,
    token: token,
    clientId: ''
  }
  return config
}, error => {
  loadingInstance.close()
  Message.error({
    message: '加载超时',
    type: 'fail',
    center: true
  })
  return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(response => {
  loadingInstance.close()
  if (response.data.code === 0) {
    if(response.data.head){
      setCookie('login_token', response.data.head.token, 60 * 60 * 24 * 30)
    }
  } else {
    Message.error({
      message: response.data.msg,
      type: 'fail',
      center: true
    })
  }
  return response
}, error => {
  loadingInstance.close()
  Message.error({
    message: '网络不稳定，请检查网络后再试',
    type: 'fail',
    center: true
  })
  return Promise.reject(error)
})

// 封装axios的post请求
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
