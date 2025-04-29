import { ref } from 'vue'
import { createStore } from 'vuex'

const store = createStore({
  state: {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    user: null, // Thông tin người dùng (nếu có)
    isLoggedIn: false, // Trạng thái đăng nhập
  },
  mutations: {
    // Mutation để cập nhật token
    setAccessToken(state, token) {
      state.accessToken = token
      localStorage.setItem('accessToken', token) // Lưu access token vào localStorage
    },
    setRefreshToken(state, token) {
      state.refreshToken = token
      localStorage.setItem('refreshToken', token) // Lưu refresh token vào localStorage
    },
    setLoggedIn(state, status) {
      state.isLoggedIn = status
    },
    clearToken(state) {
      state.accessToken = null
      state.refreshToken = null
      localStorage.removeItem('accessToken') // Xóa access token khỏi localStorage khi đăng xuất
      localStorage.removeItem('refreshToken') // Xóa token khỏi localStorage khi đăng xuất
    },
    setUser(state, user) {
      state.user = user
    },
  },
  getters: {
    // Getter để kiểm tra xem người dùng đã đăng nhập chưa
    isLoggedIn: (state) => !!state.accessToken, // Trả về true nếu có token
    getUser: (state) => state.user,
  },
  actions: {
    // Action để đăng nhập
    login({ commit }, accessToken) {
      commit('setAccessToken', accessToken)
      commit('setUser', user)
      commit('setLoggedIn', true)
    },
    logout({ commit }) {
      commit('clearToken')
      commit('setUser', null)
      commit('setLoggedIn', false)
    },
  },
})

export default store
