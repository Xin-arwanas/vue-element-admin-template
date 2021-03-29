<template>
  <div class="babyWork">
    <TableComponent
      ref="table"
      :search-form="searchForm"
      :top-operation-column="topOperationColumn"
      :table-columns="tableColumns"
      :table-option="tableOption"
      :add-form="addForm"
      :add-form-option="addFormOption"
      :delete-option="deleteOption"
    >
      <template v-slot:extraTableActionFront="{ data: { row } }">
        <el-button
          v-if="row.level < 2"
          type="success"
          size="mini"
          @click="handleAddWork(row)"
        >添加工作</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="handleEdit(row)"
        >编辑</el-button>
      </template>
    </TableComponent>
  </div>
</template>
<script>
import TableComponent from '@/components/TableComponent'
import { addWorkType } from '@/api/studyManagement'
export default {
  components: {
    TableComponent
  },
  data() {
    return {
      selectOption: [],
      searchForm: [],
      topOperationColumn: {
        needAdd: true
      },
      tableOption: {
        module: 'studyManagement',
        funcName: 'getWorkTypeList',
        needSelection: false,
        needEdit: false,
        needDelete: true,
        actionWidth: 300,
        params: {},
        treeChildrenKey: 'list'
      },
      tableColumns: [
        {
          label: '工作名称',
          dataIndex: 'name'
        },
        {
          label: '班级',
          dataIndex: 'class_type'
        }
      ],
      addFormOption: {
        module: 'studyManagement',
        funcName: 'addWorkType',
        labelWidth: '150px'
      },
      addForm: [
        {
          label: '工作领域分类',
          key: 'name',
          type: 'string',
          placeholder: '请填写工作领域分类',
          rules: [
            {
              required: true, message: '请填写工作领域分类', trigger: 'blur'
            }
          ]
        },
        {
          label: '工作匹配班级',
          key: 'class_type',
          placeholder: '请选择工作匹配班级',
          type: 'select',
          options: [
            {
              label: 'IC',
              value: 'IC'
            },
            {
              label: 'CASA',
              value: 'CASA'
            }
          ],
          rules: [
            {
              required: true, message: '请选择班级', trigger: 'change'
            }
          ]
        }
      ],
      editFormOption: {
        module: 'studyManagement',
        funcName: 'updateWorkType',
        labelWidth: '120px',
        messageText: '编辑成功'
      },
      editForm: [
        {
          label: '工作名称',
          key: 'name',
          type: 'string',
          placeholder: '请填写工作名称',
          rules: [
            {
              required: true, message: '请填写工作名称', trigger: 'blur'
            }
          ]
        },
        {
          label: '班级',
          key: 'class_type',
          placeholder: '请选择班级',
          type: 'select',
          options: [
            {
              label: 'IC',
              value: 'IC'
            },
            {
              label: 'CASA',
              value: 'CASA'
            }
          ],
          rules: [
            {
              required: true, message: '请选择班级', trigger: 'change'
            }
          ]
        }
      ],
      deleteOption: {
        module: 'studyManagement',
        funcName: 'deleteWorkType'
      },
      nodeAddFormOption: {
        module: 'studyManagement',
        funcName: 'addWorkType',
        labelWidth: '120px'
      },
      nodeAddForm: [
        {
          label: '工作名称',
          key: 'name',
          type: 'string',
          placeholder: '请填写工作名称',
          rules: [
            {
              required: true, message: '请填写工作名称', trigger: 'blur'
            }
          ]
        }
      ],
      uploadLoading: false
    }
  },
  methods: {
    handleAddWork(row) {
      this.$refs.table.initFormDialog({
        title: '添加',
        formOption: this.nodeAddFormOption,
        form: this.nodeAddForm,
        confirm: ({ params, next }) => {
          this.confirmNodeAdd({ ...params, pid: row.id }).then(() => {
            next()
          })
        }
      })
    },
    confirmNodeAdd(params) {
      return new Promise(resolve => {
        addWorkType(params).then(() => {
          this.$message({
            type: 'success',
            message: '新增成功!'
          })
          this.$refs.table.refreshTableData()
          resolve()
        })
      })
    },
    handleEdit(row) {
      const { pid } = row
      if (pid == 0) {
        this.editForm = [
          {
            label: '工作领域分类',
            key: 'name',
            type: 'string',
            placeholder: '请填写工作领域分类',
            rules: [
              {
                required: true, message: '请填写工作领域分类', trigger: 'blur'
              }
            ]
          },
          {
            label: '工作匹配班级',
            key: 'class_type',
            placeholder: '请选择工作匹配班级',
            type: 'select',
            options: [
              {
                label: 'IC',
                value: 'IC'
              },
              {
                label: 'CASA',
                value: 'CASA'
              }
            ],
            rules: [
              {
                required: true, message: '请选择工作匹配班级', trigger: 'change'
              }
            ]
          }
        ]
      } else {
        this.editForm = [
          {
            label: '工作名称',
            key: 'name',
            type: 'string',
            placeholder: '请填写工作名称',
            rules: [
              {
                required: true, message: '请填写工作名称', trigger: 'blur'
              }
            ]
          }
        ]
      }
      this.$refs.table.initFormDialog({
        title: '编辑',
        formOption: this.editFormOption,
        form: this.editForm,
        data: row
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.babyWork{
  ::v-deep{
    .el-table__row--level-0 td:nth-child(1){
      font-weight:bold;
      color:black;
    }
  }
}
</style>
