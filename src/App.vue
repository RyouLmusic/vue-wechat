<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import store from '@/assets/store'
import socket from '@/api/socket'

export default {
  created () {
    if (sessionStorage.getItem('store')) {
      const objAfter = JSON.parse(sessionStorage.getItem('store'))
      store.replaceStore(objAfter)
      // console.log('objAfter')
      // console.log(objAfter)
      // console.log('store')
      // console.log(store)
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(store.state))
    })
  },
  mounted () {
    if (JSON.stringify(store.state.userData) !== '{}' && typeof store.state.userData !== 'undefined') {
      socket.reConnect()
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  padding: 0;
  margin: 0;
}
body {
  width: 100vw;
  height: 100vh;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
