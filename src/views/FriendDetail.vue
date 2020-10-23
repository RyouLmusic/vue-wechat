<template>
  <div class="friend-detail">
    <div class="top">
      <DetailTopBar text=""></DetailTopBar>
    </div>
    <div class="content">
      <div class="info-container">
        <div class="image">
          <van-image
            fit="cover"
            width="4rem"
            height="4rem"
            radius="5px"
            :src="faceImageBig"
          />
        </div>
        <div class="info">
          <p class="info-text nickname">{{ nickname }}</p>
          <p class="info-text username">账号: {{ username }}</p>
<!--          <p class="info-text">这是一段最多显示一行的文字，多余sss的内容会被省略</p>-->
        </div>
      </div>
      <div class="operation">
        <van-button type="primary" color="#ef8f8e" plain class="operation-text" block v-show="addButtonShow" @click="addFriend">添加通讯录</van-button>
        <van-button type="primary" color="#ef8f8e" plain class="operation-text" block v-show="sendButtonShow" @click="sendMessage">发送消息</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import DetailTopBar from '@/components/DetailTopBar'
import Vue from 'vue'
import { Lazyload, Toast } from 'vant'
import api from '@/api/api'
import http from '@/api/httpAxios'
import store from '@/assets/store'

Vue.use(Lazyload)
export default {
  name: 'FriendDetail',
  components: {
    DetailTopBar
  },
  data () {
    return {
      msg: this.$route.query.msg,
      id: this.$route.query.id,
      user: {},
      addButtonShow: true,
      sendButtonShow: false
    }
  },
  computed: {
    faceImageBig () {
      return 'http://' + this.user.faceImageBig
    },
    nickname () {
      return this.user.nickname
    },
    username () {
      return this.user.username
    }

  },
  methods: {
    black () {
      this.$router.go(-1)
    },
    async addFriend () {
      await http.post(api.addFriendRequest, {
        sendId: store.state.userData.data.id,
        acceptId: this.id
      }).then((res) => {
        // console.log(res)
        // 进行跳转
        // Toast.success()
        if (res.data.msg === 'OK') {
          Toast.success('已经发送添加信息，等待同意')
          this.$router.push('chatList')
        } else {
          Toast.fail('添加失败')
          this.$router.go(-1)
        }
      })
    },
    sendMessage () {
      // console.log(this.user)
      this.$router.push({
        name: 'Chat',
        query: {
          id: this.id,
          faceImage: this.user.faceImage,
          nickname: this.user.nickname
        }
      })
    }
  },
  async created () {
    // 请求数据
    await http.get(api.searchById + '/' + this.id).then((res) => {
      // console.log(res)
      this.user = res.data
    })

    if (this.msg === '1') {
      this.addButtonShow = false
      this.sendButtonShow = true
    } else {
      this.addButtonShow = true
      this.sendButtonShow = false
    }
  }
}
</script>

<style scoped lang="less">
.friend-detail {
  .top {
  }
  .content {
    padding-top: 3.3rem;
    .info-container {
      display: flex;
      padding-top: 1rem;
      margin-left: 1rem;
      .image {
        .van-image {
        }
      }
      .info {
        margin-left: 1.1rem;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .info-text {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .nickname {
          font-weight: bold;
        }
      }
    }
    .operation {
      margin-top: 2.2rem;
    }
  }
}
</style>
