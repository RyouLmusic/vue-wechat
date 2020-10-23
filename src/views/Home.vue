<template>
  <div class="home">
    <div class="bg-img">
      <div class="foot"></div>
      <div class="sign">
        <div class="sign-in-up" @click="showSignIn">
          <van-icon class="triangle" name="play" size="25" v-show="isSignIn"/>
          <span>Sign In</span>
        </div>
        <div class="sign-in-up" @click="showSignUp">
          <van-icon class="triangle" name="play" size="25" v-show="!isSignIn"/>
          <span>Sign Up</span>
        </div>
      </div>
    </div>
    <div class="login-register">
<!--      登录-->
      <transition name="van-slide-left">
        <div class="login" v-show="isSignIn">
          <div>
            <div class="name">
              <van-icon color="#ff7675" size="25" class="manager" name="manager" />
              <input type="text" v-model="username" placeholder="请输入账号">
            </div>
            <div class="password">
              <van-icon color="#ff7675" size="25" class="lock" name="lock" />
              <input type="password" v-model="password" placeholder="请输入密码">
            </div>
            <van-button @click="login" color="#ff7675" class="sign-button">SIGN IN</van-button>
          </div>
        </div>
      </transition>
<!--      注册-->
      <transition name="van-slide-right">
        <div class="register" v-show="!isSignIn">
          <div>
            <div class="name">
              <van-icon color="#ff7675" size="25" class="manager" name="manager" />
              <input type="text" v-model="username" placeholder="请输入账号">
            </div>
            <div class="password">
              <van-icon color="#ff7675" size="25" class="lock" name="lock" />
              <input type="password" v-model="password" placeholder="请输入密码">
            </div>
            <van-button @click="register" color="#ff7675" class="sign-button">SIGN UP</van-button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import util from '@/assets/util'
import api from '@/api/api'
import util from '@/assets/util'
import axios from 'axios'
import { Toast } from 'vant'
import http from '@/api/httpAxios'
import store from '@/assets/store'
import socket from '@/api/socket'

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      username: '',
      password: '',
      isSignIn: true
    }
  },
  methods: {
    showSignIn: function () {
      // this.isSignIn
      if (this.isSignIn === false) {
        this.isSignIn = true
      }
    },
    showSignUp: function () {
      if (this.isSignIn === true) {
        this.isSignIn = false
      }
    },
    async login () {
      // const user = await axios.get('http://127.0.0.1:8080/wechat/user')
      // console.log(user)
      // const user = await axios.get('http://127.0.0.1:8080/wechat/user/' + this.username + '/' + this.password)
      // console.log(user)

      const usernameFormatMsg = util.isFormat(this.username)
      const passwordFormatMsg = util.isFormat(this.password)
      util.toastShow(usernameFormatMsg)
      util.toastShow(passwordFormatMsg)
      if (usernameFormatMsg === 4 && passwordFormatMsg === 4) {
        // TODO 进行丢数据到后端
        Toast.loading({
          message: '加载中...',
          forbidClick: true
        })
        const res = await axios.get(api.loginUrl, {
          timeout: 100000,
          params: {
            username: this.username,
            password: this.password
          }
        })
        switch (res.data.msg) {
          case 'OK':
            // console.log(res.data)
            // 将用户信息传递到数据管理处
            store.setUserAction(res.data)
            // console.log(store.getUserAction())
            socket.connect()
            this.$router.push({ name: 'ChatList' }).then(r => {
            })
            break
          case '账号错误':
            Toast.fail('账号错误')
            break
          case '密码错误':
            Toast.fail('密码错误')
            break
        }
        // console.log(res.data.msg)
      }

      // const user = axios.create({
      //   baseURL: 'http://127.0.0.1:8080/wechat/user/' + this.username + '/' + this.password,
      //   timeout: 1000
      // })
      // console.log(this.username)
    },
    async register () {
      const usernameFormatMsg = util.isFormat(this.username)
      const passwordFormatMsg = util.isFormat(this.password)
      util.toastShow(usernameFormatMsg)
      util.toastShow(passwordFormatMsg)
      if (usernameFormatMsg === 4 && passwordFormatMsg === 4) {
        // TODO 进行丢数据到后端 cid ,uuid 设备唯一标识还未获取到，以后改进
        await http.post(api.registerUrl, {
          username: this.username,
          password: this.password
        }).then((res) => {
          // console.log(res.data.
          // )
          if (res.data.msg === '账号已经存在') {
            Toast.fail('账号已经存在')
          } else {
            // this.$router.push({ name: 'Home' })
            this.isSignIn = true
          }
        })
        // console.log(res)
      }
    }

  },
  updated () {
    // const name = util.isNoNull(this.username)
    // const password = util.isNoNull(this.password)
    // console.log(name)
    // console.log(password)
  }
}
</script>
<style lang="less" scoped>
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .bg-img {
    position: relative;
    background-image: url(../assets/images/homeBg.jpg);
    height: 50vh;
    width: 100vw;
    background-size: cover;
    .foot {
      height: 50vh;
      width: 100vw;
      background-color: rgba(250, 20, 20, 0.3);
    }
    .sign {
      position: absolute;
      width: 100vw;
      text-align: center;
      bottom: 0;
      display: flex;
      justify-content: space-evenly;
      .sign-in-up {
        color: white;
        font-weight: lighter;
        display: flex;
        flex-direction: column-reverse;
        .van-icon {
          transform: rotate(-90deg)translateX(-10px);
        }
      }
    }
  }
  .login-register {
    flex: 1;
    .login,.register {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100vw;
      height: 100%;
      input {
        height: 50px;
        width: 80vw;
        border-radius: 50px;
        margin: 10px 0;
        border: solid 0.2px #aaa;
        background-color: #eee;
        padding-left: 40px;
        line-height: 2.2em;
        box-sizing: border-box;
        //box-shadow: 0px 0px 10px  rgba(0,0,0,0.2);
      }
      .sign-button {
        font-size: 1.2em;
        width: 80vw;
        height: 50px;
        border-radius: 50px;
        margin: 10px 0;
        box-shadow: 0px 2px 10px  rgba(0,0,0,.5);
        //font-weight: bold;
      }
    }
  }
  .login-register {
    .name {
      position: relative;
      .manager {
        position: absolute;
        left: 10px;
        top: 20px;
      }
    }
    .password {
      position: relative;
      .lock {
        position: absolute;
        left: 10px;
        top: 20px;
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}

</style>
