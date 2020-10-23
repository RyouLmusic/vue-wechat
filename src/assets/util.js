import { Toast } from 'vant'
import Http from '@/api/httpAxios'
import api from '@/api/api'
import store from '@/assets/store'

const util = {
  isNull: function (str) {
    if (str != null && str !== '' && str !== undefined) {
      return false
    }
    return true
  },
  // 0: 是空格
  // 1：非数字
  // 2：长度不够
  // 3：太长
  // 4: 可以通过
  isFormat (str) {
    if (!this.isNull(str)) {
      const re = /^[0-9]+.?[0-9]*/
      if (!re.test(str)) {
        return 1
      } else {
        if (str.length < 8) {
          return 2
        } else if (str.length > 16) {
          return 3
        } else {
          return 4
        }
      }
    } else {
      return 0
    }
  },
  toastShow (msg) {
    switch (msg) {
      case 0:
        Toast.fail('不能为空')
        break
      case 1:
        Toast.fail('不能为非数字')
        break
      case 2:
        Toast.fail('长度不能小于8')
        break
      case 3:
        Toast.fail('长度不能大于16')
        break
      // case 4:
      //   Toast.success('操作成功')
    }
  },
  async pullFriendsList () {
    await Http.get(api.queryAllFriends, {
      params: {
        myId: store.state.userData.data.id
      }
    }).then((res) => {
      store.state.friendsList = res.data.data
      // console.log(this.friendsList)
    })
  }
}
export default util
