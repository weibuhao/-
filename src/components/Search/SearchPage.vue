<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <div @click="$router.replace('/homepage/home')">
        <van-icon name="arrow-left" color="white" class="goback" @click="goHome" />
      </div>

      <!-- 搜索组件 -->
      <van-search placeholder="请输入搜索关键词" background="#007BFF" shape="round" v-fofo v-model.trim="kw" @input="inputFn" @search="searchFn" />
    </div>

    <!-- 搜索提示 -->
    <div class="sugg-list" v-if="kw.length !== 0">
      <div class="sugg-item" v-for="(item, index) in proposal" :key="index" v-html="replaceKw(item, kw)" @click="goResult(item)"></div>
    </div>

    <!-- 历史列表 -->
    <div class="search-history" v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon" @click="history = []" />
        </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list">
        <span class="history-item" v-for="(item, index) in history" :key="index" @click="goResult(item)">{{ item }} </span>
      </div>
    </div>
  </div>
</template>

<script>
// 搜索建议API
import { proposalAPI } from '@/api/index'
// vant通知插件
import { Notify } from 'vant'
import bus from '@/utils/EventBus'
export default {
  name: 'SearchPage',
  data() {
    return {
      kw: '', // 搜索关键字
      Navshow: true,
      timer: null,
      proposal: [],
      history: JSON.parse(localStorage.getItem('his')) || [] // 搜索历史
    }
  },
  methods: {
    // 跳转搜索结果函数
    searchResultFn(item) {
      setTimeout(() => {
        this.$router.push(
          {
            path: `/search_result/${item}`
          },
          bus.$emit('cacheName', ''),
          0
        )
      })
    },
    goHome() {
      this.$emit('btnshow', this.Navshow)
    },
    inputFn() {
      clearTimeout(this.timer)
      if (this.kw.length === 0) {
        this.proposal = []
      } else {
        if (this.kw.length === 0) return
        this.timer = setTimeout(async() => {
          const { data: res } = await proposalAPI({ keywords: this.kw })
          if (res.data.options[0] === null || res.data.options.length === 0) {
            this.proposal = []
            this.proposal.push(this.kw)
          } else {
            this.proposal = res.data.options
          }
        }, 300)
      }
    },
    replaceKw(originStr, target) {
      const reg = RegExp(target, 'ig')
      return originStr.replace(reg, `<span style="color:red">${target}</span>`)
    },
    searchFn() {
      if (this.kw.length === 0) return Notify({ type: 'warning', message: '请输入搜索内容' })
      this.searchResultFn(this.kw)
      this.history.push(this.kw)
    },
    goResult(item) {
      this.searchResultFn(item)
      this.history.push(item)
    }
  },
  watch: {
    history: {
      deep: true,
      handler() {
        const theSet = new Set(this.history)
        const arr = Array.from(theSet)
        localStorage.setItem('his', JSON.stringify(arr))
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;

  /*后退按钮*/
  .goback {
    padding-left: 14px;
    font-size: 15px;
  }

  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}

.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .search-icon {
    font-size: 16px;
    line-height: inherit;
  }
}

.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;

  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>
