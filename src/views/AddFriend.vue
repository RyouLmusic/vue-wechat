<template>
  <div class="add-friend">
    <div class="top">
      <div class="icon-text">
        <van-icon name="arrow-left" @click="black"/>
        <p>添加朋友</p>
      </div>
    </div>
    <div class="search">
      <van-search
        v-model="username"
        shape="round"
        placeholder="请输入账号"
        @search="search"
      />
    </div>
  </div>
</template>

<script>
import Util from '@/assets/util'
import api from '@/api/api'
import Http from '@/api/httpAxios'
import store from '@/assets/store'
import { Toast } from 'vant'
export default {
  name: 'AddFriend',
  data () {
    return {
      username: '',
      user: store.state.userData.data
    }
  },
  methods: {
    black () {
      this.$router.go(-1)
    },
    async search () {
      // 进行数据username查询，是否不合法
      const resultsCode = Util.isFormat(this.username)
      Util.toastShow(resultsCode)
      // console.log(this.user)
      // code为4的时候可以通过
      if (resultsCode === 4) {
        // 进行请求后端数据，将自己的id和查询的账号发送至后端
        await Http.get(api.searchFriend, {
          params: {
            myId: this.user.id,
            friendUsername: this.username
          }
        }).then((res) => {
          // msg:404 :没有此用户
          // msg:500 :是本人
          // msg:200 :已经是好友   跟是本人的反应应该一致
          // msg:402 :可以添加好友到通讯录
          switch (res.data.msg) {
            case '404':
              Toast.fail('没有此用户')
              break
            case '500':
              // 跳转至好友详情页 是本人
              this.$router.push({
                name: 'FriendDetail',
                query: {
                  msg: '1', // 1代表本人 或者已经是好友
                  id: res.data.data.id
                }
              })
              // this.$router.push('friendDetail')
              break
            case '200':
              // 跳转至好友详情页
              this.$router.push({
                name: 'FriendDetail',
                query: {
                  msg: '1', // 1代表本人 或者已经是好友
                  id: res.data.data.id
                }
              })
              break
            case '402':
              // 跳转至好友详情页,但是是添加好友的选项
              this.$router.push({
                name: 'FriendDetail',
                query: {
                  msg: '0', // 0还未添加为好友
                  id: res.data.data.id
                }
              })
              break
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.add-friend {
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
