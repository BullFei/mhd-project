<template>
  <div class="page-ranking">
    <normal-header title = '排行榜'></normal-header>
    <header-type></header-type>
    <div class="ranking-main">
      <cartoon-list></cartoon-list>
    </div>
  </div>
</template>

<script>
import NormalHeader from '@/components/NormalHeader'
import HeaderType from '@/components/HeaderType'
import CartoonList from '@/components/CartoonList'

export default {
  name: 'Ranking',
  components: {
    NormalHeader,
    HeaderType,
    CartoonList
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
