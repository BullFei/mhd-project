// 拆分出来的 城市相关的 仓库子模块
const state = {
  curCity: null // 当前选择的城市 {cityId: 111, name: '北京'}
}

const mutations = {
  SET_CURCITY (state, payload) {
    state.curCity = payload
  }
}

const getters = {
  curCityName (state) {
    return state.curCity ? state.curCity.name : ''
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
