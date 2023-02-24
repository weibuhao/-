 <template>
     <div>
       <!-- 评论列表 -->
       <div class="cmt-list">
         <!-- 评论的 Item 项 -->
         <div class="cmt-item"
          v-for="item in comment"
          :key="item.com_id"
          >
           <!-- 头部区域 -->
           <div class="cmt-header">
             <!-- 头部左侧 -->
             <div class="cmt-header-left">
               <img :src="item.aut_photo" alt="" class="avatar">
               <span class="uname">{{item.aut_name}}</span>
             </div>
             <!-- 头部右侧 -->
             <div class="cmt-header-right">
               <van-icon name="like" size="16" color="red" v-if="item.is_liking" @click='likinFn(true,item)' />
               <van-icon name="like-o" size="16" color="gray" v-else @click='likinFn(false,item)'/>
             </div>
           </div>
           <!-- 主体区域 -->
           <div class="cmt-body">
             {{item.content}}
           </div>
           <!-- 尾部区域 -->
           <div class="cmt-footer">{{formatData(item.pubdate)}}</div>
         </div>
       </div>
     </div>
   </template>

<script>
import { CommentLikAPI, NOCommentLikAPI } from '@/api/index'
import { timeAgo } from '@/utils/day'
export default {
  props: {
    comment: []
  },
  data() {
    return {
      newComment: this.comment
    }
  },
  methods: {
    async likinFn(bool, item) {
      if (bool === true) {
        item.is_liking = false
        await NOCommentLikAPI({ target: item.com_id })
      } else {
        item.is_liking = true
        await CommentLikAPI({ target: item.com_id })
      }
    },
    formatData: timeAgo
  }

}
</script>

   <style scoped lang="less">
   .cmt-list {
     padding: 10px;
     .cmt-item {
       padding: 15px 0;
       + .cmt-item {
         border-top: 1px solid #f8f8f8;
       }
       .cmt-header {
         display: flex;
         align-items: center;
         justify-content: space-between;
         .cmt-header-left {
           display: flex;
           align-items: center;
           .avatar {
             width: 40px;
             height: 40px;
             background-color: #f8f8f8;
             border-radius: 50%;
             margin-right: 15px;
           }
           .uname {
             font-size: 12px;
           }
         }
       }
       .cmt-body {
         font-size: 14px;
         line-height: 28px;
         text-indent: 2em;
         margin-top: 6px;
         word-break: break-all;
       }
       .cmt-footer {
         font-size: 12px;
         color: gray;
         margin-top: 10px;
       }
     }
   }
   </style>
