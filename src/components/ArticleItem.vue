<template>
  <!-- 一条文章单元格 -->
  <van-cell v-if="reshow">
    <!-- 标题区域的插槽 -->
    <template #title>
      <div class="title-box">
        <!-- 标题 -->
        <span>{{ Newlist.title }}</span>
        <img class="thumb" v-if="Newlist.cover.type == 1" v-lazy="Newlist.cover.images[0]" />
        <!-- :src="Newlist.cover.images[0]" -->
      </div>
      <div class="thumb-box" v-if="Newlist.cover.type > 1">
        <img class="thumb" v-for="(item, index) in Newlist.cover.images" :key="index"  v-lazy="item" />
      </div>
    </template>
    <!-- label 区域的插槽 -->
    <template #label>
      <div class="label-box">
        <div>
          <span>{{ Newlist.aut_name }}</span>
          <span>{{ Newlist.comm_count }}条评论</span>
          <span>{{ formatData(Newlist.pubdate) }}</span>
        </div>
        <!-- 反馈按钮 -->
        <van-icon name="cross" @click.stop="show = true" v-if="isShow" />
        <van-action-sheet v-model="show" get-container="body" :actions="actions" :cancel-text="buttonText" @select="onSelect" @cancel="cancel" @close="close" />
      </div>
    </template>
  </van-cell>
</template>

<script>
// 兄弟组件
// vant组件
import { Notify } from 'vant'
// 格式化时间的包
import { timeAgo } from '@/utils/day'
// 反馈面板
import { firstActions, secondActions } from '@/api/feedback'
import { reportAPI } from '@/api/index'
export default {
  name: 'ArticleItem',
  props: {
    Newlist: {},
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: false,
      actions: firstActions,
      buttonText: '取消',
      reshow: true,
      token: localStorage.getItem('token')
    }
  },
  methods: {
    async onSelect(actions, item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      if (actions.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.buttonText = '返回'
      } else {
        if (this.token) {
          reportAPI({ artId: this.Newlist.art_id, value: actions.name })
          Notify({ type: 'success', message: '举报成功！' })
          this.show = false
        } else {
          this.show = false
          Notify({ type: 'warning', message: '登录过期或者未登录' })
        }
      }
      if (actions.name === '不感兴趣') {
        if (this.token) {
          Notify({ type: 'success', message: '反馈成功！' })
          this.show = false
          this.reshow = false
        } else {
          this.show = false
          Notify({ type: 'warning', message: '登录过期或者未登录' })
        }
      }
    },
    cancel() {
      if (this.buttonText === '返回') {
        this.show = true
        this.actions = firstActions
        this.buttonText = '取消'
      } else {
        this.show = false
      }
    },
    close() {
      this.actions = firstActions
      this.buttonText = '取消'
    },
    formatData: timeAgo
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;

  &:first-child {
    margin-left: 0;
  }
}

/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>
