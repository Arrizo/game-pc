<template>
  <div class="top-pc">
    <div class="top-pc-main">
      <div @click="backHome()"><img class="logo" src="../../../assets/img/PCHome/logo.svg" alt="网页游戏" title="网页游戏"></div>
      <div class="top-pc-nav clear clearfix" @mouseover="showMessageNum">
        <div class="clearfix clear" :class="isLogin? 'top-pc-width' : 'top-pc-nav'">
          <div v-if="isLogin">
            <i class="user-icon"><img :src="personCenter.iconUrl" alt=""></i>
            <span class="user-name">{{personCenter.nickname}}</span>
          </div>
          <div v-else class="top-pc-login clearfix clear">
            <a class="btn-login" @click="crossHandler(postMessageEvent.USER_LOGIN)">{{$t('message.me.login')}}</a>
          </div>
        </div>
        <slider-user v-if="isLogin" @personalCenter="crossHandler(postMessageEvent.MY_PAGE)" @exchangeUser="crossHandler(postMessageEvent.USER_LOGIN)" @showMyMessage="crossHandler(postMessageEvent.MY_MESSAGE)" :messageNum="messageNum"></slider-user>
      </div>
    </div>
  </div>
</template>
<script>
/**
* 顶部导航栏
* @module @/containers/PCHome/components/TopNavBar.vue
* @desc 顶部导航栏
* @author yang huiru
* @date 2018.5.25
* @example 调用示例
* <top-nav-bar></top-nav-bar>
*/
import * as postMessageEvent from '@/config/postMessageEvent'
import defaultIcon from '@/assets/img/default_icon.png'
import sliderUser from '@/containers/PCHome/components/SliderUser.vue'
import { USER_NICKNAME, USER_ICON_URL } from '@/config/defaultVal'
import crossHandler from '@/utils/crossHandler'
import { mapState } from 'vuex'
export default {
  name: 'TopNavBar',
  extends: {},
  props: {},
  data () {
    return {
      defaultIcon,
      defaultIcon2: USER_ICON_URL,
      messageNum: 0,
      onoff: true,
      personCenter: {
        iconUrl: '',
        nickname: USER_NICKNAME,
        userId: '',
        h5Token: '',
        sdkToken: ''
      },
      postMessageEvent,
      crossHandler
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin
    })
  },
  components: {
    sliderUser
  },
  watch: {
  },
  methods: {
    showMessageNum () {
      if (this.isLogin) {
        if (this.onoff) {
          this.onoff = false
          this.crossHandler(postMessageEvent.SHOW_MESSAGE_NUM)
          setTimeout(() => { this.onoff = true }, 5000)
        }
      }
    },
    addListener () {
      const self = this
      const doSth = {
        [postMessageEvent.MY_ACCOUNT] (data) {
          if (data.iconUrl) {
            self.personCenter.iconUrl = data.iconUrl
          }
          if (data.nickname) {
            self.personCenter.nickname = data.nickname
          }
        },
        [postMessageEvent.USER_INFO] (data) {
          if (data.isLogin) {
            self.$store.dispatch('updateLoginState', { isLogin: data.isLogin })
          }
          if (data.userInfo) {
            self.personCenter = data.userInfo
          }
        },
        [postMessageEvent.SHOW_MESSAGE_NUM] (data) {
          self.messageNum = data
        }
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
    backHome () {
      window.location.reload()
    }
  },
  beforeMount () { },
  mounted () {
    this.addListener()
  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { }
}
</script>

<style lang="scss" scoped>
.top-pc {
  width: 100%;
  height: 65px;
  background: rgba(255, 255, 255, 0.2);
  position: absolute;
  left: 0px;
  top: 0px;
  min-width: 1200px;
  box-shadow: 5px 2px 5px rgba(23, 135, 221, 0.3);
}
.top-pc-main {
  width: 1200px;
  margin: 0 auto;
  position: relative;
}
.top-pc-main .logo {
  position: absolute;
  left: 0px;
  top: 10px;
  width: 110px;
  cursor: pointer;
}
.top-pc-nav {
  position: relative;
  z-index: 1;
  font-family: 'Microsoft YaHei', SimSun;
  font-size: 12px;
  float: right;
  transition: 0.35s all;
}
.top-pc-nav:hover ul {
  display: block;
}
.top-pc-width {
  padding: 10px 25px;
  line-height: 45px;
  width: 215px;
  height: 65px;
}
.top-pc-width .user-icon {
  width: 42px;
  height: 42px;
  margin-right: 10px;
  float: left;
  border: 0.5px solid #eee;
  border-radius: 21px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  img {
    width: 100%;
  }
}
.top-pc-width .user-name {
  float: left;
  width: 110px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.top-pc-login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 184px;
  height: 65px;
}
.btn-login {
  width: 126px;
  height: 34px;
  cursor: pointer;
  text-align: center;
  display: block;
  color: #fff;
  line-height: 34px;
  font-size: 16px;
  font-family: 'Microsoft YaHei';
  border-radius: 24px;
  border: 1px solid #fff;
box-shadow: 1px 1px 4px rgba(23, 135, 221, 0.4);
&:hover{
    background: #fff;
    color: #1787dd;
}
&:active{
  opacity: 50%;
  box-shadow: 0px 0px 0px rgba(23, 135, 221, 0.4);
}
}
</style>
