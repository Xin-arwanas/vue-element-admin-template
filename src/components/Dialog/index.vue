<template>
  <el-dialog
    v-dialogDrag="!fullscreen"
    :title="title"
    :visible.sync="asyncVisible"
    :append-to-body="true"
    :fullscreen="fullscreen"
    @close="dialogClose"
    @closed="closed"
  >
    <slot v-if="show" />
    <slot slot="footer" name="footer" />
  </el-dialog>
</template>
<script>
import dialogDrag from '@/directive/dialogDrag'
export default {
  directives: {
    dialogDrag
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: true
    }
  },
  computed: {
    asyncVisible: {
      get() {
        if (this.visible) {
          this.handleShow()
        }
        return this.visible
      },
      set() { }
    }
  },
  methods: {
    handleShow() {
      this.show = true
    },
    closed() {
      // dialog关闭动画完成时，删除内容，防止再打开时影响表单
      this.show = false
    },
    dialogClose() {
      this.$emit('update:visible', false)
      this.$emit('close')
    }
  }
}
</script>
