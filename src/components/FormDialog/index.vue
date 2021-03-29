<template>
  <div>
    <Dialog
      :title="title"
      :visible.sync="visible"
      @close="dialogClose"
      @closed="dialogClosed"
    >
      <div class="dialogWrapper">
        <BasicForm
          ref="form"
          :key="formKey"
          :form.sync="form"
          :form-option="formOption"
          :select-list="selectList"
          :data.sync="data"
          @selectChange="selectChange"
          @cascaderLoad="cascaderLoad"
          @asyncSelectLoad="asyncSelectLoad"
        >
          <template v-slot:custom="slot">
            <slot name="formCustom" :data="slot.data" />
          </template>
        </BasicForm>
      </div>
      <div v-if="formOption.hasOwnProperty('needFooter')?formOption.needFooter:true" slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取消</el-button>
        <el-button type="primary" @click="confirm"> 确定 </el-button>
      </div>
    </Dialog>
  </div>
</template>
<script>
import BasicForm from '@/components/BasicForm'
import Dialog from '@/components/Dialog'
export default {
  components: {
    BasicForm,
    Dialog
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    formOption: {
      type: Object,
      default() { return {} }
    },
    form: {
      type: Array,
      default() {
        return []
      }
    },
    data: {
      type: Object,
      default() { return {} }
    },
    selectList: {
      type: Object,
      default() { return {} }
    }
  },
  data() {
    return {
      formKey: 0
    }
  },
  computed: {
    visible: {
      get() {
        return this.dialogVisible
      },
      set() { }
    }
  },
  methods: {
    confirm() {
      this.$refs.form.confirm().then(params => {
        this.$emit('confirm', params)
      })
    },
    selectChange(data) {
      this.$emit('selectChange', data)
    },
    refreshForm() {
      this.$refs.form.refreshForm()
    },
    dialogClose() {
      this.$refs.form.resetFields()
      this.$emit('update:dialogVisible', false)
      this.$emit('dialogClose')
      this.refreshForm()
    },
    dialogClosed() {
      this.$emit('update:data', {})
      this.$emit('dialogClosed')
    },
    asyncSelectLoad(params) {
      this.$emit('asyncSelectLoad', params)
    },
    changeSelectLoading(selectKey, bool) {
      this.$nextTick(() => {
        this.$refs.form.changeSelectLoading(selectKey, bool)
      })
    },
    cascaderLoad({ node, resolve, formItem }) {
      this.$emit('cascaderLoad', {
        node,
        resolve,
        formItem
      })
    }
  }
}
</script>
