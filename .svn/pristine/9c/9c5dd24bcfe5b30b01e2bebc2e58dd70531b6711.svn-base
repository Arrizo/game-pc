<template>
  <ul>
    <li>
      <!--<a href="" class="icon-user"><span>{{$t("message.usercenter")}}</span></a>-->
      <a @click="personalCenter()" class="icon-user clearfix">
        <span>{{$t("message.website.myPage")}}</span>
      </a>
    </li>
    <li>
      <a class="icon-info clearfix" @click="showMyMessage()">
        <span>{{$t("message.website.message")}}
          <i v-show="messageNum!=0" class="num-style">{{'('+messageNum+')'}}</i>
        </span>
      </a>
    </li>
    <li>
      <a @click="exchangeUser()" class="icon-account clearfix">
        <span>{{$t("message.website.switchAcct")}}</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'sliderUser',
  props: {
    messageNum: {
      type: Number,
      default: 0
    }
  },
  methods: {
    personalCenter () {
      this.$emit('personalCenter')
    },
    exchangeUser () {
      this.$emit('exchangeUser')
    },
    showMyMessage () {
      this.$emit('showMyMessage')
    }
  }
}
</script>

<style lang="scss" scoped>
.top-pc-nav ul {
  position: absolute;
  left: 20px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 5px 5px 5px rgba(23, 135, 221, 0.3);
  display: none;
}
.top-pc-nav ul li a {
  display: block;
  padding: 17px 10px 17px 55px;
  width: 184px;
  background-size: 20px 20px;
  span {
    width: 90px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    float: left;
  }
}
.top-pc-nav ul li a:hover {
  background-color: rgba(255, 255, 255, 0.6);
  color: #00a0e9;
}
.num-style {
  color: red;
  font-style: normal;
  margin-left: 5px;
}
.icon-user {
  background: url('../../../assets/img/PCHome/user.svg') no-repeat 20px center/20px;
}
.icon-user:hover {
  background: url('../../../assets/img/PCHome/user2.svg') no-repeat 20px center/20px;
  background-size: 20px 20px;
}
.icon-info {
  background: url('../../../assets/img/PCHome/info.svg') no-repeat 20px center/20px;
}
.icon-info:hover {
  background: url('../../../assets/img/PCHome/info2.svg') no-repeat 20px center/20px;
  background-size: 20px 20px;
}
.icon-account {
  background: url('../../../assets/img/PCHome/account.svg') no-repeat 20px center/20px;
}
.icon-account:hover {
  background: url('../../../assets/img/PCHome/account2.svg') no-repeat 20px center/20px;
  background-size: 20px 20px;
}
a,
img {
  text-decoration: none;
  border: none;
  color: #333;
}
</style>
