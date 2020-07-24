<template>
  <div class="server-error">
    <div>
       <p>Page Not Found</p>
       <p>
         <a href="#" @click="reload()">Retry</a>
         <router-link class="news_returnList" :to="{name:'Home', params:{tab:'navBar1'}}">Go Home</router-link>
       </p>
    </div>
  </div>
</template>
<script>

export default {
  name: 'index',
  data () {
    return {

    }
  },
  components: {

  },
  methods: {
    reload () {
      this.$router.back(-1)
    }

  },
  mounted: function () {

  }
}
</script>
<style lang="scss" scoped>
.server-error{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.server-error p{
  width: 100%;
  text-align: center
}
.server-error p a{
  padding: 0 10px;
  text-decoration: underline;
  color: blue;
}
</style>
