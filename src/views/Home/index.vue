<template>
  <div class="page-home">
    <index-head></index-head>
    <div class="index-main">
      <swiper class="my-swiper" :autoplay="2000" @change="onChange" v-if="bannerList.length > 0">
        <swiper-item v-for="item in bannerList" :key="item.id">
          <img :src="item.imageurl" alt />
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

export default {
  name: 'Home',
  components: {
    Swiper,
    SwiperItem,
    indexNav,
    indexRecommend,
    indexHead
  },
  data () {
    return {
      // 需要一个数据，考虑哪些点
      // 1. 数据放在哪里，data? props? computed? state? getter?
      // 2. 数据格式 string? object? number? array?...
      bannerList: [],
      recommendList: []
    }
  },
  methods: {
    onChange (index) {
      // console.log('hello', index)
    },
    getBanner () {
      getBanner()
        .then((res) => {
          if (res.code === 200) {
          // ok
            this.bannerList = res.info
          } else {
          // 先调用一下丑陋的200，后面可以用一下vant组件库中的组件。
            alert(res.code_msg)
          }
        })
        .catch((err) => {
          alert('网络异常，请稍后重试', err)
        })
    },
    getIndexRecomment () {
      getIndexRecomment()
        .then(res => {
          if (res.code === 200) {
            this.recommendList = res.info
          } else {
            alert(res.code_msg)
          }
        })
        .catch((err) => {
          alert('网络异常，请稍后重试', err)
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
  .my-swiper img {
    width: 100%;
  }
  .index-main {
    overflow-y: auto;
    flex: 1;
  }
}
</style>
