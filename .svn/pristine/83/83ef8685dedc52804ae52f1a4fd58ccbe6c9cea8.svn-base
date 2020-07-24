<template>
  <div>
    <div v-for="index in 4" :key="'spirit'+index">
      <div :class="['spirit'+index,'public-spirit']"></div>
    </div>
    <div v-for="index in 20" :key="'snow'+index">
      <div v-if="index%3===0" :class="['red-snow','falling-snow','snow'+index]"></div>
      <div v-else-if="index%3===1" :class="['white-snow','falling-snow','snow'+index]"></div>
      <div v-else-if="index%3===2" :class="['yellow-snow','falling-snow','snow'+index]"></div>
    </div>
  </div>
</template>

<script>

/**
* 背景精灵和抖动圆点
* @desc pc端的背景
* @author chenzechao
* @date 2018.7.26
* @example 调用示例
*     <ghw-spirit></ghw-spirit>
*/

export default {
  name: 'GhwSpirit',
  props: {},
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
.public-spirit {
  position: absolute;
  background-image: url('../../assets/img/PCHome/spirit.png');
  background-repeat: no-repeat;
  opacity: 0.3;
}
.spirit1 {
  width: 182px;
  height: 182px;
  top: 40%;
  left: 27px;
  background-position: -21px -320px;
}
.spirit2 {
  width: 104px;
  height: 100px;
  top: 140px;
  left: 437px;
  background-position: -30px -208px;
}
.spirit3 {
  width: 190px;
  height: 190px;
  top: 20px;
  right: 18px;
  background-position: 0px 0px;
}
.spirit4 {
  width: 185px;
  height: 185px;
  right: 500px;
  bottom: 65px;
  background-position: 0px bottom;
}

.snow1 {
  left: 330px;
  top: 164px;
  animation: rotate 20s linear infinite;
}
.snow2 {
  left: 234px;
  top: 134px;
  animation: rotate 8s linear infinite;
}
.snow3 {
  left: 257px;
  top: 204px;
  animation: rotate 15s linear infinite;
}
.snow4 {
  left: 150px;
  top: 300px;
  animation: rotate 40s linear infinite;
}
.snow5 {
  left: 100px;
  top: 400px;
  animation: rotate 12s linear infinite;
}
.snow6 {
  left: 210px;
  top: 400px;
  animation: rotate 25s linear infinite;
}
.snow7 {
  right: 350px;
  top: 14px;
  animation: rotate 18s linear infinite;
}
.snow8 {
  top: 234px;
  right: 15px;
  animation: rotate 25s linear infinite;
}
.snow9 {
  top: 250px;
  right: 100px;
  animation: rotate 50s linear infinite;
}
.snow10 {
  right: 250px;
  top: 300px;
  animation: rotate 20s linear infinite;
}
.snow11 {
  right: 270px;
  top: 310px;
  animation: rotate 23s linear infinite;
}
.snow12 {
  right: 100px;
  top: 35px;
  animation: rotate 10s linear infinite;
}
.snow13 {
  top: 500px;
  right: 230px;
  animation: rotate 35s linear infinite;
}
.snow14 {
  right: 250px;
  top: 100px;
  animation: rotate 10s linear infinite;
}
.snow15 {
  right: 150px;
  bottom: 100px;
  animation: rotate 17s linear infinite;
}
.snow16 {
  left: 150px;
  bottom: 50px;
  animation: rotate 10s linear infinite;
}
.snow17 {
  left: 150px;
  top: 50px;
  animation: rotate 150s linear infinite;
}
.snow18 {
  right: 340px;
  top: 160px;
  animation: rotate 26s linear infinite;
}
.snow20 {
  left: 350px;
  bottom: 100px;
  animation: rotate 38s linear infinite;
}
.falling-snow {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: transparent;
  border-radius: 50%;
  transform: translate(-50%, -70%) rotate(0);
  &::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    top: 0;
    left: 50%;
    border-radius: 50%;
  }
}
.red-snow {
  &::after {
    background-color: #ff509f;
  }
}
.white-snow {
  &::after {
    background-color: #fff;
  }
}
.yellow-snow {
  &::after {
    background-color: #fcef91;
  }
}
@keyframes rotate {
  50% {
    transform: translate(150%, 30%) rotate(180deg);
  }
  100% {
    transform: translate(-50%, -70%) rotate(360deg);
  }
}
</style>
