<template>
  <header>
    <div class="header-inner">
      <div align="left" class="flex">
        <div class="flex-item">
          <!-- <img :src="'./static/images/logo.png'" alt=""> -->
          <h2>MUI1</h2>
        </div>
      </div>
    </div>
  </header>
</template>
<style lang="scss" scope>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #eee;
  background: linear-gradient(90deg, #20a0ff 10%, #9dd5ff 90%);
  z-index: 101;
  h2 {
    font-size: 32px;
    margin-left: 20px;
    color: #fff;
    font-weight: normal;
  }
  img,
  h2 {
    display: inline-block;
    vertical-align: middle;
    margin: 0;
  }
  img {
    width: 110px;
    height: 38px;
    margin-right: 20px;
  }
  .header-inner {
    padding: 10px 10px 10px 40px;
  }
}
</style>
