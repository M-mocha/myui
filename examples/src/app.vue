<template>
  <flexbox class="myui_doc_root" direction='column'>
    <Header />
    <flexbox-item class="myui_doc_body">
      <Sidebar />
      <div class="myui_doc_markdown">
        <router-view></router-view>
      </div>
      <div class="myui_doc_iphone">
        <div class="myui_doc_iphone_iframe">
          <iframe
            :src="currentUrl"
            frameborder="0"
            width="100%"
            height="100%"
          ></iframe>
          <div class="example-iphone-home"></div>
        </div>
      </div>
    </flexbox-item>
  </flexbox>
</template>
<script>
import bus from '@/utils/bus'
import Header from './components/header'
import Sidebar from './components/sidebar'
import { constants } from 'crypto';
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
      return `${location.protocol}//${location.host}/${path}demo.html#${bus.$data.selectedView.demoPath || '/'}`
    },
    demoPath() {
      return bus.$data.selectedView.demoPath;
    }
  }
}
</script>

<style lang="less">
@import './styles/index.less';
@import '../../node_modules/highlight.js/styles/github.css';

@iphoneWidth: 308px;
@iphoneHeight: @iphoneWidth / 730 * 1584;
@iphoneTop: 10.5%;
@iphoneSide: 4.2%;
@iphoneBottom: 12%;
.myui_doc{
  &_body {
    display: flex;
    .myui_doc_markdown {
      flex: 1;
      padding: 0px @iphoneWidth + 40px @vSpacingLg @hSpacingLg;
      overflow-y: scroll;
      & > div {
        margin: 0 auto;
      }
    }
  }
  &_iphone {
    position: fixed;
    right: 0px;
    top: 90px;
    width: @iphoneWidth + 40px;
    height: @iphoneHeight + 10px;
    &_iframe {
      background: url('../../static/images/phone.png') no-repeat center;
      background-size: cover;
      width: @iphoneWidth;
      height: @iphoneHeight;
      margin: 0 auto;
      position: relative;
      iframe {
        position: absolute;
        width: 100% - @iphoneSide * 2;
        height: 100% - @iphoneTop - @iphoneBottom;
        top: @iphoneTop;
        bottom: @iphoneBottom;
        left: @iphoneSide;
        right: @iphoneSide;
        background-color: @fillBody;
      }
    }
  }
}
</style>
