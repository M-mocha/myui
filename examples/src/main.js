import Vue from 'vue'
import router from './routers'
import App from './app.vue'

new Vue({
    router,
    el: '#app',
    render: h => h(App)
})