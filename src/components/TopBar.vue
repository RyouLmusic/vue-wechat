<template>
  <div class="topBar">
      <div class="container">
        <p>{{msg}}</p>
        <van-icon name="more-o" @click="moreAction" />
      </div>
    <div class="bottom">
      <van-action-sheet
        v-model="showMoreAction"
        :actions="actions"
        cancel-text="取消"
        close-on-click-action
        close-on-popstate
        lazy-render
        @select="selectOptions"
        @cancel="onCancel"
      />
    </div>
<!--    <hr>-->
  </div>
</template>

<script>
// import { Toast } from 'vant'

export default {
  name: 'TopBar',
  props: ['msg'],
  data () {
    return {
      showMoreAction: false,
      actions: [{ name: '发起群聊' }, { name: '添加好友' }, { name: '扫一扫', disabled: true }] // disabled: 'true'
    }
  },
  methods: {
    moreAction () {
      this.showMoreAction = true
    },
    onCancel () {
      // Toast('取消')
    },
    // 底部选项卡选择其中一个选项的时候，进行的操作 其中各自的 发起群聊：0 添加好友：1 扫一扫：2
    selectOptions (action, index) {
      // console.log(index)
      // console.log(action)
      switch (index) {
        case 0:
          this.groupChat()
          break
        case 1:
          this.$router.push('addFriend')
      }
    },
    groupChat () {
    }
  }
}
</script>

<style scoped lang="less">
.topBar {
  position: fixed;
  top: 0;
  z-index: 10;
  background-color: white;
  border-bottom: #eee 1px solid;
  .container {
    width: 100vw;
    height: 3.3rem;
    //background-color: #ef8f8e;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      color: #ff7675;
      font-size: 1.3rem;
      margin-left: 20px;
    }
    .van-icon {
      margin-right: 20px;
      font-size: 1.3rem;
      color: #ff7675;
    }
  }
}
</style>
