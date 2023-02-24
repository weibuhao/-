<template>
     <div class="user-edit-container">
       <!-- Header 区域 -->
       <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />

       <!-- 用户资料 -->
       <van-cell-group class="action-card">
         <van-cell title="头像" is-link center @click="imagesClickFn">
           <template #default>
             <van-image round class="avatar" :src="Mydata.photo" />
             <!-- file 选择框 -->
           <input
                  type="file"
                  ref="iptFile"
                  v-show="false"
                  accept="image/*"
                  @change="onFileChange"
                  />
           </template>
         </van-cell>
         <van-cell title="名称" is-link :value="Mydata.name" @click="nameFn" />
         <van-cell title="生日" is-link  :value="Mydata.birthday" @click="DateClickFn" />
       </van-cell-group>

       <!-- 弹出框 -->
       <van-dialog v-model="show" title="名称" show-cancel-button :beforeClose="beforeClose">
       <input type="text"  placeholder="请输入名称" v-fofo v-model="Myname" >
       </van-dialog>

       <!-- 时间选择 -->
       <van-popup v-model="popupShow" round position="bottom" :style="{ height: '50%' }" >
       <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="cancelFn"
        @confirm="confirmFn"
        />
       </van-popup>
     </div>
   </template>

<script>
import { UserProfileAPI, UsrtImagesAPI, MyinformationAPI } from '@/api/index'
// 导入时间js
import { formatDate } from '@/utils/day'
// 调用组件库组件
import { Notify } from 'vant'
export default {
  name: 'UserEdit',
  data() {
    return {
      Mydata: {},
      show: false,
      Myname: '',
      popupShow: false,
      minDate: new Date(1922, 0, 1),
      maxDate: new Date(),
      currentDate: new Date()
    }
  },
  async created() {
    const { data: res } = await UserProfileAPI()
    this.Mydata = res.data
  },
  methods: {
    async   onFileChange(e) {
      if (e.target.files.length === 0) return
      const theFd = new FormData()
      theFd.append('photo', e.target.files[0])
      const { data: res } = await UsrtImagesAPI(theFd)
      this.Mydata.photo = res.data.photo
    },
    imagesClickFn() {
      this.$refs.iptFile.click()
    },
    nameFn() {
      this.show = true
      this.Myname = this.Mydata.name
    },
    async beforeClose(action, done) {
      if (action === 'confirm') {
        const reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,7}$/
        if (reg.test(this.Myname) === true) {
          this.Mydata.name = this.Myname
          await MyinformationAPI({ name: this.Myname })
          done()
        } else {
          done(false)
          Notify({ type: 'warning', message: '请输入1~7中英文组合数字' })
        }
      } else {
        done()
      }
    },
    DateClickFn() {
      this.popupShow = true
      this.currentDate = new Date(this.Mydata.birthday)
    },
    cancelFn() {
      this.popupShow = false
    },
    async confirmFn() {
      this.popupShow = false
      await MyinformationAPI({ birthday: formatDate(this.currentDate) })
      this.Mydata.birthday = formatDate(this.currentDate)
    }
  }
}
</script>

   <style lang="less" scoped>
   .user-edit-container {
     padding-top: 46px;
     .avatar {
       width: 50px;
       height: 50px;
     }
   }
   /deep/.van-dialog__content{
     text-align: center;

    input{
      margin: 10px 0;
      border: none;
      outline: none;
      text-align: center;
    }
   }
   </style>
