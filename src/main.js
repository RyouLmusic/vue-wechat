import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$plusExtends = fn => {
  if (window.plus) {
    setTimeout(fn, 0)
  } else {
    document.addEventListener('plusready', fn, false)
  }
}
