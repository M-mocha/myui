import Vue from 'vue'
import VueRouter from 'vue-router'
import {appRoutes} from '../route-list.js'

Vue.use(VueRouter)

const routes = [
    ...appRoutes
]

const router = new VueRouter({ routes })

export default router
