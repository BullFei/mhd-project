<template>
  <div class="header-type">
    <div
      class="item"
      :class = "{'active': index === activeIndex}"
      v-for = "(item,index) in types"
      :key = "item.id"
      @click = 'headleClick(item, index)'
      >{{item.description}}</div>
  </div>
</template>

<script>
export default {
  name: 'HeaderType',
  props: {
    types: {
      type: Array, // 如果默认值的数组或者对象，要通过返回值写
      default () {
        return []
      }
    }
  },
  data () {
    return {
      // 当前选中的下标
      activeIndex: 0
    }
  },
  methods: {
    headleClick (type, index) {
      // 当前点击的高亮显示
      this.activeIndex = index
      // 通知父组件
      this.$emit('click', {
        type,
        index
      })
    }
  }
}
</script>

<style lang = 'scss' scoped>
@import "@/assets/styles/mixins.scss";
.header-type {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  @include border-bottom;
  .item {
    width: 20%;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: #000;
    &.active {
      color: #e7370c;
    }
  }
}
</style>
