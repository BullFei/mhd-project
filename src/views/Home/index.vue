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

    <div class="index-main">
      <Swiper class="my-swiper" :autoplay="2000" @change="onChange" v-if="bannerList.length > 0">
        <SwiperItem v-for="item in bannerList" :key="item.id">
          <img :src="item.imageurl" alt />
        </SwiperItem>
      </Swiper>
      <nav class="index-nav">
        <a href="javascript:;">
          <div class="nav-item">
            <i class="iconfont icon-icon_addmessage"></i>
            <p class="nav-text font-24">分类</p>
          </div>
        </a>
        <a href="javascript:;">
          <div class="nav-item">
            <i class="iconfont icon-icon_addresslist"></i>
            <p class="nav-text font-24">排行</p>
          </div>
        </a>
        <a href="javascript:;">
          <div class="nav-item">
            <i class="iconfont icon-icon_addressbook"></i>
            <p class="nav-text font-24">VIP专区</p>
          </div>
        </a>
        <a href="javascript:;">
          <div class="nav-item">
            <i class="iconfont icon-icon_at"></i>
            <p class="nav-text font-24">历史</p>
          </div>
        </a>
      </nav>
      <section class="index-recommend" v-for = "item in recommendList" :key = "item.specialid">
        <div class="recommend-divide"></div>
        <div class="recommend-title">
          <div class="title-group">
            <img class="title-icon" :src="item.icon" />
            <span class="title-text font-36">{{item.name}}</span>
          </div>
          <span class="title-more font-24">更多 &gt;</span>
        </div>
        <div v-if = "item.comicsviewtype === 1" class = "recommend-type-1">
          <div class="item" v-for = "childItem in item.comicslist" :key = "childItem.bigbook_id">
            <img
              class="item-pic"
              :src="JSON.parse(childItem.extension).xsyzfx"
            />
            <p class="item-name font-28">{{childItem.bigbook_name}}</p>
            <p class="item-text font-24">{{JSON.parse(childItem.extension).recommendwords}}</p>
          </div>
        </div>
        <div v-if = "item.comicsviewtype === 5" class = "recommend-type-5">
          <div class="item" v-for = "childItem in item.comicslist" :key = "childItem.bigbook_id">
            <img
              class="item-pic"
              :src="childItem.coverurl"
            />
            <p class="item-name font-28">{{childItem.bigbook_name}}</p>
            <p class="item-text font-24">{{childItem.key_name}}</p>
          </div>
        </div>
        <div v-if = "item.comicsviewtype === 3" class = "recommend-type-3">
           <div class="item" v-for = "(childItem, childIndex) in item.comicslist" :key = "childItem.bigbook_id">
            <img
              class="item-pic"
              :src="JSON.parse(childItem.extension).scfk344_202"
            />
            <div class="ranking-group">
              <div :class="`item-ranking item-ranking-${childIndex + 1}`"></div>
            </div>
            <div class="text-group">
              <p class="item-name font-30">{{childItem.bigbook_name}}</p>
              <p class="item-hot font-24">
                人气：
                <span class="hot-hot">{{childItem.bigbookview}}</span>
              </p>
              <p
                class="item-text font-24"
              >{{childItem.brief}}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from '@/components/Swiper'
import { getBanner, getIndexRecomment } from '@/api/cartoon'

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
  .index-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 100px;
    .nav-item {
      .iconfont {
        font-size: 52px;
        line-height: 1.2;
      }
      .nav-text {
        color: #8d8d8d;
        font-weight: 500;
        text-align: center;
      }
    }
  }
  .index-main {
    overflow-y: auto;
    flex: 1;
  }
    .index-recommend {
    .recommend-divide {
      height: 10px;
      background-color: #f4f4f4;
    }
    .recommend-title {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-top: 20px;
      margin-bottom: 18px;
      .title-group {
        display: flex;
        align-items: center;
        .title-icon {
          width: 22px;
          height: 22px;
          margin-right: 5px;
        }
        .title-text {
          color: #3a3a3a;
          font-weight: 500;
        }
      }
      .title-more {
        color: #b0b0b0;
        position: absolute;
        right: 18px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .recommend-type-1 {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      box-sizing: border-box;
      .item {
        width: 174px;
        height: 218px;
        margin-bottom: 16px;
        .item-pic {
          width: 174px;
          height: 174px;
          margin-bottom: 4px;
          position: relative;
        }
        .item-name {
          max-width: 100%;
          margin-bottom: 2px;
          color: #3a3a3a;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .item-text {
          max-width: 100%;
          color: #8d8d8d;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
    .recommend-type-5 {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    .item {
      width: 112px;
      height: 218px;
      margin-bottom: 16px;
      .item-pic {
        width: 112px;
        height: 148px;
        margin-bottom: 4px;
      }
      .item-title {
        max-width: 100%;
        margin-bottom: 2px;
        color: #3a3a3a;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .item-text {
        max-width: 100%;
        color: #8d8d8d;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
    .recommend-type-3 {
      padding: 0 10px;
      box-sizing: border-box;
      .item {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 16px;
        position: relative;
        .item-pic {
          width: 154px;
          height: 90px;
        }
        .text-group {
          width: 158px;
          margin-left: 42px;
          .item-name {
            margin-bottom: 4px;
            color: #3a3a3a;
            font-weight: 500;
          }
          .item-hot {
            color: #b0b0b0;
            margin-bottom: 15px;
            .hot-hot {
              color: red;
            }
          }
          .item-text {
            color: #8d8d8d;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
        .ranking-group {
          .item-ranking {
            width: 25px;
            height: 25px;
            background-repeat: no-repeat;
            background-position: top;
            background-size: 100%;
            position: absolute;
            top: 4px;
            left: 168px;
          }
          .item-ranking-other {
            width: 25px;
            height: 25px;
            background-repeat: no-repeat;
            background-position: top;
            background-size: 100%;
            position: absolute;
            top: 6px;
            left: 168px;
          }
          .item-ranking-1 {
            background-image: url("../../assets/icon/rank-1.png");
          }
          .item-ranking-2 {
            background-image: url("../../assets/icon/rank-2.png");
          }
          .item-ranking-3 {
            background-image: url("../../assets/icon/rank-3.png");
          }
          .item-ranking-4 {
            background-image: url("../../assets/icon/rank-4.png");
          }
          .item-ranking-5 {
            background-image: url("../../assets/icon/rank-5.png");
          }
        }
      }
    }
  }
}
</style>
