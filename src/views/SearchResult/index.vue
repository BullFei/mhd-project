<template>
  <div class="page-search-result">
    <normal-header :showRight = 'false' :title = "keyword"></normal-header>
    <div class="search-result-main">
      <cartoon-list :comicsList = "cartoonList"></cartoon-list>
    </div>
  </div>
</template>

<script>

import NormalHeader from '@/components/NormalHeader'
import CartoonList from '@/components/CartoonList'
import { searchResult } from '@/api/cartoon'

export default {
  name: 'SearchResult',
  components: {
    NormalHeader,
    CartoonList
  },
  data () {
    return {
      keyword: this.$route.query.keyword,
      list: []
    }
  },
  computed: {
    cartoonList () {
      return this.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          coverurl: item.coverurl,
          author: item.author,
          view: item.lastpartname
        }
      })
    }
  },
  methods: {
    searchResult (name) {
      searchResult(name).then(res => {
        if (res.code === 200) {
          // console.log(res)
          this.list = res.info
        } else {
          alert(res.code_msg)
        }
      }).catch(error => {
        console.log(error)
        alert('网络异常，请稍后重试')
      })
    }
  },
  created () {
    this.searchResult(this.keyword)
  }
}
</script>

<style lang="scss" scoped>
.page-search-result {
  display: flex;
  flex-direction: column;
  height: 100%;

  .search-result-main {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
