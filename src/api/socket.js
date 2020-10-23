// 看浏览器是否支持websocket
import store from '@/assets/store'

if (window.WebSocket) {
} else {
  // 不支持
}
const url = 'ws://localhost:8888/ws'
// const url = 'ws://192.168.43.159:8888/ws'
const webSocket = new WebSocket(url)

const socket = {
  reConnect () {
    // console.log(JSON.stringify(store.state.userData) === '{}')
    // if (JSON.stringify(store.state.userData) !== '{}' && typeof store.state.userData !== 'undefined') {
    const messageObj = {
      action: 1,
      senderId: store.state.userData.data.id,
      receiverId: '',
      content: '',
      extend: ''
    }
    const messageJson = JSON.stringify(messageObj)
    webSocket.onopen = function () {
      webSocket.send(messageJson)
    }
  },
  connect () {
    // console.log(JSON.stringify(store.state.userData) === '{}')
    // if (JSON.stringify(store.state.userData) !== '{}' && typeof store.state.userData !== 'undefined') {
    const messageObj = {
      action: 1,
      senderId: store.state.userData.data.id,
      receiverId: '',
      content: '',
      extend: ''
    }
    const messageJson = JSON.stringify(messageObj)
    webSocket.send(messageJson)
  },
  webSocket: webSocket
}
export default socket
