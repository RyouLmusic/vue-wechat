<template>
<div class="friends-request-item">
  <div class="content">
    <div class="image">
      <van-image
        round
        fit="cover"
        width="4rem"
        height="4rem"
        :src="faceImage"
      />
    </div>
    <div class="info">
      <p class="text nickname">{{ nickname }}</p>
<!--      <p class="text account">{{ username }}</p>-->
      <p class="text sentTime">{{ requestDateTime }}</p>
      <p class="text tip">请求添加好友</p>
    </div>
    <div class="btn">
      <van-button plain hairline color="#ef8f8e" type="primary" @click="agreeRequest">同意</van-button>
    </div>
  </div>
</div>
</template>

<script>
import http from '@/api/httpAxios'
import api from '@/api/api'

export default {
  name: 'FriendsRequestItem',
  props: ['requestInfo'],
  data () {
    return {
      sentUser: {}
    }
  },
  computed: {
    faceImage () {
      return 'http://' + this.requestInfo.sentUser.faceImage
    },
    nickname () {
      return this.requestInfo.sentUser.nickname
    },
    username () {
      return this.requestInfo.sentUser.username
    },
    requestDateTime () {
      return this.requestInfo.requestDateTime
    }
  },
  methods: {
    async agreeRequest () {
      // 同意添加为好友
      // console.log(this.requestInfo)
      // 先进行后端 的‘表’操作
      await http.post(api.addFriend, {
        myUserId: this.requestInfo.acceptUserId,
        myFriendUserId: this.requestInfo.sendUserId
      }).then((res) => {
        if (res.data.msg === 'OK') {
          // 将页面的好友请求数据进行删除
          this.$emit('permit')
          // 把这个新好友展示出来在聊天列表上
          // this.$emit('chatListAddItem')
        }
      })
    }
  },
  created () {
    // 对sentUserId进行数据查询，将查询到的数据进行展示
    // await Http.get(api.searchById + '/' + this.requestInfo.sendUserId).then((res) => {
    //   console.log('*******')
    //   console.log(res)
    //   this.sentUser = res.data
    // })
    // this.sentUser = this.requestInfo.sentUser

    // console.log('this.requestInfo.sentUser')
    // console.log(this.requestInfo.sentUser)
  }
}
</script>

<style scoped lang="less">
.friends-request-item {
  .content {
    display: flex;
    margin: 0.3rem;
    .image {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .info {
      padding: 0.2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .text {
        display: flex;
        padding-left: 0.4rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .nickname {
        font-weight: bold;
      }
      .sentTime,.tip {
        opacity: 0.6;
        //color: #ef8f8e;
        font-size: 0.8rem;
      }
    }
    .btn {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 0.4rem;
      .van-hairline--surround {
        height: 2.2rem;
        width: 3.8rem;
      }
    }
  }
}
</style>
