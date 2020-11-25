<template>
  <div id="app" ref="app">
    <router-view />
  </div>
</template>
<script>

export default {
  name: 'App',
  data () {
    return {
      obj:{
        name:'aa',
        daf:22
      }
    }
  },
  computed: {
  },
  watch: {
  },
  beforeCreate () {
  },
  methods: {
    beforeUnload () {
      window.onbeforeunload = function (e) {
        const msg = '系统可能不会保存您所做的更改。'
        e = e || window.event
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
          e.returnValue = msg
        }
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return msg
      }
    }
  },
  created () {
  },
  mounted () {
    this.beforeUnload()
  }
}
</script>

<style>
#app {
  width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
