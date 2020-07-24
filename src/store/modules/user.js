import { SET_LOGIN_STATE } from '@/store/mutationTypes'
const state = {
  isLogin: false
}
const actions = {
  updateLoginState ({commit}, {isLogin}) {
    commit(SET_LOGIN_STATE, isLogin)
  }
}

const getters = {
}
const mutations = {
  [SET_LOGIN_STATE] (state, isLogin) {
    state.isLogin = isLogin
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
