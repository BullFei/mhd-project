<template>
  <div id="app">
    <!-- 路由切换动画时，入场动画和出场动画一样 -->
    <!--
          新的需求：
            分类页面：入场使用slideInRight
                    出厂使用slideOutRight

            排行榜页面：入场使用slideInDown
                      出场使用slideOutUp
          解决方案：
            1、单独在页面组件中去做。具体页面的效果出来了，但是我希望他们出现的时候，首页还能看到。
            2. 这时考虑使用，多元素/多组件的过渡动画

          需求尝试二：
            1. 设置过渡模式为 in-out
            2.
    -->
    <transition
      :enter-active-class="enterActiveClass"
      :leave-active-class="leaveActiveClass"
      >
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      enterActiveClass: 'animate__animated animate__slideInRight',
      leaveActiveClass: 'animate__animated animate__slideOutRight'
    }
  },
  watch: {
    $route (to, from) {
      this.leaveActiveClass = from.meta.leaveActiveClass
      this.enterActiveClass = to.meta.enterActiveClass
    }
  }
}
</script>

<style lang="scss">
</style>
