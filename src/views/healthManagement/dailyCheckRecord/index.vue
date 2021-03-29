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
          placeholder: '请选择日期',
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
        funcName: 'getDailyCheckRecord',
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
          label: '晨检人',
          dataIndex: 't_name'
        },
        {
          label: '时间',
          dataIndex: 'ctime'
        }
      ],
      topOperationColumn: {
        needAdd: false,
        needOperationColumn: false
      },
      editFormOption: {
        labelWidth: '170px',
        needFooter: false,
        title: '详情'
      },
      editForm: [
        {
          label: '精神状态',
          type: 'select',
          key: 'mind',
          placeholder: ' ',
          options: [
            {
              label: '好',
              value: 'y'
            },
            {
              label: '不好',
              value: 'n'
            }
          ],
          readOnly: true
        },
        {
          label: '精神状态备注',
          type: 'string',
          key: 'mind_remark',
          placeholder: '',
          readOnly: true
        },
        {
          label: '皮肤状态',
          type: 'select',
          key: 'skin',
          placeholder: ' ',
          options: [
            {
              label: '好',
              value: 'y'
            },
            {
              label: '不好',
              value: 'n'
            }
          ],
          readOnly: true
        },
        {
          label: '皮肤状态备注',
          type: 'string',
          key: 'skin_remark',
          placeholder: '',
          readOnly: true
        },
        {
          label: '是否饮食',
          type: 'select',
          key: 'diet',
          placeholder: ' ',
          options: [
            {
              label: '是',
              value: 'y'
            },
            {
              label: '否',
              value: 'n'
            }
          ],
          readOnly: true
        },
        {
          label: '是否饮食备注',
          type: 'string',
          key: 'diet_remark',
          placeholder: '',
          readOnly: true
        },
        {
          label: '睡眠状况',
          type: 'select',
          key: 'sleep',
          placeholder: ' ',
          options: [
            {
              label: '好',
              value: 'y'
            },
            {
              label: '不好',
              value: 'n'
            }
          ],
          readOnly: true
        },
        {
          label: '睡眠状况备注',
          type: 'string',
          key: 'sleep_remark',
          placeholder: '',
          readOnly: true
        },
        {
          label: '有无大便',
          type: 'select',
          key: 'poop',
          placeholder: ' ',
          options: [
            {
              label: '有',
              value: 'y'
            },
            {
              label: '无',
              value: 'n'
            }
          ],
          readOnly: true
        },
        {
          label: '有无大便备注',
          type: 'string',
          key: 'poop_remark',
          placeholder: '',
          readOnly: true
        },
        {
          label: '是否带药',
          type: 'select',
          key: 'medicine',
          placeholder: ' ',
          options: [
            {
              label: '是',
              value: 'y'
            },
            {
              label: '否',
              value: 'n'
            }
          ],
          readOnly: true
        },
        {
          label: '是否带药备注',
          type: 'string',
          key: 'medicine_remark',
          placeholder: '',
          readOnly: true
        },
        {
          label: '有无玩具',
          type: 'select',
          key: 'toy',
          placeholder: ' ',
          options: [
            {
              label: '有',
              value: 'y'
            },
            {
              label: '无',
              value: 'n'
            }
          ],
          readOnly: true
        },
        {
          label: '有无玩具备注',
          type: 'string',
          key: 'toy_remark',
          placeholder: '',
          readOnly: true
        },
        {
          label: '指甲状况',
          type: 'select',
          key: 'nail',
          placeholder: ' ',
          options: [
            {
              label: '好',
              value: 'y'
            },
            {
              label: '不好',
              value: 'n'
            }
          ],
          readOnly: true
        },
        {
          label: '指甲状况备注',
          type: 'string',
          key: 'nail_remark',
          placeholder: '',
          readOnly: true
        },
        {
          label: '有无危险（贵重）品',
          type: 'select',
          key: 'nail',
          placeholder: ' ',
          options: [
            {
              label: '有',
              value: 'y'
            },
            {
              label: '无',
              value: 'n'
            }
          ],
          readOnly: true
        },
        {
          label: '有无危险（贵重）品备注',
          type: 'string',
          key: 'nail_remark',
          placeholder: '',
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
          placeholder: '请选择日期',
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
