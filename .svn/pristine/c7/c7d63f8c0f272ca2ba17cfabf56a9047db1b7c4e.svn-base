<template>
  <div class="pc-right" :class="{'pc-r-h':isHorizontal}">
    <div class="mobile2">
      <div class="wrap-box">
        <div class="qr-code" :class="{'is-show-qr-code':qrCodeShow}">
          <div class="lose">
            <vueqr :text="initQCode"></vueqr>
            <div :class="{'qr-text':qrgray}" v-if="qrgray">
              <i class="warn-qr"></i>
              <span class="warn-tips">{{$t("message.website.qrInvalid")}}</span>
            </div>
          </div>
          <div :class="{'refreshText': refreshText}" class="refresh" id="refresh" v-on:click="qrFresh">{{$t("message.website.refreshQR")}}</div>
        </div>
        <div :class="['isPlayingGame',{'wait-load': refreshText}]" @click="playOnMobile">{{$t('message.website.playOnMobile')}}</div>
      </div>
      <div>
        <div class="paly-tip-text">
          <span>{{$t("message.website.clickPlayOnMobile")}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

/**
* 二维码部分
* @module @/containers/PCHome/components/QrCode.vue
* @desc 生成二维码
* @author yang huiru
* @date 2018.5.25
* @param {Boolean} [isHorizontal]    - 传递点击旋转状态
* @param {Boolean} [isPlaying] - 传递开始游戏状态
* @example 调用示例
* <qr-code :isHorizontal="isHorizontal" :isPlaying="isPlaying"></qr-code>
*/

import * as postMessageEvent from '@/config/postMessageEvent'
import vueqr from 'vue-qr'
import crossHandler from '@/utils/crossHandler'
import getLanguagle from '@/utils/getLanguagle'
import playTipImage from '@/assets/img/PCHome/play-pc.png'
export default {
  name: 'QrCode',
  extends: {},
  props: {
    isHorizontal: {
      type: Boolean,
      default: false
    },
    isPlaying: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      gameName: '',
      initQCode: '',
      postMessageEvent,
      qrCodeShow: false,
      qrgray: false,
      refreshText: false,
      onoff: true,
      crossHandler,
      getLanguagle,
      playTipImage,
      timeOutId: ''
    }
  },
  computed: {
  },
  components: {
    vueqr
  },
  watch: {
    isPlaying () {
      this.crossHandler(postMessageEvent.REFRESH_QRCODE)
    }
  },
  methods: {
    // 刷新二维码
    qrFresh () {
      if (this.onoff) {
        clearTimeout(this.timeOutId)
        this.onoff = false
        this.qrgray = false
        this.refreshText = true
        this.crossHandler(postMessageEvent.REFRESH_QRCODE)
        this.timeOutId = setTimeout(() => {
          this.qrgray = true
        }, (1000 * 30))
      }
    },
    // 在手机上玩
    playOnMobile () {
      this.qrCodeShow = true
      this.qrFresh()
    },
    // 监听二维码的iframe事件
    addListener () {
      const self = this
      const doSth = {
        [postMessageEvent.INIT_QRCODE] (data) {
          self.initQCode = data.initQCode
          self.onoff = true
          self.refreshText = false
        },
        [postMessageEvent.CLOSE_QRCODE] (data) {
          self.qrCodeShow = data.qrCodeShow
        },
        [postMessageEvent.INVALID_QRCODE] (data) {
          self.qrgray = true
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
.pc-right {
  position: absolute;
  left: 50%;
  bottom: 25%;
  margin-left: 256px;
  transition: 0.35s all;
}
.paly-tip {
  position: absolute;
  left: 38%;
  top: 28px;
}
.paly-tip-text {
  position: absolute;
  bottom: 30px;
  width: 170px;
  height: 70px;
  right: -47px;
  top: -94px;
  font-size: 18px;
  color: #fff;
  font-family: 'Microsoft YaHei';
  background: url('../../../assets/img/PCHome/small_hand.svg') no-repeat left;
  animation: phone 1.5s infinite linear;
}
.paly-tip-text span {
  display: inline-block;
  vertical-align: middle;
  padding-left: 62px;
}
.wait-load {
  cursor: wait;
}
.pc-right .mobile2 {
  width: 282px;
  height: 310px;
  position: relative;
  z-index: 20;
}
.pc-r-h {
  left: 64%;
}
.wrap-box {
  width: 260px;
  height: 270px;
  left: 122px;
  position: absolute;
  overflow: hidden;
  z-index: 1;
  .qr-code {
    width: 170px;
    height: 190px;
    padding: 10px 0px 10px;
    left: 41px;
    z-index: -10;
    top: -146px;
    opacity: 0;
    text-align: center;
    position: absolute;
    background: #fff;
    transition:all 0.5s;
    -moz-transition:all 0.5s;
  }
}
.wrap-box {
.is-show-qr-code {
  opacity: 1;
  transform: translateY(200px);
}
}
.qr-code .lose {
  width: 100%;
  height: 170px;
  margin: 0 auto;
  position: relative;
  & /deep/ img {
    width: 170px;
    height: 170px;
  }
}
.qr-code .refresh {
  cursor: pointer;
  position: relative;
  top: -160px;
  height: 170px;
  padding-top: 150px;
  color: #00a0e9;
  z-index: 600;
  font-size: 13px;
}
.qr-code .refreshText {
  cursor: not-allowed;
  color: #e3e3e3;
}
.qr-text {
  width: 170px;
  height: 70px;
  position: absolute;
  top: 55px;
  font-size: 18px;
  color: #ffffff;
  background: #fa5656;
  .warn-qr {
    position: absolute;
    height: 22px;
    left: 73px;
    top: 10px;
    width: 22px;
    height: 22px;
    background: url('../../../assets/img/PCHome/warn_qr.svg') no-repeat center;
  }
  .warn-tips {
    position: relative;
    top: 40px;
  }
}
.isPlayingGame {
  position: absolute;
  width: 240px;
  height: 60px;
  line-height: 60px;
  font-size: 18px;
  color: #1787dd;
  z-index: -1;
  left: 5px;
  padding-left: 78px;
  border-radius: 30px;
  box-shadow: 1px 1px 4px rgba(23, 135, 221, 0.4);
  background: #fff url('../../../assets/img/PCHome/small_phone.svg') no-repeat 20px center;
  background-size: 18px 28px;
}
.isPlayingGame::after {
  content: '';
  position: absolute;
  left: 57px;
  top: 18px;
  width: 2px;
  height: 24px;
  background: #eeeeee;
}
.isPlayingGame:active {
  background-color: #f5f5f5;
}
.isPlayingGame:hover {
  box-shadow: 0px 10px 10px rgba(23, 135, 221, 0.3);
  transform: scale(1.02, 1.02);
  -ms-transform: scale(1.02, 1.02);
  -webkit-transform: scale(1.02, 1.02);
  -o-transform: scale(1.02, 1.02);
  -moz-transform: scale(1.02, 1.02);
}
@keyframes phone {
  0% {
    transform: translate(0px, 0px);
  }
  50% {
    transform: translate(0px, -10px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
@-moz-keyframes phone {
  0% {
    transform: translate(0px, 0px);
  }
  50% {
    transform: translate(0px, -10px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}

@-webkit-keyframes phone {
  0% {
    transform: translate(0px, 0px);
  }
  50% {
    transform: translate(0px, -10px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}

@-o-keyframes phone {
  0% {
    transform: translate(0px, 0px);
  }
  50% {
    transform: translate(0px, -10px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
</style>
