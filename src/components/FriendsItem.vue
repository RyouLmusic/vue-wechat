<template>
  <div class="friends-item">
    <div class="content">
      <div class="avatar">
        <van-image
          width="3.3rem"
          height="3.3rem"
          fit="cover"
          :src="image"
          radius="5px"
        />
      </div>
      <div class="nickname"> {{ friendItem.nickname }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FriendsItem',
  props: ['friend'],
  data () {
    return {
      friendItem: this.friend.friend
    }
  },
  computed: {
    image () {
      return 'http://' + this.friendItem.faceImage
    }
  }
}
</script>

<style scoped lang="less">
.friends-item {
  .content {
    background-color: white;
    display: flex;
    height: 4rem;
    align-items: center;
    .avatar {
      height: 3.3rem;
      padding: 0 .4rem;
    }
    .nickname {
      padding-left: .6rem;
      display: block;
      flex: 0.9;
      height: 100%;
      display: flex;
      align-items: center;
      border-bottom: #dde3e3 solid 1px;
    }
  }
}
</style>
