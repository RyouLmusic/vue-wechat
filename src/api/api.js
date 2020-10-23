const ApiRootUrl = 'http://127.0.0.1:8080/wechat'
// const ApiRootUrl = 'http://192.168.43.159:8080/wechat'
// const ApiRootUrl = 'api'
module.exports = {
  webSocketUrl: 'ws://localhost:8888/ws',
  /** 传入 username, password */
  loginUrl: ApiRootUrl + '/login',
  registerUrl: ApiRootUrl + '/register',
  // 修改的api，要传入username和nickname（昵称）
  updateUser: ApiRootUrl + '/update',
  // 选择新头像
  selectAvatar: ApiRootUrl + '/selectAvatar',
  // 查询其他用户
  searchFriend: ApiRootUrl + '/searchFriend', // 使用get方法
  // 用id查询用户
  searchById: ApiRootUrl + '/user',
  // 添加好友的请求
  addFriendRequest: ApiRootUrl + '/addFriendRequest', // post
  // 查询所有向我发送好友添加请求的数据
  getRequestList: ApiRootUrl + '/getRequestList', // 使用get方法
  // 拒绝好友请求或者同意好友请求之后  进行删除friendsRequest表里面的内容
  deleteRequest: ApiRootUrl + '/deleteRequest', // delete 方法
  // 同意好友请求之后，要将好友表数据增加
  addFriend: ApiRootUrl + '/addFriend', // post方法
  // 查询所有好友
  queryAllFriends: ApiRootUrl + '/queryAllFriends' // Get方法, 有myId参数
}
