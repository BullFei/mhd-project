<template>
  <div class="page-home">
    <!-- template 中直接引入src中的某个图片文件，是没有问题的
      原因是 脚手架的配置中对这种操作做了处理，会交给webpack打包
     -->
    <!-- <img src="../../assets/logo.png" alt=""> -->
    <!--  -->
    <!-- <img :src="img" alt=""> -->
    <router-link to = '/city'>当前选择的城市是：{{ curCityName }}</router-link>
    <index-head></index-head>
    <div class="index-main">
      <swiper class="my-swiper" :autoplay="2000" @change="onChange" v-if="bannerList.length > 0">
        <swiper-item v-for="item in bannerList" :key="item.id">
          <img v-lazy="item.imageurl" alt />
        </swiper-item>
      </swiper>
      <index-nav></index-nav>
      <index-recommend v-for = "item in recommendList" :key = "item.specialid" :info = item></index-recommend>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from '@/components/Swiper'
import { getBanner, getIndexRecomment } from '@/api/cartoon'
import indexNav from './components/indexNav'
import indexRecommend from './components/indexRecommend'
import indexHead from './components/indexHead'
import { mapGetters } from 'vuex'

// 仓库的数据不是永久存储，页面刷新以后就不存在了
export default {
  name: 'Home',
  components: {
    Swiper,
    SwiperItem,
    indexNav,
    indexRecommend,
    indexHead
  },
  computed: {
    ...mapGetters('city', ['curCityName'])
  },
  data () {
    return {
      // 需要一个数据，考虑哪些点
      // 1. 数据放在哪里，data? props? computed? state? getter?
      // 2. 数据格式 string? object? number? array?...
      bannerList: [],
      recommendList: [],
      img: require('../../assets/logo.png') // 让项目运行的时候就一起去打包
    }
  },
  methods: {
    onChange (index) {
      // console.log('hello', index)
    },
    getBanner () {
      getBanner()
        .then((res) => {
          this.bannerList = res.info
        })
    },
    getIndexRecomment () {
      getIndexRecomment()
        .then(res => {
          this.recommendList = res.info
        })
    },
    getImg (str) {
      var obj = JSON.parse(str)
      return obj.x
    }
  },
  created () {
    this.getBanner()
    this.getIndexRecomment()
  }
}
</script>

<style lang="scss" scoped>
//引入共用的minxins: NaNscss;
// @import "../../assets/styles/mixins.scss";
// 使用@这个别名时，需要加一个~符号。但是现在不需要了
@import "@/assets/styles/mixins.scss";
.page-home {
  display: flex;
  flex-direction: column;
  height: 100%;
  @include backgroundCustom;
  z-index: 11 !important;
  .my-swiper img {
    width: 100%;
  }
  .index-main {
    overflow-y: auto;
    flex: 1;
  }
}
</style>
