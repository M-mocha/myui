<template>
  <header>
    <flexbox align="center" justify='end'>
      <h2>
        <router-link to="/">MYUI</router-link>
      </h2>
      <flexbox-item class="myui_doc_header_navigator">
        <div class="myui_doc_header_navigator_item">
          <a target="_blank" href="https://github.com/M-mocha/myui">GitHub</a>
        </div>
      </flexbox-item>
    </flexbox>
  </header>
</template>
<style lang="less" scope>
@import '../styles/variables.less';
header {
  background: @brandPrimary;
  box-shadow: 0px 0px 6px -0px #666 ;
  a {
    text-decoration: none;
    color: @textColorBaseInverse;
  }
  h2 {
    margin: @vSpacingSm @hSpacingXlg;
    padding: 0px;
    a {
      font-size: @fontSizeXlg;
      font-weight: normal;
      letter-spacing: 2px;
    }
  }
  .myui_doc_header_navigator {
    padding-right: @hSpacingXlg;
    &_item {
      float: right;
      font-size: @fontSizeSm;
      font-weight: 600;
    }
  }
}
</style>
