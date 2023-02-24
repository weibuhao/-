<template>
  <div class="app-container" >
   <keep-alive ><router-view></router-view></keep-alive>
    <div v-if="show" >
      <van-tabbar route>
        <van-tabbar-item icon="home-o" to="/homepage/home">首页</van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="/homepage/user">我的</van-tabbar-item>
      </van-tabbar>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Homepage',
  data() {
    return {
      show: true,
      deShow: false,
      artID: 0
    }
  }
}
</script>

<style lang="less" scoped>
.app-container {
  padding: 0 0 50px;
  .wrapper {
    display: flex;
    height: 100%;
  }

  .block {
    width: 101vw;
    height: 101vh;
    background-color: #fff;
  }
   // 设置小图标的样式
  .moreChannels {
    position: fixed;
    top: 62px;
    right: 8px;
    z-index: 999;
  }

  .van-popup--center {
    width: 100vw;
    height: 100vh;
  }

}

</style>
