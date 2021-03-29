<template>
  <div>
    <TableComponent
      ref="mainTable"
      :search-select-option="searchSelectOption"
      :search-form="searchForm"
      :top-operation-column="topOperationColumn"
      :table-columns="tableColumns"
      :table-option="tableOption"
      :select-option="selectOption"
      :edit-form-option="editFormOption"
      :edit-form.sync="editForm"
    >
      <template v-slot:custom="{ data: { row,col } }">
        <div v-if="col.dataIndex == 'status'">
          <el-tag
            :type="statusMap[row.status].type"
          >{{ statusMap[row.status].text }}</el-tag>
        </div>
      </template>
    </TableComponent>
  </div>
</template>
<script>
import TableComponent from '@/components/TableComponent'
export default {
  components: {
    TableComponent
  },
  data() {
    return {
      statusMap: {
        1: {
          type: 'success',
          text: '正常'
        },
        2: {
          type: 'warning',
          text: '停用'
        },
        3: {
          type: 'danger',
          text: '故障'
        }
      },
      selectOption: [
        {
          module: 'parkManagement',
          funcName: 'getClassCode',
          selectKey: 'classSelect',
          label: 'class_name',
          value: 'class_id',
          init: false,
          params: {
            school_code: ''
          }
        }
      ],
      searchSelectOption: [
        {
          module: 'parkManagement',
          funcName: 'getschoolcode',
          selectKey: 'schoolSelect',
          label: 'name',
          value: 'code'
        },
        {
          module: 'parkManagement',
          funcName: 'getClassCode',
          relationKey: 'school_code',
          paramsKey: 'school_code',
          selectKey: 'classSelect',
          label: 'class_name',
          value: 'class_id'
        }
      ],
      searchForm: [
        {
          type: 'select',
          key: 'school_code',
          placeholder: '请选择学校',
          label: '学校:',
          labelWidth: '120',
          selectKey: 'schoolSelect',
          clearable: false,
          value: 1
        },
        {
          type: 'select',
          key: 'class_id',
          placeholder: '请选择班级',
          label: '班级:',
          labelWidth: '120',
          selectKey: 'classSelect'
        }
      ],
      topOperationColumn: {
        needOperationColumn: false,
        needAdd: false
      },
      tableOption: {
        module: 'parkManagement',
        funcName: 'getCameraList',
        needSelection: false,
        needEdit: true,
        needDelete: false,
        params: {},
        actionWidth: 300
      },
      tableColumns: [
        {
          label: '名称',
          dataIndex: 'title'
        },
        {
          label: '班级',
          dataIndex: 'class_name'
        },
        {
          label: '封面图',
          type: 'image',
          dataIndex: 'camera_pic'
        },
        {
          label: '状态',
          dataIndex: 'status',
          type: 'custom'
        }
      ],
      editFormOption: {
        labelWidth: '120px',
        module: 'parkManagement',
        funcName: 'editCamera',
        beforeOpen: ({ data, next }) => {
          this.selectOption[0].params.school_code = data.school_code
          this.$refs.mainTable.initSelectList({ ...this.selectOption[0], selectDataKey: 'selectList' }).then(() => {
            next()
          })
        }
      },
      editForm: [
        {
          label: '监控名称',
          key: 'title',
          type: 'string',
          placeholder: '请填写监控名称',
          rules: [
            {
              required: true, message: '请填写监控名称', trigger: 'blur'
            }
          ]
        },
        {
          label: '班级',
          key: 'class_id',
          placeholder: '请选择班级',
          type: 'select',
          selectKey: 'classSelect'
        },
        {
          label: '状态',
          key: 'status',
          placeholder: '请选择状态',
          type: 'select',
          options: [
            {
              label: '正常',
              value: '1'
            },
            {
              label: '停用',
              value: '2'
            },
            {
              label: '故障',
              value: '3'
            }
          ],
          rules: [
            {
              required: true, message: '请选择状态', trigger: 'change'
            }
          ]
        },
        {
          label: '封面图',
          key: 'camera_pic',
          type: 'upload',
          uploadType: 'image',
          uploadName: 'pics',
          uploadParams: {
            type: 'pics'
          },
          max: 1
        }
      ]
    }
  },
  methods: {
  }
}
</script>
