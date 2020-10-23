<template>
  <div class="chat">
    <DetailTopBar :text="nickname"></DetailTopBar>
    <div class="content">
      <div class="message-container">
        <div class="message-content" id="message" v-for="(item, index) in content" :key="index">
          <!--        <LeftMessage :face-image="faceImage" :id="id">你的消息来了赛啊俗话说的阿苏大概是个大屿山啊于是果断十分大阿姨打扫同方大厦压缩高端也无法</LeftMessage>-->
          <!--        <RightMessage :face-image="user.faceImage" :id="user.id">我来发消息了，这么赛的函数与萨哀诉电压过大阿德哇依按原有的傻瓜的</RightMessage>-->
          <right-message :face-image="user.faceImage" :id="user.id" v-if="item.id == user.id">{{ item.msg }}</right-message>
          <left-message :face-image="faceImage" :id="id" v-if="item.id == id">{{ item.msg }}</left-message>
        </div>
      </div>
      <div class="container">
        <div class="input-box">
<!--          <textarea  type="text" v-model="textContent" class="inputContent"/>-->
          <van-field class="inputContent" v-model="textContent" rows="1" :autosize="{ maxHeight: 100, minHeight: 20 }" type="textarea"/>
          <van-button class="referBut btn" @click="referContent">发送</van-button>
          <van-button class="faceBut btn" @click="faceContent">表情</van-button>
        </div>
        <!-- 表情区域 -->
        <div class="brow-box" v-if="faceShow">
          <ul>
            <li v-for="(item,index) in faceList" :key="index" @click="getBrow(index)">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftMessage from '@/components/OnTheLeftMessage'
import DetailTopBar from '@/components/DetailTopBar'
import RightMessage from '@/components/OnTheRightMessage'
import store from '@/assets/store'
import socket from '@/api/socket'
import message from '@/assets/message'
import util from '@/assets/util'
import chatLogs from '@/assets/manageChatLogs'

const appData = require('@/assets/emojis.json')
const map = new Map()
export default {
  name: 'Chat',
  data () {
    return {
      id: this.$route.query.id,
      faceImage: this.$route.query.faceImage,
      nickname: this.$route.query.nickname,
      user: store.state.userData.data,
      textContent: '',
      faceList: [],
      faceShow: false,
      getBrowString: '',
      content: [],
      scrollProcessData: '',
      logSnapshotMap: map

    }
  },
  methods: {
    faceContent () {
      this.faceShow = !this.faceShow
    },
    // 获取用户点击之后的标签 ，存放到输入框内
    getBrow (index) {
      this.getBrowString = this.faceList[index]
      this.textContent += this.getBrowString
    },
    // 将input的内容渲染到页面上
    referContent () {
      /* const div = document.getElementById('message')
      this.processData = div.scrollHeight */
      this.scrollProcessData = this.content.length // 引起监听事件，调用scrollToBottom()方法，是滚动条位于底部
      // 发送消息到webServer
      const messageObj = {
        action: 2,
        senderId: this.user.id,
        receiverId: this.id,
        content: this.textContent,
        extend: null
      }
      const messageJson = JSON.stringify(messageObj)
      this.sendMessage(messageJson)
      // private Integer action;//动作类型

      // private String senderId;//发送者id
      // private String receiverId;//接收者id
      // private String content;//聊天内容

      // private String extend;//扩展字段
      // sendId: this.user.id,
      // acceptId: this.id
      // 存入
      this.content.push({
        id: this.user.id,
        msg: this.textContent
      })
      // 将聊天记录存入到localStorage
      chatLogs.setLogs(this.user.id, this.id, this.content)

      // 存储消息快照，存储最后一条消息
      // 先把已经存在的消息删除 map会自动覆盖
      // 再进行添加（覆盖）
      const myDate = new Date()
      const c = {
        content: this.textContent,
        time: myDate
      }
      this.logSnapshotMap.set(this.id, c)
      // 持续化存储
      chatLogs.setLogSnapshot(this.user.id, this.logSnapshotMap)
      // 清空input数据
      this.textContent = ''
      // 关闭表情列表
      this.faceShow = false
    },
    sendMessage (message) {
      socket.webSocket.send(message)
    },
    getMessage (e) {
      if (e.data === undefined || e.data === null) { return }
      // 拉取好友
      if (e.data.action === message.PULL_FRIEND) {
        // 拉取
        util.pullFriendsList()
      }
      const json = JSON.parse(e.data)
      this.content.push({
        id: json.senderId,
        msg: json.content
      })
      // 存储消息到持续化存储localStorage
      chatLogs.setLogs(this.user.id, this.id, this.content)
      // 存储消息快照，存储最后一条消息
      // 先把已经存在的消息删除
      // 再进行添加（覆盖）
      const myDate = new Date()
      const c = {
        content: json.content,
        time: myDate
      }
      this.logSnapshotMap.set(this.id, c)
      // 持续化存储
      chatLogs.setLogSnapshot(this.user.id, this.logSnapshotMap)
      /* this.content.push({
        id: e.data.receiverId,
        msg: e.data.content
      }) */
      /* console.log(json)
      for (let i = 0; i < this.content.length; i++) {
        console.log(this.content[i])
      } */
    },
    scrollToBottom () {
      this.$nextTick(() => {
        const div = document.querySelector('.message-container')
        // div.scrollTop = div.scrollHeight
        // 如果是图片的话，可能会出现图片未加载出来就进行计算，导致不会到达底部
        // 给图片加一个onload事件，加载完毕之后再调用这个计算方法
        window.scroll(0, div.scrollHeight)
        console.log(div.scrollTop)
        console.log(div.scrollHeight)
      })
    }
  },
  watch: {
    scrollProcessData: function () {
      this.scrollToBottom()
    }
  },
  mounted () {
  },
  created () {
    socket.webSocket.onmessage = this.getMessage
    for (const i in appData) {
      this.faceList.push(appData[i].char)
    }
    // 获取缓存中的消息,显示到页面上
    /* const key = 'chat-' + this.user.id + '-' + this.id
    this.content = JSON.parse(localStorage.getItem(key)) */
    if (chatLogs.getLogs(this.user.id, this.id)) {
      this.content = chatLogs.getLogs(this.user.id, this.id)
    }
  },
  components: {
    LeftMessage,
    DetailTopBar,
    RightMessage
  }
}
</script>

<style scoped lang="less">

.chat {
  padding-top: 3.3rem;
  .content {
    padding-bottom: 3.3rem;
    .container {
      position: fixed;
      bottom: 0;
      width: 100vw;
      .input-box {
        background: #ece2e2;
        display: flex;
        align-items: center;
        padding: 0.2rem 0.2rem;
        .referBut {
          margin-right: 0.1rem;
        }
        .btn {
          height: 2.4rem;
          border-style: none;
          background-color: #ef8f8e;
        }
        //van-cell__value van-cell__value--alone van-field__value  inputContent van-cell van-field
        .inputContent {
          padding: 0 0 0 5px;
          //padding-left: 5px;
          display: flex;
          align-items: center;
          border-style: none;
          min-height: 2.4rem;
          line-height: 1.4rem;
          margin-right: 0.2rem;
          flex: 1;
          //font-size: 1.2rem;
          font-family: 幼圆;
          font-size: 1rem;
        }
      }
      .brow-box {
        width: 100%;
        height: 30vh;
        //height: 200px;
        background: #ece2e2;
        //background: #ef8f8e;
        overflow: scroll;
        ul {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          padding: 10px;
          li {
            width: 2rem;
            font-size: 1rem;
            padding: 0.5rem;
            list-style: none;
            text-align: center;
          }
        }
      }
    }
  }
  .message-container{
    overflow:scroll
  }
}

</style>
