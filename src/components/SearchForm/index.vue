<template>
  <div>
    <BasicForm
      ref="form"
      :form.sync="form"
      :form-option="formOption"
      :select-list="selectList"
      @selectChange="selectChange"
      @cascaderLoad="cascaderLoad"
      @asyncSelectLoad="asyncSelectLoad"
    />
    <div style="height:100%;display:inline-block;vertical-align:top;margin-top:2px;">
      <el-button
        type="primary"
        icon="el-icon-search"
        :size="formOption.size"
        class="searchBtn"
        @click="handleSearch"
      >
        搜索
      </el-button>
      <el-button
        type="danger"
        icon="el-icon-refresh"
        :size="formOption.size"
        class="resetBtn"
        @click="resetSearch"
      >
        重置
      </el-button>
    </div>
  </div>
</template>
<script>
import BasicForm from '@/components/BasicForm'
export default {
  components: {
    BasicForm
  },
  props: {
    form: {
      type: Array,
      default: () => []
    },
    needReset: {
      type: Boolean,
      default: true
    },
    selectList: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      formOption: {
        inline: true,
        size: 'medium',
        formStyle: { display: 'inline-block', verticalAlign: 'top' }
      }
    }
  },
  methods: {
    getParams() {
      return this.$refs.form.params
    },
    confirm() {
      return new Promise(resolve => {
        this.$refs.form.confirm().then(params => {
          resolve(params)
        })
      })
    },
    selectChange(data) {
      this.$emit('selectChange', data)
    },
    cascaderLoad(data) {
      this.$emit('cascaderLoad', data)
    },
    asyncSelectLoad(data) {
      this.$emit('asyncSelectLoad', data)
    },
    handleSearch(initPage = true) {
      this.confirm().then(params => {
        this.$emit('handleSearch', { params, initPage })
      })
    },
    resetSearch() {
      this.$refs.form.resetFields()
    },
    changeSelectLoading(selectKey, bool) {
      this.$nextTick(() => {
        this.$refs.form.changeSelectLoading(selectKey, bool)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.inputWrapper {
  display: inline-block;
  margin-bottom: 10px;
}
.filter-item {
  margin-right: 10px;
}
.searchBtn,
.resetBtn {
  margin-left: 10px;
}
</style>
