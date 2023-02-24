<template>
  <div>
    <div class="search-title"><van-nav-bar title="搜索结果" left-arrow @click-left="onClickLeft" fixed /></div>
    <van-loading size="24px" vertical v-if="show" :color="'#4792e6'">查找中...</van-loading>
    <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了"  :offset="0" @load="onLoad">
      <ArticleItem v-for="(item, index) in articeList"
      :key="index" :Newlist="item"
      :isShow="false"
      @click.native="itemClickFn(item.art_id)"
      ></ArticleItem>
    </van-list>
    <div v-show="searchNull">
      <van-empty class="custom-image" image="https://img01.yzcdn.cn/vant/custom-empty-image.png" description="未找到相关内容" />
    </div>
  </div>
</template>

<script>
// 搜索文章的API
import { SearchArticleAPI } from '@/api/index'
// 文章列表
import ArticleItem from '@/components/ArticleItem.vue'
import bus from '@/utils/EventBus'
export default {
  name: 'SearchResult',
  data() {
    return {
      page: 1,
      articeList: [],
      loading: false,
      finished: false,
      searchNull: false,
      show: true
    }
  },
  methods: {
    itemClickFn(id) {
      this.$router.push({
        path: `/details?art_id=${id}`
      })
    },
    onClickLeft() {
      this.$router.back()
      bus.$emit('share', 'SearchResult')
    },
    async onLoad() {
      this.page++
      const { data: res } = await SearchArticleAPI({
        page: this.page,
        q: this.$route.params.kw
      })
      if (res.data.results === null || res.data.results.length === 0) {
        this.finished = true
      }
      this.articeList = [...this.articeList, ...res.data.results]
      this.loading = false
    }
  },
  async created() {
    const { data: res } = await SearchArticleAPI({
      page: this.page,
      q: this.$route.params.kw
    })
    this.show = false
    if (res.data.results === null || res.data.results.length === 0) {
      this.searchNull = true
    }
    this.articeList = res.data.results
  },
  components: {
    ArticleItem
  }
}
</script>

<style lang="less" scoped>
.search-title {
  padding: 46px 0 0 0;
}
.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
</style>
