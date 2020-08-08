import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入基准样式
import './assets/styles/base.scss'

Vue.config.productionTip = false

Vue.filter('formatViews', (value) => {
  return (value / Math.pow(10, 8)).toFixed(2) + '亿'
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
