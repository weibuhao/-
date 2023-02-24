import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{ path: '/', redirect: '/homepage/home' },
  {
    path: '/homepage',
    component: () => import(/* webpackChunkName: "Homepage" */ '@/components/Homepage/Homepage'),
    redirect: '/homepage/home',
    children: [
      {
        path: '/homepage/home',
        component: () => import(/* webpackChunkName: "home" */ '@/components/Homepage/home'),
        meta: {
          scrollT: 0
        }
      },
      { path: '/homepage/user', component: () => import(/* webpackChunkName: "user" */ '@/components/User/user') }]
  },

  { path: '/login', component: () => import(/* webpackChunkName: "login" */ '@/components/Login/login') },
  { path: '/searchp', component: () => import(/* webpackChunkName: "searchp" */ '@/components/Search/SearchPage') },
  {
    path: '/search_result/:kw',
    component: () => import(/* webpackChunkName: "search_result" */ '@/components/Search/SearchResult'),
    meta: {
      scrollT: 0
    }
  },
  { path: '/details', component: () => import(/* webpackChunkName: "details" */ '@/components/Article/ArticleDetails') },
  { path: '/user_edit', component: () => import(/* webpackChunkName: "user_edit" */ '@/components/User/userEdit') },
  { path: '/chat', component: () => import(/* webpackChunkName: "chat" */ '@/components/Chat/Chat') }
]

const router = new VueRouter({
  routes
})

// 前置守卫
router.beforeEach((to, from, next) => {
  const pathArr = ['/homepage/user', '/user_edit', '/chat']
  if (pathArr.indexOf(to.path) !== -1) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
  if (to.path === '/login') {
    const token = localStorage.getItem('token')
    if (token) {
      next(false)
    } else {
      next()
    }
  }
})

export default router
