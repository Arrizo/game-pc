<template>
  <div class="jf-h5" :class="{'horizontal-screen':isHorizontal,'screen-rotate':isHasRotate}" id="jfh5">
    <!-- v1.2开始取消用户旋转手机窗口 -->
    <a class="h5-hscreen" id="h5-hscreen" v-on:click="screenH5" v-if="hasRotate&&isPlaying">
      <span class="icon-resize"></span>
      <div class="pc-mode-screen">
        <div v-bind:class="{RotateText:isHorizontal,rotatecli: !isHorizontal && getLanguagle() == 'en'}">{{$t("message.website.rotate")}}</div>
      </div>
    </a>
    <!-- <iframe :src="iframeUrl" ref="h5GameFrame" frameborder="0" class="h5-iframe" :class="{pcIframe: isactive}" id="frame-main"></iframe> -->
    <iframe :src="iframeUrl" :class="{pcIframe: hasRotate&&isHorizontal}" frameborder="0" class="h5-iframe" id="frame-main"></iframe>
    <div v-if="showloadingHome" class="load-style home-load"><img :src="loadSrc"></div>
    <a @click="returnUpperLevel" class="ReturnBackHome" :class="'ReturnBackHome'+getLanguagle()"></a>
  </div>
</template>
<script>
/**
* 网页手机端
* @module @/containers/PCHome/components/WebPhone.vue
* @desc iframe嵌入移动端
* @author yang huiru
* @date 2018.5.25
* @update 2018.6.11
* @example 调用示例
*  <web-phone :isHorizontal="isHorizontal"></web-phone>
*/
import * as postMessageEvent from '@/config/postMessageEvent'
import { resizePhone } from '@/assets/js/PCHome/h5Screen.js'
import * as env from '@/config/env'
import { getAppDetail } from '@/services'
import loadGif from '@/assets/img/loading-fish.gif'
import loadSvg from '@/assets/img/loading-fish.svg'
import getLanguagle from '@/utils/getLanguagle'
import platform from 'platform'
export default {
  name: 'WebPhone',
  extends: {},
  props: {
    isHorizontal: {
      type: Boolean,
      default: false
    },
    showloadingHome: {
      type: Boolean
      // default: true
    },
    isPlaying: {
      type: Boolean,
      default: false
    },
    hasRotate: {
      type: Boolean,
      default: false
    }

  },
  data () {
    return {
      iframeUrl: '',
      gameName: '',
      postMessageEvent,
      loadGif,
      getLanguagle,
      isHasRotate: false,
      loadSvg,
      loadSrc: ''
    }
  },
  computed: {

  },
  components: {
  },
  watch: {
    isHorizontal () {
      resizePhone(this.hasRotate && this.isHorizontal)
    }
  },
  methods: {
    screenH5 () {
      this.$emit('changeHorization')
      this.isHasRotate = true
      // this.isactive = this.isactive !== true
      // this.$emit('horizontalScreen', this.isactive)
    },

    setIframeUrl () {
      const _location = window.location
      const domian = `${_location.hostname}${_location.port ? `:${_location.port}` : ''}`
      const fullPath = this.$route.query.status === 'markdown' ? `/common/login?isGame=true&appId=${this.$route.query.appId}` : '/home'
      this.iframeUrl = process.env.NODE_ENV === 'development'
        ? 'http://localhost:8080/#/home/navBar1'
        : env.PROTOCOL + domian + env.IFRAME_PATH + fullPath
    },
    showGameHandler (url, appId) {
      getAppDetail({appId}).then(res => {
        this.$nextTick(() => {
          const domian = `${document.domain}${window.location.port ? `:${window.location.port}` : ''}`
          this.iframeUrl = env.PROTOCOL + domian + env.IFRAME_PATH + '/common/link-wrapper?isGame=true&appId=' + this.$route.query.appId
        })
        this.isPlaying = true
        this.gameName = res.data.appName
      })
    },
    returnUpperLevel () {
      if (this.$route.query.status === 'markdown') {
        this.$router.replace({ path: '/' })
      }
      this.$router.go(-1)
    }
  },
  created () {
    this.setIframeUrl()
    if (~platform.name.indexOf('IE')) {
      this.loadSrc = this.loadGif
    } else {
      this.loadSrc = this.loadSvg
    }
  },
  beforeMount () { },
  mounted () {
    resizePhone()
    // 暂不使用iframe的onload功能，通过移动端通知PC端隐藏loading
    // var iframe = document.getElementsByTagName('iframe')[0]
    // if (iframe.attachEvent) {
    //   iframe.attachEvent('onload', function () {
    //     this.showloadingHome = false
    //   })
    // } else {
    //   let _this = this
    //   let onFF = false
    //   iframe.onload = iframe.onreadystatechange = function () {
    //     if (this.readyState && this.readyState !== 'complete') {
    //     } else {
    //       // 如果Firefox浏览器iframe中的src被执行一次
    //       if (navigator.userAgent.indexOf('Mozilla') > -1) {
    //         _this.showloadingHome = false
    //       }
    //       if (onFF) _this.showloadingHome = false
    //       onFF = true
    //     }
    //   }
    // }

    var resizeTimeout = null
    let _this = this
    window.onresize = () => {
      return (() => {
        if (resizeTimeout) {
          clearTimeout(resizeTimeout)
        }
        resizeTimeout = setTimeout(resizePhone(_this.hasRotate && _this.isHorizontal), 1000)
      })()
    }
  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { }
}
</script>
<style lang="scss" scoped>
.jf-h5 {
  float: left;
  position: relative;
  left: 50%;
  background-image: url("../../../assets/img/PCHome/iphone2.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  box-sizing: initial;
  box-sizing: content-box;
  // transition: 0.35s all;
  // border-radius: 43px;
  // box-shadow: 0px 6px 10px 0px rgba(102, 102, 102, 0.3);
  // box-shadow: inset 0px 6px 8px 0px rgba(224, 224, 224, 1.004),inset 0px -6px 8px 0px rgba(224, 224, 224, 1.004);
}
.h5-hscreen {
  width: 28px;
  height: 97px;
  text-align: center;
  font-size: 15px;
  line-height: 16px;
  color: #1787dd;
  cursor: pointer;
  position: absolute;
  top: 88px;
  z-index: 900;
  right: -4px;
  border-radius: 0px 10px 10px 0px;
  background-color: rgba(255, 255, 255, 1);
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  right: 2px\0;
}
.h5-hscreen:hover {
  background-color: #1787dd;
  color: #fff;
  .icon-resize {
    background: url("../../../assets/img/PCHome/rotate-icon1.svg") no-repeat
      center center/90%;
  }
}
.h5-hscreen:active {
  opacity: 0.6;
}
.screen-rotate {
  transition: 0.35s all;
}
.h5-hscreen .icon-resize {
  width: 20px;
  height: 20px;
  display: block;
  margin: 5px 0 3px 3px;
  background: url("../../../assets/img/PCHome/rotate-icon.svg") no-repeat center
    center/90%;
  background-size: 18px 18px;
}
.h5-iframe {
  float: left;
  width: 100%;
  height: 100%;
  background: #fff;
}
.horizontal-screen {
  transform: rotate(-90deg);
}
// v1.2开始取消用户旋转手机窗口
.RotateText {
  display: block;
  transform: rotate(90deg);
  width: 60px;
  position: absolute;
  bottom: 32%;
  left: -57%;
}
.rotatecli {
  transform: rotate(90deg);
  margin-top: 16px;
  margin-left: 3px;
}
.pcIframe {
  transform: rotate(90deg);
  margin-left: -38.6%;
  margin-top: 38.6%;
}
.ReturnBackHome {
  display: block;
  position: absolute;
  width: 23%;
  height: 4%;
  left: 48.5%;
  margin-left: -10%;
  bottom: 3.8%;
}
.ReturnBackHomezh {
  background: url("../../../assets/img/PCHome/back_zh.svg") no-repeat
    center/100%;
}
.ReturnBackHomezh:hover {
  background: url("../../../assets/img/PCHome/back_zh1.svg") no-repeat
    center/100%;
}
.ReturnBackHomeen {
  background: url("../../../assets/img/PCHome/back_en.svg") no-repeat
    center/100%;
}
.ReturnBackHomeen:hover {
  background: url("../../../assets/img/PCHome/back_en1.svg") no-repeat
    center/100%;
}
.load-style {
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  position: relative;
}
.load-style img {
  width: 150px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
