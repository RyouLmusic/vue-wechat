<template>
  <div class="chat-list">
    <TopBar msg="消息"></TopBar>
    <div class="content">
      <div class="friends-request">
        <div class="request-container" v-for="(requestItem, index) in requestList" :key="index">
          <van-swipe-cell right-width="4.4rem" >
            <!--好友请求的好友详情-->
            <FriendsRequestItem :request-info="requestItem" @permit="deleteRequest(requestItem)"></FriendsRequestItem>
            <template #right>
              <van-button square type="danger" text="删除" @click="deleteRequest(requestItem)"/>
            </template>
          </van-swipe-cell>
        </div>
      </div>
      <p class="text">聊天内容</p>
      <div class="chat-message">
        <div class="chat-message-container" v-for="(item, index) in logSnapshotList" :key="index">
          <van-swipe-cell right-width="4.4rem" >
            <!--好友消息-->
            <ChattingItem :message-info="item"></ChattingItem>
            <template #right>
              <van-button square type="danger" text="删除"/>
            </template>
          </van-swipe-cell>
        </div>
      </div>
    </div>
    <BottomBar></BottomBar>
  </div>
</template>

<script>
import BottomBar from '@/components/BottomBar'
import TopBar from '@/components/TopBar'
import FriendsRequestItem from '@/components/FriendsRequestItem'
import ChattingItem from '@/components/ChattingItem'
import api from '@/api/api'
import Http from '@/api/httpAxios'
import store from '@/assets/store'
import util from '@/assets/util'
import chatLogs from '@/assets/manageChatLogs'

const map = new Map()
export default {
  name: 'ChatList',
  data: function () {
    return {
      user: store.state.userData.data,
      showItem: true,
      requestList: [],
      logSnapshotMap: map,
      logSnapshotList: []
    }
  },
  computed: {
  },
  methods: {
    async deleteRequest (requestItem) {
      // 请求后端进行删除,不同意请求
      await Http.delete(api.deleteRequest + '/' + requestItem.id).then((res) => {
        if (res.data.msg === 'OK') {
          this.requestList.splice(this.requestList.indexOf(requestItem), 1)
        }
      })
    },
    // 将需要的资源存在this.logSnapshotList里面
    getSnapshotList () {
      this.logSnapshotMap = chatLogs.getSnapshot(this.user.id)
      if (typeof this.logSnapshotMap === 'undefined') { return }
      console.log('8888888888888')
      console.log(this.logSnapshotMap)
      for (const i in store.state.friendsList) {
        const list = store.state.friendsList[i].list
        console.log(list)
        for (const k in list) {
          const fid = list[k].myFriendUserId
          // console.log(list[k][0])
          if (typeof this.logSnapshotMap.get(fid) !== 'undefined' && this.logSnapshotMap.get(fid) !== null) {
            this.logSnapshotList.push({
              id: fid,
              friendInfo: list[k].friend,
              msg: this.logSnapshotMap.get(fid)
            })
          }
        }
      }
    },
    async getFriendsRequest () {
      await Http.get(api.getRequestList + '/' + this.user.id).then((res) => {
        // console.log(res)
        // 此处的后端用连表查询会更加好，减少请求次数， 连接user表
        this.requestList = res.data.data
      })
    }
  },
  mounted () {
  },
  components: {
    BottomBar,
    TopBar,
    FriendsRequestItem,
    ChattingItem
  },
  created () {
    // 向后端请求 要求添加好友的数据
    this.getFriendsRequest()
    util.pullFriendsList().then((res) => {
      this.getSnapshotList()
    })
  }
}
</script>

<style scoped lang="less">
.chat-list {
  .content {
    padding-top: 3.3rem;
    .friends-request {
      .request-container {
        &:last-child {
          border-bottom: #eee 1px solid;
        }
        .van-button--square {
          height: 100%;
          width: 4.4rem;
        }
      }
    }
  }
}
</style>
