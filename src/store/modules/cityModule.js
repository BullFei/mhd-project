// 拆分出来的 城市相关的 仓库子模块
import { getCityList } from '@/api/city'
const city = window.sessionStorage.getItem('city')
const state = {
  curCity: city ? JSON.parse(city) : null, // 当前选择的城市 {cityId: 111, name: '北京'}
  cities: []
}

const mutations = {
  SET_CURCITY (state, payload) {
    state.curCity = payload
    // 做一下本地存储
    window.sessionStorage.setItem('city', JSON.stringify(state.curCity))
  },
  SET_CITIES (state, payload) {
    state.cities = payload
  }
}

const getters = {
  curCityName (state) {
    return state.curCity ? state.curCity.name : ''
  },
  cityList (state) {
    const result = []
    state.cities.forEach(item => {
      // 获取当前城市的首字母
      const py = item.pinyin[0].toUpperCase()
      var index = result.findIndex(item => item.py === py)
      if (index > -1) {
        result[index].list.push(item)
      } else {
        result.push({
          py,
          list: [item]
        })
      }
    })
    result.sort((a, b) => a.py.charCodeAt() - b.py.charCodeAt())
    return result
  },
  indexs (state, getters) {
    return getters.cityList.map(item => item.py)
  }
}

const actions = {
  GET_CITIES (context, payload) {
    getCityList().then(res => {
      const data = res.data
      if (data.status === 0) {
        // this.cities = data.data.cities
        // 要改变的是state的数据
        context.commit('SET_CITIES', data.data.cities)
      } else {
        alert(data.msg)
      }
    }).catch(err => {
      console.log(err)
      alert('网络异常，请稍后重试')
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
