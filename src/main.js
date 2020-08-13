import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

// 引入 vue-lazyload
// 引入基准样式
import './assets/styles/base.scss'

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  preLoad: 1.3, // 预加载高度
  error: require('./assets/logo.png'), // 当加载图片出错时，显示的替代图片
  loading: require('./assets/logo.png'), // 当加载真是图片地址之前的一个替代图片
  attempt: 1 // 尝试加载真实图片的次数
  // error 与 loading 可以使用线上图片链接，也可以使用本地图片链接，但是要注意，如果要使用
  // 1、src文件夹中的图片，需要使用require引入
  // 2、如果地址是public文件夹中的，可以将public看成/去组织url地址。
})

Vue.filter('formatViews', (value) => {
  if (value > Math.pow(10, 8)) {
    return (value / Math.pow(10, 8)).toFixed(2) + '亿'
  } else {
    return value
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
