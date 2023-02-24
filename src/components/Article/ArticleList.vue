<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" success-text="刷新成功">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false" offset="0">
        <!-- 文章列表 -->
        <ArticleItem v-for="(item, index) in list" :key="index" :Newlist="item" @click.native="itemClickFn(item.art_id)"></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Journalism } from '@/api/index'
import ArticleItem from '../ArticleItem.vue'
export default {
  props: {
    channelId: Number,
    NewonLoad: Function
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      theTime: new Date().getTime,
      refreshing: false
    }
  },
  components: {
    ArticleItem
  },
  async created() {
    try {
      const { data: res } = await Journalism({ channel_id: this.channelId, timestamp: this.theTime })
      this.list = res.data.results
      this.theTime = res.data.pre_timestamp
    } catch (err) {
      console.log(err)
      alert('网页出了亿点点小故障    ' + '( ' + '0 ﾛ 0' + ' )!!!')
    }
  },
  methods: {
    itemClickFn(id) {
      this.$router.push({
        path: `/details?art_id=${id}`
      })
    },
    async onLoad() {
      const { data: res } = await Journalism({ channel_id: this.channelId, timestamp: this.theTime })
      if (res.data.results.length === 0 || res.data.pre_timestamp === null) {
        this.finished = true
        return
      }
      this.list = [...this.list, ...res.data.results]
      this.theTime = res.data.pre_timestamp
      this.loading = false
    },
    async onRefresh() {
      const { data: res } = await Journalism({ channel_id: this.channelId, timestamp: this.theTime })
      this.list = []
      this.list = res.data.results
      this.theTime = res.data.pre_timestamp
      this.refreshing = false
    }
  }
}
</script>
