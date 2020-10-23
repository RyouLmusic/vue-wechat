const store = {
  debug: true,
  state: {
    message: 'Hello!',
    userData: {},
    friendsList: []
  },
  setDataAction (data) {
    this.state = {}
  },
  setUserAction (user) {
    this.state.userData = user
  },
  getUserAction () {
    return this.state.userData
  },
  setUserNikName (nikName) {
    this.state.userData.nikname = nikName
  },
  setMessageAction (newValue) {
    if (this.debug) console.log('setMessageAction triggered with', newValue)
    this.state.message = newValue
  },
  clearMessageAction () {
    if (this.debug) console.log('clearMessageAction triggered')
    this.state.message = ''
  },
  replaceStore (data) {
    // console.log('replaceStore')
    // console.log(data)
    this.state = data
  }
}
export default store
