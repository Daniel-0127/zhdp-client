import { createStore } from 'vuex'

export default createStore({
  state: {
    img_path: 'http://localhost:10086/IMG',
    user: '',
    token: '',
    search: ''
  },
  getters: {
  },
  mutations: {
    // 定义mutations，用于修改状态(同步)
    updateUser(state, user1) {
      state.user = user1
    },
    updateToken(state, token1) {
      state.token = token1
      sessionStorage.token = token1
    },
    updateSearch(state, search) {
      state.search = search
    }
  },
  actions: {
  },
  modules: {
  }
})
