<template>
  <div class="bottom-bar">
    <van-tabbar v-model="active" class="bar" active-color="#ff7675" inactive-color="#000" :route="true">
      <van-tabbar-item name="chat" icon="chat-o" to="/chatList">消息</van-tabbar-item>
      <van-tabbar-item name="friends" icon="friends-o" to="/friendsList" dot>好友</van-tabbar-item>
      <van-tabbar-item name="user" icon="contact" to="/oneself">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'BottomBar',
  data () {
    return {
      active: 'chat'
    }
  },
  created () {
  }
}
</script>

<style scoped lang="less">
.van-hairline--top-bottom {
  border-top: solid 1px #eee;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>
