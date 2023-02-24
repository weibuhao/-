import theAxios from 'axios'
import { getToken, removeToken } from '@/utils/token'// setToken,
// import { getNewTokenAPI } from '@/api/index'
import router from '@/router'
import { Notify } from 'vant'
const axios = theAxios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 20000// 请求时间 超过20秒则请求失败
})

export default axios

// axios({
//   url:'请求地址'
//   method:'请求类型'
//   params:{传参}
//   data:{请求体}
//   headers:{请求头}
// })
// 添加请求拦截器
axios.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么, 如果vuex里有token携带在请求头中
  if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
    // 发起请求之前, 把token携带在请求头上(表明自己身份)
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function(response) { // 当状态码为2xx/3xx开头的进这里
  // 对响应数据做点什么
  return response
}, async function(error) { // 响应状态码4xx/5xx进这里
  // 对响应错误做点什么
  console.dir(error)
  if (error.response.status === 401) { // 身份过期
    removeToken()
    router.replace(`/login?path=${router.currentRoute.fullPath}`)
    // token续签方式1:  去登录页重新登录, token无用, 清掉-确保路由守卫if进不去
    // Notify({ type: 'danger', message: '登录失效或未登录' })
    //   const { data: res } = await getNewTokenAPI()
    //   setToken(res.data.token)
    //   error.config.headers.Authorization = `Bearer ${res.data.token}`
    //   return axios(error.config)
    // } else if (error.response.status === 500 && error.config.url === '/v1_0/authorizations' && error.config.method === 'put') {
    //   removeToken()
    //   localStorage.removeItem('refresh_token')
    //   router.replace('/login')
    Notify({ type: 'danger', message: '登录失效或未登录' })
  }
  return Promise.reject(error)
})
