<template>
  <div class="oneself">
    <TopBar msg="我的"></TopBar>

    <div class="content-div">
      <div class="info">
        <van-cell-group>
          <van-cell title="头像" class="avatar" @click.stop="selectAvatar">
            <van-image fit="cover" @click.stop="imagePreview" round width="4rem" height="4rem" :src="image"/>
            <van-icon name="arrow" />
          </van-cell>
          <van-cell title="昵称" @click="updateUsername">
            <!--          <van-image round width="4rem" height="4rem" :src="image"/>-->
            <p class="text">{{ nickname }}</p>
            <van-icon name="arrow" />
          </van-cell>
          <van-cell title="账号">
            <p class="text">{{ username }}</p>
          </van-cell>
          <van-cell title="二维码" @click="showQrCode">
            <van-icon name="qr" />
            <van-icon name="arrow" />
          </van-cell>
        </van-cell-group>
<!--        选择头像-->
        <van-action-sheet v-model="showSelectAvatar" title="选择头像" lazy-render>
          <div class="content">
            <van-uploader :before-read="beforeRead" :after-read="afterRead" v-model="imageFile" multiple :max-count="1" />
          </div>
        </van-action-sheet>
<!--        <van-popup closeable-->
<!--                   close-icon="close"-->
<!--                   v-model="showSelectAvatar"-->
<!--                   round position="bottom"-->
<!--                   :style="{ height: '30%' }"-->
<!--                   lazy-render-->
<!--                   close-on-popstate >-->
<!--          <van-uploader :before-read="beforeRead" :after-read="afterRead" v-model="imageFile" multiple :max-count="1" />-->
<!--&lt;!&ndash;          <van-button type="primary" color="#ff7675" class="determineAvatar">确定</van-button>&ndash;&gt;-->
<!--        </van-popup>-->
      </div>
      <div class="out-sign">
        <van-button type="primary" color="#ff7675" size="large" @click="outLogin">退出登录</van-button>
      </div>
    </div>
    <BottomBar></BottomBar>
  </div>
</template>

<script>
import BottomBar from '@/components/BottomBar'
import TopBar from '@/components/TopBar'
import { ImagePreview, Toast } from 'vant'
import store from '@/assets/store'
import Http from '@/api/httpAxios'
import api from '@/api/api'
export default {
  name: 'Oneself',
  components: {
    BottomBar,
    TopBar
  },
  data () {
    return {
      showSelectAvatar: false,
      imageFile: [],
      user: store.state.userData
    }
  },
  computed: {
    username () {
      // console.log(store.getUserAction())
      return store.getUserAction().data.username
    },
    nickname () {
      return store.getUserAction().data.nickname
    },
    image () {
      return 'http://' + store.getUserAction().data.faceImage
      // return require('../assets/images/avatar.jpg')
    }
  },
  methods: {
    imagePreview () {
      ImagePreview({
        images: [
          'http://' + this.user.data.faceImageBig
        ],
        showIndex: false,
        showIndicators: false
      })
    },
    selectAvatar () {
      this.showSelectAvatar = true
      // console.log(this.imageFile)
    },

    determineAvatar () {
      // console.log('**********')
    },
    // 这两个方法是上传图片的生命周期
    beforeRead (file) {
      // console.log(file)
      return true
    },
    async afterRead (file) {
      // console.log(file)
      // 可以设置
      // ImagePreview({
      //   images: [
      //     file.content
      //   ],
      //   showIndex: false,
      //   showIndicators: false
      // })
      this.image = file.content
      // TODO 将图片传至后端
      await Http.post(api.selectAvatar, {
        id: this.user.data.id,
        base64: file.content,
        imageName: file.file.name
      }).then((res) => {
        // console.log(res)
        if (res.data.msg === '上传成功') {
          // 修改全局store的用户变量
          this.user.data = res.data.data
          // console.log(store.state.userData.data)
          Toast.success(res.data.msg)
        } else {
          Toast.fail(res.data.msg)
        }
      })
      return true
    },
    // 跳转到修改昵称的页面
    updateUsername () {
      this.$router.push('updateUsername')
    },
    outLogin () {
      // 清除store全局用户数据
      // store.state.userData = { }
      store.setDataAction({})
      // console.log(store.state.userData)
      this.$router.push({ name: 'Home' })
    },
    // 跳转到二维码页面
    showQrCode () {
      this.$router.push('/qrCode')
    }
  }
}
</script>

<style scoped lang="less">
.oneself {
  .content-div {
    padding-top: 3.3rem;
    display: flex;
    flex-direction: column;
    height: 80vh;
    .info {
      .avatar {
        margin-top: 0 !important;
      }
      .van-cell {
        font-size: 1.3rem;
        color: #555;
        padding: 1rem 0;
        &:active {
          background-color: #ff7675;
          opacity: .3;
        }
        .van-cell__title {
          display: flex;
          align-items: center;
          font-size: 1.3rem;
          padding-left: 1.2rem;
        }

        .van-cell__value {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 1.2rem;
          .text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .van-icon {
            color: #ff7675;
            padding-left: 1.2rem;
          }
        }
      }
    }
    .out-sign {
      flex-grow: 1;
      display: flex;
      align-items: center;
    }
    .van-popup--bottom {
      display: flex;
      align-items: center;
      justify-content: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      .van-button--normal {
        width: 4.4rem;
        height: 2.2rem;
        text-align: center;
        margin-right: 8px;
      }
    }
  }
  .content-div {
    .content {
      height: 10.0rem;
      display: flex;
      align-items: center;
    }
  }
}
</style>
