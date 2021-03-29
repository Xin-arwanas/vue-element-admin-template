<template>
  <div>
    <TableComponent
      ref="table"
      :table-columns="tableColumns"
      :table-option="tableOption"
      :top-operation-column="topOperationColumn"
      :add-form-option="addFormOption"
      :add-form="addForm"
      :edit-form="editForm"
      :edit-form-option="editFormOption"
      :delete-option="deleteOption"
    >
      <template v-slot:extraTableActionFront="{ data: { row } }">
        <el-button
          type="success"
          size="mini"
          @click="handleAddChildNode(row)"
        >添加节点</el-button>
      </template>
    </TableComponent>
  </div>
</template>
<script>
import TableComponent from '@/components/TableComponent'
import { addNode } from '@/api/setting'
export default {
  components: {
    TableComponent
  },
  data() {
    return {
      tableOption: {
        module: 'setting',
        funcName: 'getNode',
        needSelection: false,
        needEdit: true,
        needDelete: true,
        params: {},
        actionWidth: 300,
        treeChildrenKey: 'list'
      },
      tableColumns: [
        {
          label: '名称',
          dataIndex: 'title',
          width: 400
        },
        {
          label: '排序',
          dataIndex: 'sort',
          width: 300
        },
        {
          label: '路由',
          dataIndex: 'jump'
        }
      ],
      topOperationColumn: {
        needAdd: true
      },
      addFormOption: {
        labelWidth: '80px',
        module: 'setting',
        funcName: 'addNode'
      },
      addForm: [
        {
          label: '节点名称',
          key: 'title',
          placeholder: '请输入节点名称',
          type: 'string',
          rules: [
            { required: true, message: '请输入节点名称', trigger: 'blur' }
          ]
        },
        {
          label: '路由',
          key: 'jump',
          placeholder: '请输入路由',
          type: 'string'
        },
        {
          label: '排序',
          key: 'sort',
          placeholder: '请输入排序',
          type: 'string',
          rules: [
            { required: true, message: '请输入排序', trigger: 'blur' }
          ]
        }
      ],
      editFormOption: {
        labelWidth: '80px',
        module: 'setting',
        funcName: 'updateNode'
      },
      editForm: [
        {
          label: '节点名称',
          key: 'title',
          placeholder: '请输入节点名称',
          type: 'string',
          rules: [
            { required: true, message: '请输入节点名称', trigger: 'blur' }
          ]
        },
        {
          label: '路由',
          key: 'jump',
          placeholder: '请输入路由',
          type: 'string'
        },
        {
          label: '排序',
          key: 'sort',
          placeholder: '请输入排序',
          type: 'string',
          rules: [
            { required: true, message: '请输入排序', trigger: 'blur' }
          ]
        }
      ],
      deleteOption: {
        module: 'setting',
        funcName: 'deleteNode'
      }
    }
  },
  methods: {
    handleAddChildNode(row) {
      this.$refs.table.initFormDialog({
        title: '添加',
        form: this.addForm,
        formOption: this.addFormOption,
        confirm: ({ params, next }) => {
          this.confirmNodeAdd({ ...params, pid: row.id }).then(() => {
            next()
          })
        }
      })
    },
    confirmNodeAdd(params) {
      return new Promise(resolve => {
        addNode(params).then(res => {
          this.$message({
            type: 'success',
            message: '新增成功!'
          })
          this.$refs.table.refreshTableData()
          resolve()
        })
      })
    }
  }
}
</script>
