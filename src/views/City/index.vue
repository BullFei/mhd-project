<template>
  <div class = 'page-city'>
    <normal-header :title = "`当前城市-${curCityName}`" :showRight = "false"></normal-header>
    <div class = 'city-main'>
      <div class = 'left' ref = 'scrollLeft'>
        <div class = 'city-index-section' :ref = "`section-${item.py}`" v-for = "item in cityList" :key = "item.py">
          <p>{{item.py}}</p>
          <ul>
            <li v-for = "city in item.list" :key = "city.cityId" @click = "SET_CURCITY(city)">{{city.name}}</li>
          </ul>
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
import { getCityList } from '@/api/city'
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'City',
  components: {
    NormalHeader
  },
  data () {
    return {
      cities: []
    }
  },
  computed: {
    ...mapGetters('city', ['curCityName']),
    cityList () {
      const result = []
      this.cities.forEach(item => {
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
    indexs () {
      return this.cityList.map(item => item.py)
    }
  },
  methods: {
    ...mapMutations('city', ['SET_CURCITY']),
    getCityList () {
      getCityList().then(res => {
        const data = res.data
        if (data.status === 0) {
          this.cities = data.data.cities
        } else {
          alert(data.msg)
        }
      }).catch(err => {
        console.log(err)
        alert('网络异常，请稍后重试')
      })
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
      this.$refs.scrollLeft.scrollTop = offsetTop - 40
    }
  },
  created () {
    this.getCityList()
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
    overflow-y: auto;
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
