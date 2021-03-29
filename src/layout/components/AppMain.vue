<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- <div class="content" style="display:flex;flex-direction:column;"> -->
      <router-view :key="key" style="height:100%;display:flex;" />

      <!-- </div> -->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  display:flex;
  flex-direction: column;
}
.content {
  min-height: calc(100vh - 50px);
}
.fixed-header + .app-main {
  padding-top: 50px;
}

</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
.router_view{
  display:flex;
  flex-direction: column;
  flex:1;
}
</style>
