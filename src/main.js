import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import directiveObj from '@/utils/diretive'

// 导入vant组件库
import Vant, { Lazyload } from 'vant'

// 导入组件库样式
import 'vant/lib/index.less'

import 'highlight.js/styles/default.css'

// 把组件库安装在vue中
Vue.use(Vant)
Vue.use(directiveObj)
Vue.use(Lazyload, {
  error: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01ceca569cfbe132f875520f40c3c8.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655800583&t=61eb535cd126d9b5f801ad2f8796fdff'
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
