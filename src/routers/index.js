import Vue from 'vue'
import VueRouter from 'vue-router'
import {appRoutes} from '../route-list.js'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: resolve => require(['pages/index'], resolve) },
    { path: '*', component: resolve => require(['pages/index'], resolve) },
    ...appRoutes
]

const router = new VueRouter({ routes })

export default router
