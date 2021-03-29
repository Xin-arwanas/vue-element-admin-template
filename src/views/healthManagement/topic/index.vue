<template>
  <div>
    <TableComponent
      ref="mainTable"
      :table-columns="tableColumns"
      :table-option="tableOption"
      :select-option="selectOption"
      :add-form-option="addFormOption"
      :add-form.sync="addForm"
      :edit-form-option="editFormOption"
      :edit-form.sync="editForm"
      :delete-option="deleteOption"
    >
      <template v-slot:custom="{ data: { row,col } }">
        <div v-if="col.dataIndex == 'type'">
          {{ type[row.type] }}
        </div>
        <div v-if="col.dataIndex == 'status'">
          <el-tag
            :type="row.status == 1?'success':'info'"
          >{{ row.status == 0?'未上线':'已上线' }}</el-tag>
        </div>
      </template>
      <template v-slot:extraTableActionFront="{ data: { row } }">
        <el-button
          type="warning"
          size="mini"
          icon="el-icon-top"
          @click="handleSort(row,'up')"
        >上移</el-button>
        <el-button
          type="warning"
          size="mini"
          icon="el-icon-bottom"
          @click="handleSort(row,'down')"
        >下移</el-button>
        <el-button
          :type="row.status == 0?'success':'info'"
          size="mini"
          @click="handleOnline(row)"
        >
          {{ row.status == 0?'上线':'下线' }}
        </el-button>
      </template>
    </TableComponent>
  </div>
</template>
<script>
import TableComponent from '@/components/TableComponent'
import { moveSort, enableAndDisable } from '@/api/healthManagement'
export default {
  components: {
    TableComponent
  },
  data() {
    return {
      type: {
        'radio': '单选题',
        'check': '多选题'
      },
      selectOption: [],
      tableOption: {
        module: 'healthManagement',
        funcName: 'getEpidemicQuestions',
        needSelection: false,
        needEdit: true,
        needDelete: true,
        params: {},
        actionWidth: 400,
        dragable: false
      },
      tableColumns: [
        {
          label: '题型',
          dataIndex: 'type',
          width: 150,
          type: 'custom'
        },
        {
          label: '题目',
          dataIndex: 'desc'
        },
        {
          label: '状态',
          dataIndex: 'status',
          width: 150,
          type: 'custom'
        }
      ],
      addFormOption: {
        labelWidth: '80px',
        module: 'healthManagement',
        funcName: 'addEpidemicQuestion'
      },
      addForm: [
        {
          label: '题型',
          type: 'select',
          key: 'type',
          placeholder: '请选择题型',
          options: [
            {
              label: '单选题',
              value: 'radio'
            },
            {
              label: '多选题',
              value: 'check'
            }
          ],
          rules: [
            {
              required: true, message: '请选择题型', trigger: 'change'
            }
          ]
        },
        {
          label: '题目',
          type: 'string',
          key: 'desc',
          placeholder: '请填写题目',
          rules: [
            {
              required: true, message: '请填写题目', trigger: 'blur'
            }
          ]
        },
        {
          label: '选项',
          type: 'dynamic',
          key: 'options',
          needIndex: true,
          indexType: 'letter',
          formOption: {
            labelWidth: '80px'
          },
          form: [
            {
              label: '',
              labelWidth: '0',
              key: 'desc',
              type: 'string',
              placeholder: '请填写选项',
              rules: [
                {
                  required: true, message: '请填写选项', trigger: 'blur'
                }
              ]
            }
          ],
          rules: [
            {
              required: true, message: '请至少填写一个选项', trigger: 'blur'
            }
          ]
        }
      ],
      editFormOption: {
        labelWidth: '80px',
        module: 'healthManagement',
        funcName: 'updateEpidemicQuestion'
      },
      editForm: [
        {
          label: '题型',
          type: 'select',
          key: 'type',
          placeholder: '请选择题型',
          options: [
            {
              label: '单选题',
              value: 'radio'
            },
            {
              label: '多选题',
              value: 'check'
            }
          ],
          rules: [
            {
              required: true, message: '请选择题型', trigger: 'change'
            }
          ]
        },
        {
          label: '题目',
          type: 'string',
          key: 'desc',
          placeholder: '请填写题目',
          rules: [
            {
              required: true, message: '请填写题目', trigger: 'blur'
            }
          ]
        },
        {
          label: '选项',
          type: 'dynamic',
          key: 'options',
          needIndex: true,
          indexType: 'letter',
          formOption: {
            labelWidth: '80px'
          },
          form: [
            {
              label: '',
              labelWidth: '0',
              key: 'desc',
              type: 'string',
              placeholder: '请填写选项',
              rules: [
                {
                  required: true, message: '请填写选项', trigger: 'blur'
                }
              ]
            }
          ],
          rules: [
            {
              required: true, message: '请至少填写一个选项', trigger: 'blur'
            }
          ]
        }
      ],
      deleteOption: {
        module: 'healthManagement',
        funcName: 'deleteEpidemicQuestion',
        ensureText: '确定要删除这道题吗？'
      }
    }
  },
  methods: {
    handleSort(row, direction) {
      const { id } = row
      moveSort({ id, direction }).then(() => {
        this.$refs.mainTable.refreshTableData()
      })
    },
    handleOnline(row) {
      const { id } = row
      enableAndDisable({ id }).then(() => {
        this.$refs.mainTable.refreshTableData()
      })
    }
  }
}
</script>
