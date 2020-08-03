<template>
  <div class="page-home">
    <!-- 首页头部 begin -->
    <header class="index-header">
      <a href="mine.html?cpid=0">
        <div class="header-user">
          <div class="user-btn"></div>
        </div>
      </a>
      <div class="header-logo"></div>
      <a href="search.html?cpid=0">
        <div class="header-search"></div>
      </a>
    </header>
    <Swiper class = 'my-swiper' :autoplay="2000" @change="onChange" v-if = "bannerList.length > 0">
      <SwiperItem v-for = "item in bannerList" :key = "item.id">
        <img
          :src="item.imageurl"
          alt
        />
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from '@/components/Swiper'
import { getBanner } from '@/api/cartoon'

export default {
  name: 'Home',
  components: {
    Swiper,
    SwiperItem
  },
  data () {
    return {
      // 需要一个数据，考虑哪些点
      // 1. 数据放在哪里，data? props? computed? state? getter?
      // 2. 数据格式 string? object? number? array?...
      bannerList: []
    }
  },
  methods: {
    onChange (index) {
      // console.log('hello', index)
    }
  },
  created () {
    getBanner().then(res => {
      if (res.code === 200) {
        // ok
        this.bannerList = res.info
      } else {
        // 先调用一下丑陋的200，后面可以用一下vant组件库中的组件。
        alert(res.code_msg)
      }
    }).catch(err => {
      alert('网络异常，请稍后重试', err)
    })
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
  .my-swiper img{
    width: 100%;;
  }
  .index-header {
    @include border-bottom;
    display: flex;
    height: 44px;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    // border-bottom: 1px solid #e9e9e9;
    .user-btn {
      width: 25px;
      height: 25px;
      background: url(../../assets/icon/user-btn.png) no-repeat;
      background-size: 100%;
    }
    .header-logo {
      width: 92px;
      height: 28px;
      background: url(../../assets/logo.png) no-repeat;
      background-size: 100%;
    }
    .header-search {
      width: 25px;
      height: 25px;
      background: url(../../assets/icon/header-search.png) no-repeat;
      background-size: 100%;
    }
  }
}
</style>
