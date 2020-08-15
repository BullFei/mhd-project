<template>
  <!-- appear 第一次进入页面也要进行入场动画 -->
  <!-- <transition
    appear
    enter-active-class="animate__animated animate__slideInRight"
    leave-active-class="animate__animated animate__slideOutRight"
  > -->
  <div class="page-classify">
    <router-link to = '/city'>当前选择的城市是：{{curCityName}}</router-link>
    <normal-header title = "分类"></normal-header>
    <header-type :types = "proad" @click = "onTypeChange"></header-type>
    <div class="classify-main">
      <cartoon-list :comicsList = "cartoonList"></cartoon-list>
    </div>
  </div>
  <!-- </transition> -->
</template>

<script>
import NormalHeader from '@/components/NormalHeader'
import HeaderType from '@/components/HeaderType'
import CartoonList from '@/components/CartoonList'
import { getproad, getTypeList } from '@/api/cartoon'
import { unformat } from '@/utils/apiHeader'
import { mapGetters } from 'vuex'

export default {
  name: 'Classify',
  components: {
    NormalHeader,
    HeaderType,
    CartoonList
  },
  data () {
    return {
      proad: [],
      comicsList: []
    }
  },
  computed: {
    ...mapGetters('city', ['curCityName']),
    cartoonList () {
      return this.comicsList.map(item => {
        return {
          id: item.bigbook_id,
          coverurl: item.coverurl,
          name: item.bigbook_name,
          author: item.bigbook_author,
          view: item.bigbookview
        }
      })
    }
  },
  methods: {
    getproad () {
      return getproad().then(res => {
        this.proad = res.info
      })
    },
    getTypeList (subject) {
      getTypeList(subject).then(res => {
        const info = JSON.parse(unformat(res.info))
        this.comicsList = info.comicsList
      })
    },
    onTypeChange (payload) {
      // console.log(payload)
      // 取出payload中的type中的targetargument
      const subject = payload.type.targetargument
      this.getTypeList(subject)
    }
  },
  async created () {
    await this.getproad()
    this.getTypeList(this.proad[0].targetargument)
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/mixins.scss";
.page-classify {
  z-index: 22;
  display: flex;
  flex-direction: column;
  height: 100%;
  @include backgroundCustom;
  .classify-main {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
