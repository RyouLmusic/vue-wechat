const chatLogs = {
  setLogs (myId, friendId, msgList) {
    const key = 'chat-' + myId + '-' + friendId
    localStorage.setItem(key, JSON.stringify(msgList))
  },
  getLogs (myId, friendId) {
    const key = 'chat-' + myId + '-' + friendId
    const msgList = JSON.parse(localStorage.getItem(key))
    return msgList
  },
  removeLogs (myId, friendId) {
    const key = 'chat-' + myId + '-' + friendId
    localStorage.removeItem(key)
  },
  // 最后一条消息，看是否显示到
  setLogSnapshot (myId, latestMsgMap) {
    const key = 'snapshot-' + myId
    const obj = this.mapToObj(latestMsgMap)
    localStorage.setItem(key, JSON.stringify(obj))
  },
  getSnapshot (myId) {
    const key = 'snapshot-' + myId
    const obj = JSON.parse(localStorage.getItem(key))
    let latestMsgMap
    if (obj) {
      latestMsgMap = this.objToMap(obj)
    }
    return latestMsgMap
  },
  removeSnapshot (myId) {
    const key = 'snapshot-' + myId
    localStorage.removeItem(key)
  },
  // map转Json需要先转为Object之后再转成Json
  // map对象转Object
  mapToObj (map) {
    const obj = Object.create(null)
    for (const [k, v] of map) {
      obj[k] = v
    }
    return obj
  },
  // Object转成Map
  objToMap (obj) {
    const map = new Map()
    for (const k of Object.keys(obj)) {
      map.set(k, obj[k])
    }
    return map
  }
}

export default chatLogs
