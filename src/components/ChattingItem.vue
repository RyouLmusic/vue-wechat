<template>
  <div class="chatting-item">
    <div class="content">
      <div class="image">
        <van-image
          round
          fit="cover"
          width="4rem"
          height="4rem"
          :src="image"
        />
      </div>
      <div class="info">
        <p class="text nickname">{{ 'nickname' }}</p>
        <!--      <p class="text account">{{ username }}</p>-->
        <p class="text sentTime">{{ 'requestDateTime' }}</p>
        <p class="text message-content">请求添加好友</p>
        <p class="text message-count">请求添加好友</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChattingItem',
  props: ['faceImage', 'messageInfo'],
  computed: {
    image () {
      return 'http://' + this.messageInfo.friendInfo.faceImage
    }
  },
  created () {
    console.log(this.messageInfo)
  }
}
</script>

<style scoped>

</style>
