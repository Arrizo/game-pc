<template>
  <div class="all">
    <!--顶部导航栏-->
    <!-- 背景动点和精灵图 -->
    <ghw-spirit></ghw-spirit>

    <top-nav-bar></top-nav-bar>
    <!--网页手机端-->
    <!-- <web-phone :isHorizontal="isHorizontal" :showloadingHome='showloadingHome' :isPlaying="isPlaying" @changeHorization="isHorizontal=!isHorizontal" :isRotate="isRotate"></web-phone> -->
    <web-phone :isHorizontal="isHorizontal" :showloadingHome='showloadingHome' :isPlaying="isPlaying" @changeHorization="changeHorization()" :hasRotate="hasRotate"></web-phone>
    <!--客服信息栏-->
    <customer-info :isHorizontal="isHorizontal" :isPlaying="isPlaying" :appId="appId" :gameName="gameName"></customer-info>
    <!--二维码部分-->
    <qr-code :isHorizontal="isHorizontal" :isPlaying="isPlaying"></qr-code>
  </div>
</template>
<script>
import topNavBar from '@/containers/PCHome/components/TopNavBar.vue'
import webPhone from '@/containers/PCHome/components/WebPhone.vue'
import qrCode from '@/containers/PCHome/components/QrCode.vue'
import customerInfo from '@/containers/PCHome/components/CustomerInfo.vue'
import defaultIcon from '@/assets/img/default_icon.png'
import * as postMessageEvent from '@/config/postMessageEvent'
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '@/store/mutationTypes'
import crossHandler from '@/utils/crossHandler'
import setCookie from '@/utils/setCookie'
import getCookie from '@/utils/getCookie'
import GhwSpirit from '@/components/GhwSpirit'
export default {
  name: 'home',
  data () {
    return {
      postMessageEvent,
      isHorizontal: false,
      defaultIcon,
      appId: 0,
      isPlaying: false,
      gameName: '',
      showloadingHome: true,
      isRotate: false,
      hasRotate: false
    }
  },
  computed: {
  },
  watch: {
    isHorizontal () {
      setTimeout(() => {
        crossHandler(postMessageEvent.RESIZE_PC_FRAME)
      }, 360)
    }
  },
  methods: {
    // 接收webPhone点击旋转的状态
    setIframeHorizontal () {
      this.isHorizontal = true
    },
    setIframeVertical () {
      this.isHorizontal = false
    },
    changeHorization () {
      this.isHorizontal = !this.isHorizontal
      // setTimeout(function () {
      //   crossHandler(postMessageEvent.RESIZE_PC_FRAME)
      // }, 200)
    },
    addListener () {
      const self = this
      const doSth = {
        [postMessageEvent.PLAYING_GAME] (data) {
          self.appId = data.appId
          self.isPlaying = true
          self.gameName = data.gameName
          self.hasRotate = data.hasRotate
        },
        [postMessageEvent.NO_PLAYING_GAME] (data) {
          self.isPlaying = false
        },
        [postMessageEvent.CHANGE_LOGIN_STATUS] (data) {
          if (data && data.isLogin) {
            self.$store.commit(LOGIN_SUCCESS)
          } else {
            self.$store.commit(LOGOUT_SUCCESS)
          }
        },
        [postMessageEvent.START_SHARE_GAME] (data) {
          self.getUrlParams()
        },
        [postMessageEvent.SET_IFRAME_HORIZONTAL] (data) {
          this.isRotate = false
          self.setIframeHorizontal()
        },
        [postMessageEvent.SET_IFRAME_VERTICAL] (data) {
          console.log('SET_IFRAME_VERTICAL')
          this.isRotate = true
          self.setIframeVertical()
        },
        [postMessageEvent.HIDE_LOADING_HOME] (data) {
          self.showloadingHome = false
        }
        // TODO:加载页不能监听完成加载，暂时应付方式游戏加载完成主动通知关闭加载页
        // [postMessageEvent.LOAD_COMPLETE] (data) {
        //   self.loadingComplete()
        // }
      }
      function receiveMessage (e) {
        try {
          let cmd = JSON.parse(e.data).cmd
          if (doSth[cmd]) {
            doSth[cmd](JSON.parse(e.data).data)
          }
        } catch (error) {
          console.warn('PCHome Unknown message received, drop it...')
        }
      }
      window.addEventListener('message', receiveMessage, false)
    },
    // 获取pc端的参数
    getUrlParams () {
      var url = location.search // 获取url中"?"符后的字串
      if (url.indexOf('?') !== -1) {
        if (url.indexOf('shareType') !== -1) {
          setCookie('PCShareValue', url)
        }
        // history.pushState('', '', window.location.href)
        var pathname = window.location.pathname
        history.replaceState('', '', pathname)
        if (getCookie('PCShareValue', -1) !== -1) {
          // 向移动端发送开始游戏通知
          var data = getCookie('PCShareValue')
          setTimeout(function () {
            crossHandler(postMessageEvent.SEARCH_URL, data)
          }, 1000)
          setCookie('PCShareValue', -1)
        }
      }
    }
  },
  components: {
    topNavBar,
    webPhone,
    qrCode,
    customerInfo,
    GhwSpirit
  },
  mounted () {
    this.addListener()
  }
}
</script>

<style lang="scss" scoped>
.Rotate {
  transform: rotate(-90deg);
  transition: 0.35s all;
}
.all {
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 0px;
  position: relative;
}
.all {
  background: linear-gradient(to right, #1787dd, #a2e1ff); /* 标准的语法 */
  background: -webkit-linear-gradient(to right, #1787dd, #a2e1ff); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(to right, #1787dd, #a2e1ff); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(to right, #1787dd, #a2e1ff); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #1787dd, #a2e1ff); /* 标准的语法 */
}
html,
body,
div,
span,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
em,
img,
strong,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
table,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
footer,
header,
nav,
section {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
}
article,
aside,
footer,
header,
hgroup,
nav,
section {
  display: block;
}
ol,
ul {
  list-style: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
i {
  font-style: normal;
}
a,
img {
  text-decoration: none;
  border: none;
  color: #333;
}
.all {
  min-width: 1200px;
  overflow: hidden;
}
</style>
