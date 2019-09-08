import Vue from 'vue'
import router from './routers'
// import * as Components from 'components'
import App from './app.vue'

// Vue.use(Components)
// Vue.use(Router)
/* eslint-disable */
new Vue({
    router,
    el: '#app',
    render: h => h(App)
})