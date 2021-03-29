<template>
  <div>
    <TableComponent
      ref="mainTable"
      :table-columns="tableColumns"
      :table-option="tableOption"
      :search-select-option="searchSelectOption"
      :search-form="searchForm"
      :top-operation-column="topOperationColumn"
      :edit-form.sync="editForm"
      :edit-form-option="editFormOption"
    />
  </div>
</template>
<script>
import TableComponent from '@/components/TableComponent'
import { mapState } from 'vuex'
export default {
  components: {
    TableComponent
  },
  data() {
    return {
      selectOption: [],
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
          rules: [
            { required: true, message: '请选择学校', trigger: 'change' }
          ]
        },
        {
          type: 'select',
          key: 'class_id',
          placeholder: '请选择班级',
          label: '班级:',
          labelWidth: '120',
          selectKey: 'classSelect',
          rules: [
            { required: true, message: '请选择班级', trigger: 'change' }
          ]
        },
        {
          type: 'date',
          key: 'date',
          placeholder: '请选择日期（空取当天）',
          label: '日期',
          labelWidth: '120'
        },
        {
          type: 'string',
          key: 'name',
          placeholder: '请填写姓名',
          label: '姓名',
          labelWidth: '120'
        }
      ],
      tableOption: {
        module: 'healthManagement',
        funcName: 'getEpidemicRecord',
        needSelection: false,
        needEdit: true,
        needDelete: false,
        params: {},
        actionWidth: 200,
        editText: '查看详情'
      },
      tableColumns: [
        {
          label: '姓名',
          dataIndex: 's_name'
        },
        {
          label: '日期',
          dataIndex: 'date'
        }
      ],
      topOperationColumn: {
        needAdd: false,
        needOperationColumn: false
      },
      editFormOption: {
        labelWidth: '120px',
        needFooter: false,
        title: '详情'
      },
      editForm: [
        {
          label: '',
          labelWidth: '0',
          type: 'dynamic',
          key: 'list',
          formOption: {
            labelWidth: '80px'
          },
          form: [
            {
              label: '题目',
              key: 'question',
              type: 'string',
              readOnly: true
            },
            {
              label: '答案',
              key: 'select',
              type: 'dynamic',
              readOnly: true,
              formOption: {
                labelWidth: '0',
                needIndex: true
              },
              form: [
                {
                  label: '',
                  key: 'desc',
                  type: 'string',
                  readOnly: true
                }
              ]
            }
          ],
          readOnly: true
        }
      ]
    }
  },
  computed: {
    ...mapState('user', ['role'])
  },
  created() {
    if (this.role == 7) {
      this.searchSelectOption = []
      this.searchForm = [
        {
          type: 'date',
          key: 'date',
          placeholder: '请选择日期（空取当天）',
          label: '日期',
          labelWidth: '120'
        },
        {
          type: 'string',
          key: 'name',
          placeholder: '请填写姓名',
          label: '姓名',
          labelWidth: '120'
        }
      ]
    }
  },
  methods: {}
}
</script>
