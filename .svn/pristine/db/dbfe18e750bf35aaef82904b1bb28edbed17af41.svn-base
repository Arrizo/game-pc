<template>
  <div v-bind:class="{'pc-left':true,'pc-l-h':isHorizontal}">
    <div class="menu">
      <!-- <p v-text="isPlaying? $t('message.website.playing') : 'You are playing:'"></p> -->
      <p>{{$t('message.website.playing')}}</p>
      <p class="" v-text="isPlaying? gameName : 'ChipsGames'"></p>
      <div class="wrap-menu clear clearfix">
        <a @click="crossHandler(postMessageEvent.USER_GIFT)" class="menu-btn-nvalid public-btn">{{$t("message.website.gift")}}</a>
        <a @click="showInformationHandler" class="menu-btn public-btn">{{$t("message.website.info")}}</a>
        <a @click="isLogin && crossHandler(postMessageEvent.USER_SERVICE)" :class="isLogin? 'menu-btn': 'menu-btn-nvalid'" id="server" class="public-btn">{{$t("message.website.customerService")}}</a>
        <!-- v1.0 禁用收藏到桌面 -->
        <a target="_blank" :href="systemType!=-1?downloadLink:'javascript:void(0)'" class="public-btn" :class="systemType!=-1?'menu-btn':'menu-btn-nvalid'">{{$t("message.website.addToDesk")}}</a>
        <!-- v1.2 开放收藏到桌面 -->
        <!-- <a class="menu-btn-nvalid size18">{{$t("message.website.addToDesk")}}</a> -->
      </div>
    </div>
  </div>
</template>
<script>

/**
* 客服信息栏
* @module @/containers/PCHome/components/CustomerInfo.vue
* @desc 客服信息栏
* @author yang huiru
* @date 2018.5.25
* @param {Boolean} [isHorizontal]    - 传递点击旋转状态
* @param {Boolean} [isPlaying] - 传递开始游戏状态
* @param {Number} [appId] - 传递开始游戏的appId
* @param {String} [gameName] - 传递开始游戏的名字
* @example 调用示例
* <customer-info :isHorizontal="isHorizontal" :isPlaying="isPlaying" :appId="appId" :gameName="gameName"></customer-info>
*/

import { mapState } from 'vuex'
import * as postMessageEvent from '@/config/postMessageEvent'
import { getShortcut } from '@/services'
import crossHandler from '@/utils/crossHandler'
export default {
  name: 'CustomerInfo',
  extends: {},
  props: {
    isHorizontal: {
      type: Boolean,
      default: false
    },
    isPlaying: {
      type: Boolean,
      default: false
    },
    appId: {
      type: Number,
      default: 0
    },
    gameName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      qrCodeShow: false,
      qrgray: false,
      downloadLink: '#',
      postMessageEvent,
      systemType: navigator.userAgent.indexOf('Windows', 0),
      crossHandler
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin
    })
  },
  components: {
  },
  watch: {
    isPlaying (newVal) {
      this.getDownloadLink()
    }
  },
  methods: {
    // 切换到资讯页面
    showInformationHandler () {
      this.crossHandler(postMessageEvent.SHOW_INFORMAITON)
      this.qrgray = false
    },
    // 获取收藏的链接
    getDownloadLink () {
      const obj = {
        appId: this.isPlaying ? this.appId : -1
      }
      getShortcut(obj).then(res => {
        this.downloadLink = res.data.scLink
      })
    }
  },
  beforeMount () { },
  mounted () {
    this.getDownloadLink()
  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { }
}
</script>
<style lang="scss" scoped>
.pc-left {
  position: absolute;
  margin-left: -600px;
  left: 50%;
  bottom: 24%;
  transition: 0.35s all;
}
.pc-left .menu {
  width: 250px;
  text-align: left;
  color: #fff;
  font-family: "Microsoft YaHei";
}
.pc-left .menu p {
  line-height: 36px;
  font-size: 18px;
  width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.pc-l-h {
  left: 36%;
}
.public-btn {
  width: 240px;
  height: 60px;
  color: #fff;
  font-size: 19px;
  line-height: 60px;
  text-align: center;
  border: 1px solid #fff;
  border-radius: 30px;
  float: left;
  margin-bottom: 30px;
  transition: all 0.2s;
}
.menu-btn {
  box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.3);
  cursor: pointer;
}
.menu-btn-nvalid {
  cursor: not-allowed;
  opacity: 0.5;
}
.menu-btn:hover {
  color: #1787dd;
  background: #fff;
}
.menu-btn:active {
  background: #f5f5f5;
  box-shadow: 0px 0px 0px rgba(255, 255, 255, 0.3);
}
.wrap-menu {
  margin-top: 64px;
}
</style>
