<template>
  <div class="right-message">
    <div class="content">
      <div class="avatar">
        <van-image
          round
          fit="cover"
          width="3.3rem"
          height="3.3rem"
          :src="Image"
        />
      </div>
      <div class="message">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OnTheRightMessage',
  props: ['faceImage', 'id'],
  data () {
    return {
    }
  },
  computed: {
    Image () {
      return 'http://' + this.faceImage
    }
  }
}
</script>

<style scoped lang="less">
.right-message {
  .content {
    margin-top: 0.4rem;
    padding: 0.4rem 0.2rem;
    display: flex;
    flex-direction: row-reverse;
    .message {
      margin-right: 0.6rem;
      margin-top: 0.4rem;
      max-width: 62vw;
      background-color: #ef9f9f;
      border-bottom-right-radius: 1rem;
      border-bottom-left-radius: 1rem;
      border-top-left-radius: 1rem;
      font-family: 幼圆;
      font-size: 1rem;
      text-align: left;
      letter-spacing: 0.1rem;
      padding: 0.5rem 0.5rem;

    }
  }
}
</style>
