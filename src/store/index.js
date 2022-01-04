import Vuex from 'vuex'

export default Vuex.createStore({
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
});
