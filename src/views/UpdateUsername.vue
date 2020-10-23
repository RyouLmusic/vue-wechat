<template>
  <div class="update-username">
    <div class="top">
      <div class="icon-text">
        <van-icon name="arrow-left" @click="black"/>
        <p>修改昵称</p>
      </div>
      <div class="button-container">
        <van-button color="#ff7675" class="button" @click="update">完成</van-button>
      </div>
    </div>
    <div class="content">
      <input @keyup.enter="update" class="input" type="text" v-model="nickname">
    </div>
    <p>好名字可以让你的朋友更容易记住你</p>
  </div>
</template>

<script>
import Http from '@/api/httpAxios'
import api from '@/api/api'
import store from '@/assets/store'
import { Toast } from 'vant'
import Util from '@/assets/util'
export default {
  name: 'UpdateUsername',
  data () {
    return {
      nickname: store.state.userData.data.nickname,
      user: store.state.userData
    }
  },
  methods: {
    black () {
      this.$router.go(-1)
    },
    async update () {
      // 查询是否为空
      if (!Util.isNull(this.nickname)) {
        // 传递到后端进行修改，并且将store的数据也进行修改
        // console.log(this.user)
        this.user.data.newNickname = this.nickname
        await Http.put(api.updateUser, {
          user: this.user.data
        }).then((res) => {
          // console.log(res)
          this.user.data.newNickname = ''
          this.user.data.nickname = this.nickname // 在此处修改可以影响到store.state.userData里的数据
          Toast.success('修改成功')
          // 修改成功之后进行跳转到个人页面
          this.$router.push('oneself')
        }).catch((res) => {
          // 失败之后的处理
          Toast.fail('修改失败')
        })
      } else {
        Toast.fail('昵称不能为空')
      }

      // .then((res) => {
      // 返回个人页面,修改页面
      // console.log('************')
      // store.state.userData用户数据
      // console.log(store.state.userData)
      // })
    }
  }
}
</script>

<style scoped lang="less">
.update-username {
  display: flex;
  flex-direction: column;
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
    .button-container {
      height: 100%;
      display: flex;
      align-items: center;
      padding-right: 0.6rem;
      .button {
        width: 4.2rem;
        height: 2.2rem;
      }
    }
  }
  .content {
    margin-top: 2.2rem;
    .input {
      width: 100vw;
      border-style: none;
      //border-bottom: solid 1px ;
      height: 2.2rem;
      padding: 0 1rem;
      overflow: hidden;
      outline: none;
      box-sizing: border-box;
    }
    &::after {
      content: "";
      width: 100%;
      display: block;
      height: 1px;
      background: linear-gradient(to left, #eee, #ef8f8e, #ff7675, #ef8f8e, #eee);
    }
  }
  &>p {
    color: #ef8f8e;
    text-align: left;
    font-size: 0.8rem;
    padding-left: 1rem;
  }
}
</style>
