<template>
  <div v-loading="loading" class="doc-view">
    <iframe :id="id" width="100%" :src="'https://view.officeapps.live.com/op/view.aspx?src='+url" height="100%" sandbox="allow-forms allow-popups allow-scripts allow-same-origin allow-top-navigation allow-modals" frameborder="0" scrolling="auto" @load="docLoad" />
  </div>
</template>

<script>
export default {
  name: 'DocView',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: true,
      id: new Date().getTime()
    }
  },
  mounted() {
    this.loading = true
  },
  beforeDestroy() {},
  methods: {
    // 遮罩处理
    docLoad() {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.doc-view{
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  iframe{
    position: relative;
    box-sizing: border-box;
  }
}
.autoH{
  height: auto;
}
.defultH{
  height: 200px;
}
</style>
