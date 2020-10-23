<template>
  <div class="about">
    <h1>This is an about page</h1>

    <div class="content">
      <input type="text" v-model="message">
      <van-button @click="send">发送</van-button>
      <textarea v-model="showMsg"></textarea>
    </div>
  </div>
</template>

<script>
import socket from '@/api/socket'
export default {
  data () {
    return {
      message: '',
      showMsg: ''
    }
  },
  methods: {
    send () {
      socket.send(this.message)
      socket.onmessage = this.getMessage
    },
    getMessage (e) {
      this.showMsg = e.data
    }
  },
  computed: {
  },
  mounted () {
  }
}
</script>
