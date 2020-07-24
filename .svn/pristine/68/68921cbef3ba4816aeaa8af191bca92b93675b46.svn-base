import Vue from 'vue'
import Router from 'vue-router'
import pchome from '@/router/pchome'
import error from '@/router/error'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    // pc端官网
    ...pchome,
    // 错误提示页面
    ...error,
    {
      path: '/*',
      redirect: '/'
    }
  ]
})
