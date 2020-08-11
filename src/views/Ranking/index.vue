<template>
  <div class="page-ranking">
    <normal-header title = '排行榜'></normal-header>
    <header-type :types = "types" @click = "onTypeChange"></header-type>
    <div class="ranking-main">
      <cartoon-list :comicsList = "cartoonList" :isRanking = "true"></cartoon-list>
    </div>
  </div>
</template>

<script>
import NormalHeader from '@/components/NormalHeader'
import HeaderType from '@/components/HeaderType'
import CartoonList from '@/components/CartoonList'
import { unformat } from '@/utils/apiHeader'
import { getRankList } from '@/api/cartoon'

export default {
  name: 'Ranking',
  components: {
    NormalHeader,
    HeaderType,
    CartoonList
  },
  data () {
    return {
      // 排行榜分类信息不知道从哪里得到，写死好了
      types: [
        { id: 1, description: '热搜榜', ranktype: 6 },
        { id: 2, description: '人气榜', ranktype: 1 },
        { id: 3, description: '畅销榜', ranktype: 4 },
        { id: 4, description: '新书榜', ranktype: 2 },
        { id: 5, description: '完结榜', ranktype: 5 },
        { id: 6, description: '免费榜', ranktype: 3 }
      ],
      ranklist: []
    }
  },
  computed: {
    cartoonList () {
      return this.ranklist.map(item => {
        return {
          id: item.bigbookid,
          coverurl: item.coverurl,
          name: item.name,
          author: item.author,
          view: item.weekhits
        }
      })
    }
  },
  methods: {
    getRankList (ranktype) {
      getRankList(ranktype).then(res => {
        const info = JSON.parse(unformat(res.info))
        this.ranklist = info.ranklist
      })
    },
    onTypeChange (payload) {
      const ranktype = payload.type.ranktype
      this.getRankList(ranktype)
    }
  },
  created () {
    this.getRankList(this.types[0].ranktype)
  }
}
</script>
<style lang="scss" scoped>
.page-ranking {
  display: flex;
  flex-direction: column;
  height: 100%;

  .ranking-main {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
