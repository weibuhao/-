<template>
  <div class="artice-derail">
    <!-- Header 区域 -->
    <div class="head"><van-nav-bar title="文章详情" left-arrow @click-left="closeFn" fixed  /></div>
   <van-skeleton title avatar :row="6" :title-width="'50%'" v-if="loadShow"  />
    <!-- 文章信息区域 -->
    <div class="article-container" v-else>
      <!-- 文章标题 -->
      <h1 class="art-title">{{ArticleList.title}}</h1>

      <!-- 用户信息 -->
      <van-cell center :title="ArticleList.aut_name" :label="formatData(ArticleList.pubdate)">
        <template #icon>

          <img  v-lazy="ArticleList.aut_photo" alt="" class="avatar" />
          <!-- :src="ArticleList.aut_photo" -->
        </template>
        <template #default>
          <div>
            <van-button type="info" size="mini" v-if="ArticleList.is_followed"  @click="followFn(true)">已关注</van-button>
            <van-button icon="plus" type="info" size="mini" plain v-else  @click="followFn(false)" >关注</van-button>
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content"  v-html="ArticleList.content"></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <div class="like-box">
        <van-button  icon="good-job" type="danger" size="small" v-if="ArticleList.attitude===1" @click="likinFn(true)">已点赞</van-button>
        <van-button v-else icon="good-job-o" type="danger" plain size="small" @click="likinFn(false)">点赞</van-button>
      </div>
    </div>
     <!-- 文章评论 -->

     <div>
       <Comment :comment="commentList" @click.native="IsHideFn"></Comment>
     </div>
     <div class="cmt-list" :class="{'art-cmt-container-1':IsShowCom,'art-cmt-container-2':!IsShowCom}"></div>

     <van-list
     v-model="loading"
     :finished="finished"
     :immediate-check="false"
     @load="onLoad"
     >
     <!-- 发表评论 -->
     <div><div class="add-cmt-box van-hairline--top" v-if="IsShowCom&&loadShow==false" >
       <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
       <div class="ipt-cmt-div"  @click="IsShowFn">发表评论</div>
       <div class="icon-box">
           <van-badge   :content="commentList.length=== 0? '': commentList.length ">
               <van-icon name="comment-o" size="5.3333334vw"  @click="animation" />
           </van-badge>
           <van-icon name="star-o" size="5.3333334vw" />
           <van-icon name="share-o" size="5.3333334vw" />
       </div>
   </div>

   <!-- 底部添加评论区域 - 2 -->
   <div class="cmt-box van-hairline--top" v-else-if="IsShowCom===false&&loadShow==false" >
       <textarea placeholder="友善评论、理性发言、阳光心灵"
       v-model.trim="comment"
       v-fofo @blur="IsHideFn" ></textarea>
      <div  @click="releaseFn"> <van-button type="default" :disabled="comment.length===0?true:false" >发布</van-button></div>
   </div></div>
  </van-list>
  </div>
</template>

<script>
import Comment from './Comment.vue'
import { ArticleDetailsAPI, FollowUserAPI, NOfollowUserAPI, LikeArticle, NolikeArticle, CommentsListAPI, CommentSendAPI } from '@/api/index'
import { timeAgo } from '@/utils/day'
export default {
  name: 'ArticleDetails',
  props: {
    ArtId: Number
  },
  data() {
    return {
      newartID: 0,
      ArticleList: {},
      commentList: [],
      IsShowCom: true,
      comment: '',
      loading: false, // 评论
      finished: false,
      lastId: null,
      loadShow: true
    }
  },
  methods: {
    closeFn() {
      this.$router.back()
      this.$emit('closefn', false)
    },
    async  ArticleDetailsFn() {
      const { data: res } = await ArticleDetailsAPI({
        art_id: this.$route.query.art_id
      })
      this.ArticleList = res.data
      this.loadShow = false
    },
    async followFn(bool) {
      if (bool) {
        this.ArticleList.is_followed = false
        await NOfollowUserAPI({ userID: this.ArticleList.aut_id })
      } else {
        this.ArticleList.is_followed = true
        await FollowUserAPI({ userID: this.ArticleList.aut_id })
      }
    },
    async  likinFn(bool) {
      if (bool) {
        this.ArticleList.attitude = 0
        await NolikeArticle({ artID: this.ArticleList.art_id })
      } else {
        this.ArticleList.attitude = 1
        await LikeArticle({ artID: this.ArticleList.art_id })
      }
    },
    async commentsFn() {
      const { data: res } = await CommentsListAPI({
        id: this.$route.query.art_id
      })
      if (res.data.results.length === 0) {
        this.finished = true
      }
      this.commentList = res.data.results
      this.lastId = res.data.last_id
    },
    IsShowFn() {
      this.IsShowCom = false
    },
    IsHideFn() {
      setTimeout(() => {
        this.IsShowCom = true
        this.comment = ''
      }, 0)
    },
    animation() {
      document.querySelector('.like-box').scrollIntoView({ behavior: 'smooth' })
    },

    async onLoad() {
      if (this.commentList === 0) return
      const { data: res } = await CommentsListAPI({
        id: this.$route.query.art_id,
        offset: this.lastId
      })
      this.commentList = [...this.commentList, ...res.data.results]
      this.lastId = res.data.last_id
      if (res.data.last_id === null) {
        this.finished = true
      }
      this.loading = false
    },
    async releaseFn() {
      const { data: res } = await CommentSendAPI({ id: this.$route.query.art_id, content: this.comment })
      this.animation()
      this.commentList.unshift(res.data.new_obj)
    },
    formatData: timeAgo
  },
  created() {
    this.ArticleDetailsFn()
    this.commentsFn()
  },
  components: {
    Comment
  }

}
</script>

<style scoped lang="less">
.van-skeleton{
  margin: 20px 0 0;
}
.artice-derail{
  padding: 46px 0 0;
  position: relative;
}
.article-container {
  padding: 10px;

}

.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;

  /deep/ img {
    width: 100%;
  }

  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;

  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}

.head{
  position:sticky;
  z-index: 999999999;
  top: 0;
  left: 0;
  right: 0;
}

.art-cmt-container-1 {
     padding-bottom: 20px;
   }
   .art-cmt-container-2 {
     padding-bottom: 80px;
   }

   // 发布评论的盒子 - 1
   .add-cmt-box {
     position: fixed;
     z-index: 99999;
     bottom: -2px;
     left: 0;
     width: 100%;
     box-sizing: border-box;
     background-color: white;
     display: flex;
     justify-content: space-between;
     align-items: center;
     height: 46px;
     line-height: 46px;
     padding-left: 10px;
     .ipt-cmt-div {
       flex: 1;
       border: 1px solid #efefef;
       border-radius: 15px;
       height: 30px;
       font-size: 12px;
       line-height: 30px;
       padding-left: 15px;
       margin-left: 10px;
       background-color: #f8f8f8;
     }
     .icon-box {
       width: 40%;
       display: flex;
       justify-content: space-evenly;
       line-height: 0;
     }
   }

   .child {
     width: 20px;
     height: 20px;
     background: #f2f3f5;
   }

   // 发布评论的盒子 - 2
   .cmt-box {
     position: fixed;
     bottom: 0;
     left: 0;
     width: 100%;
     height: 80px;
     display: flex;
     justify-content: space-between;
     align-items: center;
     font-size: 12px;
     padding-left: 10px;
     box-sizing: border-box;
     background-color: white;
     textarea {
       flex: 1;
       height: 66%;
       border: 1px solid #efefef;
       background-color: #f8f8f8;
       resize: none;
       border-radius: 6px;
       padding: 5px;
     }
     .van-button {
       height: 100%;
       border: none;
     }
   }
</style>
