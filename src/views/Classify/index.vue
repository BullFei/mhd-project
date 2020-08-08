<template>
  <div class="page-classify">
    <normal-header title = "分类"></normal-header>
    <header-type :types = "proad" @click = "onTypeChange"></header-type>
    <div class="classify-main">
      <cartoon-list :comicsList = "comicsList"></cartoon-list>
    </div>
  </div>
</template>

<script>
import NormalHeader from '@/components/NormalHeader'
import HeaderType from '@/components/HeaderType'
import CartoonList from '@/components/CartoonList'
import { getproad, getTypeList } from '@/api/cartoon'
import { unformat } from '@/utils/apiHeader'

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
  methods: {
    getproad () {
      return getproad().then(res => {
        if (res.code === 200) {
          this.proad = res.info
        } else {
          alert(res.code_msg)
        }
      }).catch(err => {
        console.log(err)
        alert('网络异常，请稍后重试')
      })
    },
    getTypeList (subject) {
      getTypeList(subject).then(res => {
        if (res.code === 200) {
          const info = JSON.parse(unformat(res.info))
          this.comicsList = info.comicsList
        } else {
          alert(res.code_msg)
        }
      }).catch(err => {
        console.log(err)
        alert('网络异常，请稍后重试')
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
.page-classify {
  display: flex;
  flex-direction: column;
  height: 100%;

  .classify-main {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
