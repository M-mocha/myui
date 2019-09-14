import Vue from 'vue'
import VueRouter from 'vue-router'
import {docRoutes} from '../../src/route-list.js'
import install from '../../src/components/index'

install(Vue)
Vue.use(VueRouter)

const router = new VueRouter({ mode: 'history', routes: docRoutes })

export default router
