import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import CookieUtil from '@/utils/CookieUtil'
import CryptoJS from 'crypto-js'
import MessageBox from 'mint-ui/lib/message-box'
import { API_PATH } from '../config/env'
import * as BrowserUtils from '@/utils/BrowserUtils'

let currentUrl = ''
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (config.method === 'POST') {
      if (!config.isFile) {
        config.data = qs.stringify(config.data)
      }
    }
    return config
  },
  error => {
    // _.toast('错误的传参', 'fail')
    return Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    // console.dir('router' + router)
    // if (process.env.NODE_ENV === 'production') return response;
    if (process.env.IS_PRODUCTION) return response
    if (response.data.code !== 'undefined' && response.data.code > 300) {
      let code = parseInt(response.data.code)
      let errorMsg = ''
      switch (code) {
        case 0:
          break
        case 400:
          errorMsg = '错误请求：请求参数有错，头信息有误等，导致请求无法被正确理解'
          break
        case 401:
          sessionStorage.clear()
          CookieUtil.getInstance().clearLoginInfo()
          errorMsg = '请求未认证：访问受限资源是缺少认证信息，或者认证未通过'
          break
        case 403:
          errorMsg = '禁止访问：由于应用上下文原因或请求端上下文的原因被禁止访问资源，例如IP限制等；'
          break
        case 404:
          errorMsg = '找不到被访问资源：接口不存在、页面不存在或对应的业务实体找不到'
          router.replace({
            path: '/server-error'
          })
          this.$router.back(-1)
          break
        case 500:
          errorMsg = '服务器内部故障'
          break
        case 501:
          errorMsg = '所请求接口或页面未实现'
          break
        case 4010:
          errorMsg = '错误请求：请求参数有错，头信息有误等，导致请求无法被正确理解'
          break
        case 4011:
          errorMsg = '缺少字段或有字段的值为null'
          break
      }
      console.log('currentUrl:::', currentUrl, ';errorMsg::', errorMsg)
      MessageBox('错误代码' + code + '：', errorMsg)
    }
    return response
  },
  error => {
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  }
)

// fetch 类似于 Ajax
export default function fetch(url, params, method, isFile) {
  let requestConfig = {
    method: method || 'GET',
    url: url,
    isFile: isFile || false
  }
  currentUrl = url
  // 每个接口都添加v=timestamp，避免浏览器缓存接口数据，以便每次都是请求最新的数据
  params.v = new Date().getTime()
  // console.log(navigator.language.toString().replace(/-/,'_'))
  // params.locale = (navigator.language || navigator.userLanguage).toString().replace(/-/, '_')
  params.locale = BrowserUtils.getLanguage()

  //获取二维码链接需要osign
  if (currentUrl === API_PATH + '/api/user/client/qrcode') {
    var osignOri = ''
    if (params.userId) {
      osignOri = osignOri + params.userId
    }

    if (params.appId) {
      osignOri = osignOri + params.appId
    }

    if (params.h5Token) {
      osignOri = osignOri + params.h5Token
    }

    if (params.sdkToken) {
      osignOri = osignOri + params.sdkToken
    }

    osignOri = osignOri + params.v
    osignOri = osignOri + params.locale
    params.osign = CryptoJS.MD5(osignOri).toString()
  }

  //修改个人资料需要osign
  if (currentUrl === API_PATH + '/api/user/profile/update') {
    var osignOri = ''
    if (params.userId) {
      osignOri = osignOri + params.userId
    }
    if (params.userToken) {
      osignOri = osignOri + params.userToken
    }
    if (params.iconUrl) {
      osignOri = osignOri + params.iconUrl
    }
    if (params.nickname) {
      osignOri = osignOri + params.nickname
    }
    if (params.gender) {
      osignOri = osignOri + params.gender
    }
    if (params.birthdate) {
      osignOri = osignOri + params.birthdate
    }
    if (params.mobile) {
      osignOri = osignOri + params.mobile
    }
    if (params.email) {
      osignOri = osignOri + params.email
    }
    if (params.industry) {
      osignOri = osignOri + params.industry
    }
    osignOri = osignOri + params.locale
    params.osign = CryptoJS.MD5(osignOri).toString()
  }

  //没用户信息不进行请求
  if (currentUrl === API_PATH + '/api/user/profile/detail') {
    if (!params.userId || !params.userToken) {
      return
    }
  }

  // params.locale = navigator.language;
  if (requestConfig.method === 'GET') {
    requestConfig.params = params
  } else {
    requestConfig.data = params
  }
  return new Promise((resolve, reject) => {
    delete params.platFormName
    axios(requestConfig)
      .then(
        response => {
          resolve(response.data)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}
