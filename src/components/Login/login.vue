<template>
  <div class="login-box">
    <van-nav-bar title="程序猿头条--登录" left-arrow @click-left="$router.replace('/homepage/home')" fixed />
    <van-form @submit="onSubmit">
  <van-field
    v-model="user.mobile"
    required
    name="mobile"
    label="手机号码："
    placeholder="请输入手机号码"
    :rules="[{ required: true ,message:'手机号码格式错误',pattern:/^1[3|4|5|6|7|8|9]\d{9}$/}]"
  />
  <van-field
    v-model="user.code"
    required
    type="password"
    name="code"
    label="密码："
    placeholder="请输入6位数密码"
    :rules="[{ required:true , message:'' , pattern:/^\d{6}$/}]"
  />
  <div style="margin: 16px;">
    <van-button round block :disabled="isLoading" :loading="isLoading" type="info" native-type="submit">登录</van-button>
  </div>
</van-form>
  </div>
</template>

<script>
import { loginAPI } from '@/api/index'
// token方法
import { setToken } from '@/utils/token'
// vant组件库
import { Notify } from 'vant'

export default {
  name: 'Login',
  data() {
    return {
      user: {
        mobile: '19910230243', // 手机号码
        code: '246810'// 密码
      },
      isLoading: false
    }
  },
  methods: {
    async onSubmit() {
      this.isLoading = true
      try {
        const { data: res } = await loginAPI(this.user)
        setToken(res.data.token)
        localStorage.setItem('refresh_token', res.data.refresh_token)

        Notify({ type: 'success', message: '登录成功' })
        this.$router.replace({
          path: this.$route.query.path || '/homepage/user'
        })
      } catch (err) {
        console.log(err)
        Notify({ type: 'danger', message: '密码错误' })
      }
      this.isLoading = false
    }
  }
}
</script>

<style>
    .login-box{
      padding: 46px 0 0;
    }
</style>
