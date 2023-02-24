<template>
  <div>
    <keep-alive :exclude="`SearchPage,${cacheName},ArticleDetails,UserEdit`"><router-view></router-view></keep-alive>
  </div>
</template>
<script>
import bus from '@/utils/EventBus'
export default {
  data() {
    return {
      cacheName: ''
    }
  },
  created() {
    bus.$on('share', val => {
      this.cacheName = val
    })
    bus.$on('cacheName', val => {
      this.cacheName = val
    })
  }
  // watch: {
  //   cacheName() {
  //     this.cacheName = 'SearchResult'
  //   }
  // }
}
</script>

<style>

</style>
