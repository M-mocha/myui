<template>
<div class="comp-nav">
   <group title="Introduction">
     <item view="/">About</item>
   </group>
    <group title="Components">
      <item v-for="route in navRoute" :key="route.id" :view="route">
        {{route}}
      </item>
    </group>
  </div>
</template>
<script>
import bus from '@/utils/bus'
import item from './item'
import routeList from '@/route-list.js'
import group from './group'
export default {
  data () {
    return {
      navRoute: routeList
    }
  },
  mounted () {
    console.log(routeList)
  },
  filters: {
    transName (route) {
      if (route === 'index') {
        return '首页'
      } else {
        return route
      }
    }
  },
  computed: {
    view () {
      return bus.$data.selectedView
    }
  },
  watch: {
    view (val) {
      this.$router.push(val)
    }
  },
  components: {
    item,
    group
  }
}
</script>
<style lang="less">
.comp-nav {
  height: 100%;
  overflow: scroll;
  background: #f3f3f3;
  &-wrapper {
    background-color: inherit;
    &-item {
      height: 36px;
      line-height: 36px;
    }
  }
}
</style>
