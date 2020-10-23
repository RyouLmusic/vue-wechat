const message = {
  CONNECT: 1, // "第一次(或重连)初始化连接"),
  CHAT: 2, // "聊天消息"),
  SIGNED: 3, // "消息签收"),
  KEEPALIVE: 4, // "客户端保持心跳"),
  PULL_FRIEND: 5, // "拉取好友");

  messageContent: function (action, senderId, receiverId, content, extend) {
    return {
      action: action, // 动作类型
      senderId: senderId, // 发送者id
      receiverId: receiverId, // 接收者id
      content: content, // 聊天内容
      extend: extend // 扩展字段
    }
  }
}
export default message
