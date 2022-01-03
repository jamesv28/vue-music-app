import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authModalShow: false
  },
  getters: {
    getAuthModalShow: (state) => {
      return state.authModalShow
    }
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow
    }
  },
  actions: {
  },
  modules: {
  }
})
