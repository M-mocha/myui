import Vue from 'vue'
import router from '@/routers'
import APP from './app.vue'
import Components from './components/index'
import 'styles/weui.less'
Vue.use(Components)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(APP)
})
