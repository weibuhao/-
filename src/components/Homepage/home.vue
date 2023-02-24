<template>
  <div class="home-box">
    <!-- 头部 -->
    <div>
      <van-nav-bar title="程序猿头条" fixed>
        <template #right>
          <van-icon name="search" size="5.33333vw" @click="searchRouter" />
        </template>
      </van-nav-bar>
    </div>

    <!-- 头部导航栏 -->
    <div>
      <van-tabs sticky offset-top="12.43vw" animated v-model="channelId" swipeable  @change="channelScrollFn">
        <van-tab v-for="item in TopNav" :key="item.id" :title="item.name" :name="item.id">
          <ArticleList :channelId="channelId"></ArticleList>
        </van-tab>
      </van-tabs>
      <van-icon name="plus" size="3.2vw" class="moreChannels" @click="showPopup"  />
      <van-popup v-model="show" class="channel" :duration="0">
        <ChannelEdit :UserChoice="TopNav" :unselectedChannel="UnselectedList" v-model="channelId" @close="getclose" @addChannel="getAddChannel" @removeChannel="getremove"> </ChannelEdit>
      </van-popup>
    </div>
  </div>
</template>

<script>
// 请求方法
import { getChannelsAPI, getAllChannelsAPI, updateChannelAPI, removeChannelAPI } from '@/api/index'
import ArticleList from '../Article/ArticleList.vue'
import ChannelEdit from './ChannelEdit'
export default {
  name: 'Home',
  data() {
    return {
      channelId: 0, // 频道id
      TopNav: [],
      AllChannelList: [], // 频道所有列表
      show: false,
      hide: false,
      channelScrollObj: {}
    }
  },
  // try+catch来捕获await同步代码的错误
  async created() {
    try {
      const { data: res } = await getChannelsAPI()
      this.TopNav = res.data.channels
    } catch (err) {
      console.log(err)
      alert('网页出了亿点点小故障    ' + '( ' + '0 ﾛ 0' + ' )!!!')
    }

    const { data: res2 } = await getAllChannelsAPI()
    this.AllChannelList = res2.data.channels
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  methods: {
    showPopup() {
      this.show = true
    },
    getclose(value) {
      this.show = value
    },
    async getAddChannel(value) {
      this.TopNav.push(value)
      await updateChannelAPI({ channels: this.TopNav })
    },
    async getremove(value) {
      const index = this.TopNav.findIndex((item) => item.id === value.id)
      this.TopNav.splice(index, 1)
      await removeChannelAPI({ channelId: value.id })
    },
    searchRouter() {
      this.$router.push('/searchp')
      this.$emit('onSearch', this.hide)
    },
    scrollFn() {
      this.$route.meta.scrollT = document.documentElement.scrollTop
      this.channelScrollObj[this.channelId] = document.documentElement.scrollTop
    },
    channelScrollFn() {
      this.$nextTick(() => {
        document.documentElement.scrollTop = this.channelScrollObj[this.channelId]
      })
    }
  },
  computed: {
    UnselectedList() {
      const newArr = this.AllChannelList.filter((bigObj) => {
        const index = this.TopNav.findIndex((smallObj) => {
          return smallObj.id === bigObj.id
        })
        if (index > -1) {
          return false
        } else {
          return true
        }
      })
      return newArr
    }
  },
  activated() {
    window.addEventListener('scroll', this.scrollFn)
    document.documentElement.scrollTop = this.$route.meta.scrollT
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollFn)
  }
}
</script>

<style scoped lang="less">
.home-box {
  padding: 45px 0 0;

  h1 {
    color: skyblue;
  }

  /deep/ .van-tabs__wrap {
    padding-right: 30px;
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
