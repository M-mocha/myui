import MyHeader from './my-header'
import MyContent from './my-content'
import MyFooter from './my-footer'
import Flexbox from './flexbox/flexbox'
import FlexboxItem from './flexbox/flexbox-item'

const install = (Vue) => {
    Vue.component('my-header', MyHeader)
    Vue.component('my-content', MyContent)
    Vue.component('my-footer', MyFooter)
    Vue.component('flexbox', Flexbox)
    Vue.component('flexbox-item', FlexboxItem)
}

export default install
