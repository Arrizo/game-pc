// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import i18n from '@/i18n'
import store from '@/store'
import App from './App'
import * as BrowserUtils from '@/utils/BrowserUtils.js'
import { STATIC_PATH } from '@/config/env'

import '@/assets/scss/base.scss'
import '@/assets/scss/style.scss'

BrowserUtils.changeBrowserIcon(STATIC_PATH + 'static/img/favicon.ico')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
