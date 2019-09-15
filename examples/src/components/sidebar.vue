<template>
  <div class="myui_doc_nav_wrap">
    <div class="myui_doc_nav_group" v-for="group in navInfoCategory" :key="group.name">
      <h3>{{group.name}}</h3>
      <div v-for="(routes, name) in group.categories" :key="name">
        <div class="myui_doc_nav_category" v-if="name !== 'def'">{{name}}</div>
        <div>
          <div class="myui_doc_nav_item" v-for="r in routes" :key="r.path">
            <span  v-on:click="onLinkTo(r)">
              <router-link :to="r.path">{{r.name}}</router-link>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bus from '@/utils/bus'
import {sidebarNavInfos, docNavInfos} from '@/route-list.js'
const navInfoCategory  = sidebarNavInfos.map(item => ({
  ...item, 
  categories: item.routes.reduce((total, cur) => {
    if(!cur.category) {
      total.def.push(cur)
    } else {
      total[cur.category] ? total[cur.category].push(cur) : total[cur.category] = [cur]
    }
    return  total;
  }, {def: []})})
)
export default {
  data() {
    return { 
      navInfoCategory
    }
  },
  computed: {
    curPath() {
      return this.$route.path
    }
  },
  methods: {
    onLinkTo(r) {
      bus.update('selectedView', r)
    }
  },
  watch: {
    curPath(val) {
      docNavInfos.forEach(item => {
        if (item.path === val) {
          bus.update('selectedView', item);
          return true;
        }
      })
    }
  }
}
</script>
<style lang="less">
@import '../styles/variables.less';
.myui_doc_nav {
  &_wrap {
    width: 220px;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    background: @fillBase;
    border-right: 1px solid @borderColorShallow;
    padding: @vSpacingSm 0px @vSpacingLg 0px;
    box-sizing: border-box;
    ::-webkit-scrollbar {
      width: 5px;
      height: 10px;
    }
    ::-webkit-scrollbar-track {
      background-color: #fff;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  &_group {
    h3 {
      font-size: 16px;
      color: @textColorListTitle;
      line-height: 24px;
      margin: @vSpacingLg 0px @vSpacingSm @hSpacingMd;
    }
  }
  &_item {
    margin: @vSpacingSm 0 @vSpacingSm @hSpacingLg;
    a {
      font-size: 14px;
      color: @textColorArticle;
      text-decoration: none;
      line-height: 22px;
    }
    .router-link-exact-active {
      .textFocusColor(@textColorArticle);
      color: @textFocusColor;
      font-size: 15px;
      font-weight: 600;
    }
  }
  &_category {
    font-size: 10px;
    margin: @vSpacingXsm 0 @vSpacingXsm @hSpacingLg - 4px;
    color: #aaa;
  }
}
</style>
