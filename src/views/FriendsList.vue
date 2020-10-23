<template>
  <div class="friends-list">
    <TopBar msg="好友"></TopBar>
    <div class="content">
      <van-index-bar highlight-color="#ef8f8e">
        <div v-for="(item, index) in friendsList" :key="index">
          <van-index-anchor :index="item.initial" />
          <div v-for="(item2, index2) in item.list" :key="index2" @click="toFriendDetail(item2)">
            <FriendsItem :friend="item2"></FriendsItem>
          </div>
        </div>
      </van-index-bar>
    </div>
    <BottomBar></BottomBar>
  </div>
</template>

<script>
import BottomBar from '@/components/BottomBar'
import TopBar from '@/components/TopBar'
import FriendsItem from '@/components/FriendsItem'

import store from '@/assets/store'
export default {
  name: 'FriendsList',
  components: {
    BottomBar,
    TopBar,
    FriendsItem
  },
  data () {
    return {
      user: store.state.userData.data,
      friendsList: store.state.friendsList
    }
  },
  methods: {
    toFriendDetail (item) {
      this.$router.push({
        name: 'FriendDetail',
        query: {
          msg: '1', // 1代表本人 或者已经是好友
          id: item.myFriendUserId
        }
      })
    }
  },
  created () {
    /* await http.get(api.queryAllFriends, {
      params: {
        myId: this.user.id
      }
    }).then((res) => {
      this.friendsList = res.data.data
      // console.log(this.friendsList)
    }) */
  }
}
</script>

<style scoped lang="less">
.friends-list {
  .content {
    padding-top: 3.3rem;
    padding-bottom: 50px;
    .van-index-bar {
      text-align: left;
      background-color: #00000010;
    }
  }
}
</style>
