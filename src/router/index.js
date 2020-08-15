import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

// 同步引入路由页面组件
// import Home from '../views/Home/'
// import Classify from '../views/Classify'
// import Hello from '../views/Hello'
// import Favorite from '../views/Hello/Favorite'
// import History from '../views/Hello/History'
// import Login from '../views/Login'
// import My from '../views/My'
// import Ranking from '../views/Ranking'
// import Register from '../views/Register'
// import Search from '../views/Search'
// import Vip from '../views/Vip'
// import SearchResult from '../views/SearchResult'
// import City from '../views/City'
// 改造成异步引入路由组件
const Home = () => import('../views/Home/')
// const Classify = () => import('../views/Classify')
const Hello = () => import('../views/Hello')
const Favorite = () => import('../views/Hello/Favorite')
const History = () => import('../views/Hello/History')
const Login = () => import('../views/Login')
const My = () => import('../views/My')
const Ranking = () => import('../views/Ranking')
const Register = () => import('../views/Register')
const Search = () => import('../views/Search')
const Vip = () => import('../views/Vip')
const SearchResult = () => import('../views/SearchResult')
const City = () => import('../views/City')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home,
      meta: { enterActiveClass: '', leaveActiveClass: 'animate__animated dalay-1s' }
    },
    {
      path: '/classify',
      component: () =>
        import(/* webpackChunkName: 'classify' */ '../views/Classify'),
      meta: {
        enterActiveClass: 'animate__animated animate__slideInRight',
        leaveActiveClass: 'animate__animated animate__slideOutRight'
      }
    },
    {
      path: '/city',
      component: City,
      meta: {
        enterActiveClass: 'animate__animated animate__slideInRight',
        leaveActiveClass: 'animate__animated animate__slideOutRight'
      }
    },
    {
      path: '/hello',
      component: Hello,
      children: [
        {
          path: 'favorite',
          component: Favorite
        },
        {
          path: 'history',
          component: History
        }
      ],
      meta: {
        enterActiveClass: 'animate__animated animate__slideInRight',
        leaveActiveClass: 'animate__animated animate__slideOutRight'
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        enterActiveClass: 'animate__animated animate__slideInRight',
        leaveActiveClass: 'animate__animated animate__slideOutRight'
      }
    },
    {
      path: '/my',
      component: My,
      meta: {
        enterActiveClass: 'animate__animated animate__slideInRight',
        leaveActiveClass: 'animate__animated animate__slideOutRight'
      }
    },
    {
      path: '/ranking',
      component: Ranking,
      meta: {
        enterActiveClass: 'animate__animated animate__slideInRight',
        leaveActiveClass: 'animate__animated animate__slideOutRight'
      }
    },
    {
      path: '/resigter',
      component: Register,
      meta: {
        enterActiveClass: 'animate__animated animate__slideInRight',
        leaveActiveClass: 'animate__animated animate__slideOutRight'
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        enterActiveClass: 'animate__animated animate__slideInRight',
        leaveActiveClass: 'animate__animated animate__slideOutRight'
      }
    },
    {
      path: '/vip',
      component: Vip,
      meta: {
        enterActiveClass: 'animate__animated animate__slideInRight',
        leaveActiveClass: 'animate__animated animate__slideOutRight'
      }
    },
    {
      path: '/search-result',
      component: SearchResult,
      meta: {
        enterActiveClass: 'animate__animated animate__slideInRight',
        leaveActiveClass: 'animate__animated animate__slideOutRight'
      }
    },
    {
      path: '/',
      redirect: '/home',
      meta: {
        enterActiveClass: 'animate__animated animate__slideInRight',
        leaveActiveClass: 'animate__animated animate__slideOutRight'
      }
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 判断当前是否选择了城市，根据sessionstorage 或者store去判断。
  if (!store.state.city.curCity && to.path !== '/city') {
    // 先去城市列表页面
    next({
      path: '/city',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
})

export default router
