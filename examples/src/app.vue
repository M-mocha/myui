<template>
  <div class="example-root">
    <Header />
    <div class="example-body">
      <div class="example-aside">
        <Sidebar />
      </div>
      <div class="markdown-body">
        <router-view></router-view>
      </div>
      <div class="example-iphone" :style="iphoneXImg">
        <div class="example-iphone-iframe">
          <iframe
            :src="currentUrl"
            frameborder="0"
            width="100%"
            height="100%"
          ></iframe>
          <div class="example-iphone-home"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from './components/header'
import Sidebar from './components/sidebar'
export default {
  components: {
    Header,
    Sidebar
  },
  data () {
    return {
      iphoneXImg: {
        background: `url(${require('../../static/images/phone.png')}) no-repeat center 0`,
        backgroundSize: '100%'
      }
    }
  },
  computed: {
    currentUrl () {
      let path = ''
      if (/docs/.test(location.href)) {
        path = 'docs/'
      }
      console.log(`${location.protocol}//${location.host}/${path}demo.html#${this.$route.path}`)
      return `${location.protocol}//${location.host}/${path}demo.html#${this.$route.path}`
    }
  },
  methods: {
    // toDemo () {
    //   let path = this.$route.path === '/' ? '' : '#/demos' + this.$route.path
    //   if (!location.origin) {
    //     location.origin = location.protocol + '//' + location.host
    //   }
    //   console.log(location.origin + location.pathname + 'demo.html' + path, 'demos path')
    //   return location.origin + location.pathname + 'demo.html' + path
    // }
  }
}
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
.example {
  &-body {
    padding-top: 56px;
    .example-aside {
      width: 220px;
      overflow: auto;
      position: fixed;
      height: calc(100% - 55px);
      &::-webkit-scrollbar {
        width: 5px;
        height: 10px;
      }
      &::-webkit-scrollbar-track {
        background-color: #fff;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
    .markdown-body {
      padding: 10px 400px 50px 250px;
      h4 {
        margin-top: 30px;
      }
    }
  }
  &-iphone {
    position: fixed;
    width: 330px;
    height: 725px;
    top: 70px;
    right: 40px;
    z-index: 1;
    &-iframe {
      position: absolute;
      top: 80px;
      left: 21px;
      right: 23px;
      bottom: 104px;
      overflow: hidden;
      border: 1px solid #edf0f4;
      border-top: none;
      background-color: #edf0f4;
    }
  }
  &-root {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #666;
    font-size: 14px;
    .markdown-body {
      h2 {
        margin: 20px 0;
      }
      pre {
        border: 1px solid #eaeefb;
        background-color: #fafafa;
      }
      table {
        width: 100%;
        text-align: left;
        td,
        th {
          border-bottom: 1px solid #f5f5f5;
          padding: 8px;
        }
      }
    }
  }
}
</style>
