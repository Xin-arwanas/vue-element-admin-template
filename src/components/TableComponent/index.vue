<template>
  <el-container
    :style="{ overflow: tableOption.autoHeight ? 'auto' : 'hidden' }"
    direction="vertical"
  >
    <slot name="top_area" />
    <div
      v-if="searchForm.length > 0 && searchSelectReady"
      class="search-container border-bottom"
    >
      <FilterComponent
        v-if="searchForm.length > 0"
        ref="searchForm"
        :key="searchFormKey"
        :form="searchForm"
        :select-list="searchSelectList"
        @handleSearch="handleSearch"
        @selectChange="(data) => renderSelect({ ref: 'searchForm', ...data })"
        @cascaderLoad="
          (params) => cascaderLoad({ ...params, ref: 'searchForm' })
        "
        @asyncSelectLoad="
          (data) => asyncSelectLoad({ ref: 'searchForm', ...data })
        "
      />
    </div>
    <div
      v-if="
        topOperationColumn.hasOwnProperty('needOperationColumn')
          ? topOperationColumn.needOperationColumn
          : true
      "
      class="app-container border-bottom"
    >
      <el-row type="flex" align="middle" style="flex-wrap:wrap;">
        <el-button
          v-if="
            topOperationColumn.hasOwnProperty('needAdd')
              ? topOperationColumn.needAdd
              : true
          "
          type="success"
          size="small"
          @click="addFormVisible = true"
        >
          {{ topOperationColumn.addText || "新增" }}
        </el-button>
        <slot name="topOperations" />
      </el-row>
    </div>
    <el-main v-if="!tableOption.autoHeight">
      <BasicTable
        :table-columns="tableColumns"
        :table-data="tableData"
        :list-loading="listLoading"
        :table-option="tableOption"
        @selectionChange="(val) => (tableSelectionArray = val)"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
      >
        <template v-slot:extraActionFront="{ data: { row, column, $index } }">
          <slot name="extraTableActionFront" :data="{ row, column, $index }" />
        </template>
        <template v-slot:extraActionBehind="{ data: { row, column, $index } }">
          <slot name="extraTableActionBehind" :data="{ row, column, $index }" />
        </template>
        <template v-slot:custom="{ data: { row, column, $index, col } }">
          <slot name="custom" :data="{ row, column, $index, col }" />
        </template>
        <template v-slot:expand="{ data: { row, column, $index } }">
          <slot name="tableExpand" :data="{ row, column, $index }" />
        </template>
      </BasicTable>
    </el-main>
    <div v-else class="app-container">
      <BasicTable
        :table-columns="tableColumns"
        :table-data="tableData"
        :list-loading="listLoading"
        :table-option="tableOption"
        @selectionChange="(val) => (tableSelectionArray = val)"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
      >
        <template v-slot:extraActionFront="{ data: { row, column, $index } }">
          <slot name="extraTableActionFront" :data="{ row, column, $index }" />
        </template>
        <template v-slot:extraActionBehind="{ data: { row, column, $index } }">
          <slot name="extraTableActionBehind" :data="{ row, column, $index }" />
        </template>
        <template v-slot:custom="{ data: { row, column, $index, col } }">
          <slot name="custom" :data="{ row, column, $index, col }" />
        </template>
        <template v-slot:expand="{ data: { row, column, $index } }">
          <slot name="tableExpand" :data="{ row, column, $index }" />
        </template>
      </BasicTable>
    </div>
    <el-footer v-if="total != 0">
      <pagination
        v-if="total != 0"
        :total="total || 0"
        :page.sync="pageParams.page"
        :limit.sync="pageParams.rows"
        :layout="pageOption.layout"
        @pagination="(params) => changePage({ pageParams: params })"
      />
    </el-footer>
    <FormDialog
      ref="addForm"
      :title="addFormOption.title ? addFormOption.title : '新增'"
      :dialog-visible.sync="addFormVisible"
      :form.sync="addForm"
      :form-option="addFormOption"
      :select-list.sync="selectList"
      @dialogClose="dialogClose"
      @confirm="confirmAdd"
      @selectChange="(data) => renderSelect({ ref: 'addForm', ...data })"
      @cascaderLoad="(params) => cascaderLoad({ ...params, ref: 'addForm' })"
      @asyncSelectLoad="(data) => asyncSelectLoad({ ref: 'addForm', ...data })"
    >
      <template v-slot:formCustom="slot">
        <slot name="addFormCustom" :data="slot.data" />
      </template>
    </FormDialog>
    <FormDialog
      ref="editForm"
      :title="editFormOption.title ? editFormOption.title : '编辑'"
      :dialog-visible.sync="editFormVisible"
      :form.sync="editForm"
      :form-option="editFormOption"
      :data.sync="editData"
      :select-list.sync="selectList"
      @dialogClose="dialogClose"
      @confirm="confirmEdit"
      @selectChange="(data) => renderSelect({ ref: 'editForm', ...data })"
      @cascaderLoad="(params) => cascaderLoad({ ...params, ref: 'editForm' })"
      @asyncSelectLoad="(data) => asyncSelectLoad({ ref: 'editForm', ...data })"
    >
      <template v-slot:formCustom="slot">
        <slot name="editFormCustom" :data="slot.data" />
      </template>
    </FormDialog>
    <FormDialog
      ref="exrtaForm"
      :title="extraFormDialogParams.title"
      :dialog-visible.sync="extraFormDialogParams.visible"
      :form.sync="extraFormDialogParams.form"
      :form-option="extraFormDialogParams.formOption"
      :data.sync="extraFormDialogParams.data"
      :select-list.sync="selectList"
      @dialogClose="dialogClose"
      @confirm="params => extraFormDialogParams.confirm({params,next: () => extraFormDialogParams.visible = false})"
      @selectChange="(data) => renderSelect({ ref: 'exrtaForm', ...data })"
      @cascaderLoad="(params) => cascaderLoad({ ...params, ref: 'exrtaForm' })"
      @asyncSelectLoad="(data) => asyncSelectLoad({ ref: 'exrtaForm', ...data })"
    >
      <template v-slot:formCustom="slot">
        <slot name="extraFormCustom" :data="slot.data" />
      </template>
    </FormDialog>
  </el-container>
</template>
<script>
import Filter from '@/components/SearchForm'
import Table from '@/components/BasicTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
export default {
  components: {
    FilterComponent: Filter,
    BasicTable: Table,
    Pagination,
    FormDialog
  },
  props: {
    searchSelectOption: {
      type: Array,
      default() { return [] }
    },
    searchForm: {
      type: Array,
      default() { return [] }
    },
    selectOption: {
      type: Array,
      default() { return [] }
    },
    tableColumns: {
      type: Array,
      default() { return [] }
    },
    tableOption: {
      type: Object,
      default() { return {} }
    },
    topOperationColumn: {
      type: Object,
      default() { return {} }
    },
    addFormOption: {
      type: Object,
      default() { return {} }
    },
    addForm: {
      type: Array,
      default() { return [] }
    },
    editFormOption: {
      type: Object,
      default() { return {} }
    },
    editForm: {
      type: Array,
      default() { return [] }
    },
    deleteOption: {
      type: Object,
      default() { return {} }
    },
    beforeSearch: {
      type: Function,
      default: null
    },
    pageOption: {
      type: Object,
      default() { return {} }
    }
  },
  data() {
    return {
      getList: null,
      addApi: null,
      editApi: null,
      deleteApi: null,
      getSelects: {},

      selectList: {},
      searchSelectList: {},
      tableData: [],
      total: 0,
      tableSelectionArray: [], // 表格多选数组
      listLoading: false,
      searchFormKey: 0,
      pageParams: {
        page: 1,
        rows: 10
      },
      addFormVisible: false,
      editFormVisible: false,
      editData: {},
      searchSelectReady: true,
      extraFormDialogParams: {
        title: '',
        visible: false,
        form: [],
        formOption: {},
        data: {},
        confirm: () => {}
      }
    }
  },
  created() {
    this.initApi(() => {
      this.initTableList()
    })
  },
  methods: {
    async initApi(callback) {
      // 同步初始化接口，并先行获取下拉列表数据
      if (this.tableOption.module && this.tableOption.funcName) {
        const { module, funcName } = this.tableOption
        this.getList = require('@/api/' + module)[funcName]
      }
      if (this.searchSelectOption.length > 0) {
        if (this.searchForm.some(formItem => Object.prototype.hasOwnProperty.call(formItem, 'value'))) {
          this.searchSelectReady = false
        }
        for (let i = 0; i < this.searchSelectOption.length; i++) {
          const selectOp = this.searchSelectOption[i]
          const { module, funcName, selectKey, relationKey } = selectOp
          if (module && funcName) {
            if (!this.getSelects[selectKey]) {
              this.getSelects[selectKey] = require('@/api/' + module)[funcName]
            }
            if (relationKey) {
              // 有relationKey说明是关联表单，即初始化时不调取接口
              this.$set(this.searchSelectList, selectKey, [])
              continue
            }
            if (Object.prototype.hasOwnProperty.call(selectOp, 'init') && !selectOp.init) {
              // init=true，初始化不调接口
              this.$set(this.searchSelectList, selectKey, [])
              continue
            }
            await this.initSelectList({ ...selectOp, selectDataKey: 'searchSelectList' })
          }
        }
      }
      this.searchSelectReady = true
      if (this.selectOption.length > 0) {
        for (let i = 0; i < this.selectOption.length; i++) {
          const selectOp = this.selectOption[i]
          const { module, funcName, selectKey, relationKey } = selectOp
          if (module && funcName) {
            this.getSelects[selectKey] = require('@/api/' + module)[funcName]
            if (relationKey) {
              this.$set(this.selectList, selectKey, [])
              continue
            }
            if (Object.prototype.hasOwnProperty.call(selectOp, 'init') && !selectOp.init) {
              this.$set(this.selectList, selectKey, [])
              continue
            }
            await this.initSelectList({ ...selectOp, selectDataKey: 'selectList' })
          }
        }
      }
      // 下拉列表渲染完毕回调
      this.$emit('selectReady', {
        selectList: this.selectList,
        searchSelectList: this.searchSelectList
      })
      if (this.addFormOption.module && this.addFormOption.funcName) {
        const { module, funcName } = this.addFormOption
        this.addApi = require('@/api/' + module)[funcName]
      }
      if (this.editFormOption.module && this.editFormOption.funcName) {
        const { module, funcName } = this.editFormOption
        this.editApi = require('@/api/' + module)[funcName]
      }
      if (this.deleteOption.module && this.deleteOption.funcName) {
        const { module, funcName } = this.deleteOption
        this.deleteApi = require('@/api/' + module)[funcName]
      }
      callback && typeof (callback) == 'function' && callback()
    },
    initTableList() {
      if (this.searchForm.some(item => Object.prototype.hasOwnProperty.call(item, 'value'))) {
        // 搜索表单中有默认值value，因此将调用搜索
        this.$nextTick(() => {
          this.search()
        })
        return
      }
      this.getTableData()
    },
    initSelectList({ params, selectKey, label, value, selectDataKey }) {
      // 获取下拉列表数据
      return new Promise((resolve, reject) => {
        this.getSelects[selectKey](params).then(res => {
          let selectData = []
          selectData = res.data.map(item => {
            // 转换数据格式
            return {
              ...item,
              label: item[label],
              value: item[value]
            }
          })
          if (selectDataKey) {
            // 防止搜索和弹窗表单下拉列表数据串线
            this.$set(this[selectDataKey], selectKey, selectData)
          } else {
            this.$set(this.selectList, selectKey, selectData)
            this.$set(this.searchSelectList, selectKey, selectData)
          }
          resolve(selectData)
        }).catch(() => {
          reject()
        })
      })
    },
    search() {
      this.$refs.searchForm.handleSearch()
    },
    handleSearch({ params, initPage = true } = {}) {
      // 搜索回调
      if (initPage) {
        // 初始化分页
        this.pageParams.page = 1
      }
      this.listLoading = true
      if (this.beforeSearch) {
        // 获取筛选数据前回调，next必须调用释放钩子
        this.beforeSearch({
          params,
          next: () => {
            return new Promise(resolve => {
              this.getTableData({ params }).then(data => {
                resolve(data)
              })
            })
          }
        })
      } else {
        this.getTableData({ params })
      }
    },
    getSearchFormParams() {
      // 获取搜索表单参数，用于页面中获取
      return this.$refs.searchForm.getParams()
    },
    getTableData(p = {}) {
      // 获取表格数据
      const { pageParams = this.pageParams, params = {}} = p
      this.listLoading = true
      return new Promise(resolve => {
        const { totalKey } = this.tableOption
        this.getList({ ...pageParams, ...this.tableOption.params, ...params }).then(res => {
          this.tableData = res.data || []
          this.total = Number(res[totalKey || 'count']) || 0
          this.listLoading = false
          resolve(res.data)
        })
      })
    },
    changePage({ pageParams }) {
      // pagination改变回调
      this.pageParams = pageParams
      this.refreshTableData(false)
    },
    refreshTableData(initPage) {
      // 刷新表格数据
      if (this.$refs.searchForm) {
        this.$refs.searchForm.handleSearch(initPage)
      } else {
        this.getTableData()
      }
    },
    confirmSearchForm() {
      // 验证搜索表单
      return new Promise(resolve => {
        this.$refs.searchForm.confirm().then(params => {
          resolve(params)
        })
      })
    },
    confirmAdd(params) {
      // 调取新增接口
      this.addApi(params).then(res => {
        this.$message({
          type: 'success',
          message: '新增成功!'
        })
        this.addFormVisible = false
        this.refreshTableData()
      })
    },
    confirmEdit(params) {
      // 调取编辑接口
      const { idIndex, idKey } = this.editFormOption
      const p = {}
      p[idKey || 'id'] = this.recLookup(this.editData, idIndex || 'id')
      this.editApi({ ...params, ...p }).then(res => {
        this.$message({
          type: 'success',
          message: '编辑成功!'
        })
        this.editFormVisible = false
        this.refreshTableData(false)
        // this.getTableData()
      })
    },
    handleEdit({ row }) {
      // 打开编辑表单弹窗
      const data = JSON.parse(JSON.stringify(row))
      this.editForm.map(item => {
        const { editDataRebuild, key } = item
        if (editDataRebuild && typeof (editDataRebuild) == 'function') {
          // 用于自定义转换返回数据格式
          data[key] = editDataRebuild(row)
        }
      })
      this.editData = data
      const { beforeOpen } = this.editFormOption
      if (beforeOpen && typeof (beforeOpen) == 'function') {
        beforeOpen({ data: row, next: () => {
          this.editFormVisible = true
        } })
        return
      }
      this.editFormVisible = true
    },
    handleDelete({ row }) {
      // 点击删除按钮
      const { ensureTitle, ensureText, confirmButtonText, cancelButtonText, type, params, idKey, idIndex } = this.deleteOption
      this.$confirm(ensureText || '确定要删除该条数据吗?', ensureTitle || '删除', {
        confirmButtonText: confirmButtonText || '确定',
        cancelButtonText: cancelButtonText || '取消',
        type: type || 'warning'
      }).then(() => {
        const p = {}
        p[idKey || 'id'] = this.recLookup(row, idIndex || 'id')
        this.deleteApi({ ...params, ...p }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // this.getTableData()
          if (this.total % this.pageParams.rows == 1 && this.pageParams.page > 1) {
            this.pageParams.page--
          }
          this.refreshTableData(false)
        })
      })
    },
    dialogClose() {
      // 表单关闭回调
      Object.keys(this.selectList).map(key => {
        const option = this.selectOption.find(option => option.selectKey == key)
        const { relationKey } = option
        if (relationKey || (Object.prototype.hasOwnProperty.call(option, 'init') && !option.init)) {
          // 有关联表单，清空数据
          delete this.selectList[key]
        }
      })
      this.editData = {}
    },
    renderSelect({ ref, value: v, formItem }) {
      // 关联表单搜索
      const { key: parentKey } = formItem
      const relationSelect = this[ref == 'searchForm' ? 'searchSelectOption' : 'selectOption'].find(option => option.relationKey == parentKey)
      if (relationSelect) {
        const { label, value, selectKey, paramsKey, params } = relationSelect
        this.$refs[ref].changeSelectLoading(selectKey, true)
        const p = {}
        p[paramsKey] = v
        this.initSelectList({
          params: { ...(params || {}), ...p },
          label,
          value,
          selectKey,
          selectDataKey: ref == 'searchForm' ? 'searchSelectList' : 'selectList'
        }).then(() => {
          this.$refs[ref].changeSelectLoading(selectKey, false)
        })
      }
    },
    cascaderLoad({ ref, node, resolve, formItem }) {
      // 级联选择器获取数据
      const { selectKey } = formItem
      if (selectKey) {
        const { value: cascaderValue } = node
        const cascaderSelect = (ref == 'searchForm' ? this.searchSelectOption : this.selectOption).find(option => option.selectKey == selectKey)
        const { paramsKey, params, label, value } = cascaderSelect
        const p = {}
        p[paramsKey] = cascaderValue
        this.getSelects[selectKey]({ ...(params || {}), ...p }).then(res => {
          resolve(res.data.map(item => {
            return {
              ...item,
              label: item[label],
              value: item[value]
            }
          }))
        })
      }
    },
    asyncSelectLoad({ ref, query, formItem, next }) {
      // 异步搜索类下拉列表获取数据方法
      const { selectKey } = formItem
      const asyncLoadSelect = this.selectOption.find(option => option.selectKey == selectKey)
      const { paramsKey, params, label, value } = asyncLoadSelect
      const p = {}
      p[paramsKey] = query
      this.initSelectList({ params: { ...(params || {}), ...p }, selectKey, label, value, selectDataKey: ref == 'searchForm' ? 'searchSelectList' : 'selectList' }).then((selectData) => {
        if (next) {
          next(selectData)
        }
      })
    },
    initFormDialog(params) {
      // 额外需要生成表单弹窗方法，通常在页面中使用
      this.extraFormDialogParams = {
        title: '',
        visible: false,
        form: [],
        formOption: {
          labelWidth: '100px',
          module: '',
          funcName: '',
          idIndex: 'id',
          idKey: 'id',
          messageText: ''
        },
        data: {},
        confirm: ({ params: dataParams, next }) => {
          const { formOption: { module, funcName, idIndex, idKey, messageText }} = params
          const api = require(`@/api/${module}`)[funcName]
          const p = {}
          if (params.data) {
            p[idKey || 'id'] = this.recLookup(params.data, idIndex || 'id')
          }
          api({ ...dataParams, ...p }).then(res => {
            this.$message({
              type: 'success',
              message: messageText || '操作成功'
            })
            next()
            this.refreshTableData(false)
          })
        }
      }
      Object.keys(params).map(key => {
        this.extraFormDialogParams[key] = params[key]
      })
      this.extraFormDialogParams.visible = true
    },
    recLookup(obj, path) {
      const parts = path.split('.')
      if (parts.length === 1) {
        return obj[parts[0]]
      }
      return this.recLookup(obj[parts[0]], parts.slice(1).join('.'))
    }
  }
}
</script>
<style lang="scss" scoped>
.table_container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.search-container {
  padding: 20px 20px 10px;
}
</style>
