<template>
  <div class="detail-top-bar">
    <div class="top">
      <div class="icon-text">
        <van-icon name="arrow-left" @click="black"/>
        <p>{{ text }}</p>
      </div>
      <div class="icon-more">
        <van-icon name="ellipsis" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailTopBar',
  props: ['text'],
  methods: {
    black () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
.detail-top-bar {
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 10;
  background-color: white;
  border-bottom: #fff 1px solid;
  .top {
    height: 3.3rem;
    display: flex;
    justify-content: space-between;
    color: #ff7675;
    border-bottom: solid 1px #eeee;
    .icon-text {
      display: flex;
      align-items: center;
      font-size: 1.1rem;
      margin-left: 10px;
      p {
        padding-left: 10px;
      }
    }
    .icon-more {
      height: 100%;
      display: flex;
      align-items: center;
      padding-right: 0.6rem;
      .van-icon-ellipsis {
        font-size: 1.3rem;
        padding-right: 0.8rem;
      }
    }
  }
}
</style>
