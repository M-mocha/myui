import MyHeader from './my-header'
import MyContent from './my-content'
import MyFooter from './my-footer'
import Button from './Button/index.vue'

const install = (Vue) => {
  Vue.component('my-header', MyHeader)
  Vue.component('my-content', MyContent)
  Vue.component('my-footer', MyFooter)
  Vue.component('Button', Button)
}

export default install
