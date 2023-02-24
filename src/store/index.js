import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userPhoto: 'https://img2.baidu.com/it/u=1876275549,739373746&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500'
  },
  getters: {
  },
  mutations: {
    SET_USERPHOTO(state, value) {
      state.userPhoto = value
    }
  },
  actions: {
  },
  modules: {
  }
})
