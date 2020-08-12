<template>
  <div class = 'page-city'>
    <normal-header :title = "`当前城市-${curCityName}`" :showRight = "false"></normal-header>
    <div class = 'city-main'>
      <div class = 'left' ref = 'scrollLeft'>
        <div>
          <div class = 'city-index-section' :ref = "`section-${item.py}`" v-for = "item in cityList" :key = "item.py">
            <p>{{item.py}}</p>
            <ul>
              <li v-for = "city in item.list" :key = "city.cityId" @click = "handleClick(city)">{{city.name}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class = 'right'>
        <ul>
          <li v-for = "item in indexs" :key = "item" @click = "handleIndex(item)">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import NormalHeader from '@/components/NormalHeader'
import { mapMutations, mapGetters, mapActions } from 'vuex'
import BScroll from 'better-scroll'
export default {
  name: 'City',
  components: {
    NormalHeader
  },
  computed: {
    ...mapGetters('city', ['curCityName', 'cityList', 'indexs'])
  },
  methods: {
    ...mapMutations('city', ['SET_CURCITY']),
    ...mapActions('city', ['GET_CITIES']),
    handleClick (py) {
      this.SET_CURCITY(py)
      // 2、回到之前的页面
      const redirect = this.$route.query.redirect || '/'
      this.$router.replace(redirect)
    },
    handleIndex (py) {
      // ref 标记时，如果标记在 v-for 上，那么得到的是一个数组
      // console.log(py)
      // console.log(this.$refs[`section-${py}`][0])
      // 根据py获取左侧对应的DOM对象
      const targetEl = this.$refs[`section-${py}`][0]
      // 计算这个元素距离 左侧顶部的距离
      const offsetTop = targetEl.offsetTop
      // 修改左侧的值
      this.bscroll.scrollTo(0, -offsetTop)
    }
  },
  created () {
    this.GET_CITIES()
  },
  mounted () {
    // 传入一个dom对象
    /* eslint-disable */
    this.bscroll = new BScroll(this.$refs.scrollLeft, {
      click: true
    })
    /* eslint-enable */
  }
}
</script>

<style lang = 'scss' scoped>
@import '@/assets/styles/mixins.scss';
.page-city{
  display: flex;
  flex-direction: column;
  height: 100%;
  .city-main {
    flex: 1;
    overflow: hidden;
    display: flex;
  }
  .left{
    flex: 1;
    height: 100%;
    .city-index-section{
      @include border-bottom;
      padding-left: 15px;
      p{
        @include border-bottom;
        height: 36px;
        line-height: 36px;
        font-size: 16px;
      }
      li{
        @include border-bottom;
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: 16px;
      }
    }
  }
  .right{
    width: 20px;
    height: 100%;
    display: flex;
    align-items: center;
    li{
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>
