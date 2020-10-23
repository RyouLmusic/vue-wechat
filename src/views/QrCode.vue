<template>
  <div class="qr-code">
    <div class="top">
      <DetailTopBar text="我的二维码"></DetailTopBar>
    </div>
    <div class="content">
      <div class="content-background">
        <div class="small">
<!--          http://192.168.87.140/wdzl/M00/00/00/wKhXjF9iYhqAJCovAAU4BkMaB14905.png-->
          <van-image fit="cover" radius="5" width="4rem" height="4rem" :src="image"/>
          <span class="name-text">{{ username }}</span>
        </div>
        <div class="code-image">
          <van-image fit="cover" width="16rem" height="16rem" :src="qrcode"/>
          <p class="text">扫一扫上面的二维码，加我好友</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DetailTopBar from '@/components/DetailTopBar'
import store from '@/assets/store'

export default {
  name: 'QrCode',
  components: {
    DetailTopBar
  },
  data () {
    return {
      user: store.state.userData.data
      // image: require('../assets/images/avatar.jpg')
    }
  },
  computed: {
    username () {
      return this.user.nickname
    },
    image () {
      return 'http://' + this.user.faceImage
    },
    qrcode () {
      return 'http://' + this.user.qrcode
    }
  }
}
</script>

<style scoped lang="less">
.qr-code {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    //background-color: #999;
    display: flex;
    justify-content: center;
    align-items: center;
    .content-background {
      height: 25rem;
      width: 20rem;
      background-color: rgba(240, 142, 142, .3);
      border-radius: 5px;
      .small {
        display: flex;
        justify-content: flex-start;
        padding-bottom: 2rem;
        padding-left: 1rem;
        padding-top: 1rem;
        .name-text {
          display: flex;
          align-items: flex-end;
          padding-left: 0.4rem;
          color: #ff7675;
        }
      }
      .code-image {
        .text {
          color: #ef8f8e;
          font-size: 0.8rem;
        }
      }
    }
  }
}
</style>
