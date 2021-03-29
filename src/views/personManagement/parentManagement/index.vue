<template>
  <div>
    <TableComponent
      :table-columns="tableColumns"
      :table-option="tableOption"
      :search-select-option="searchSelectOption"
      :search-form="searchForm"
      :select-option="selectOption"
      :top-operation-column="topOperationColumn"
      :add-form-option="addFormOption"
      :add-form.sync="addForm"
      :edit-form.sync="editForm"
      :edit-form-option="editFormOption"
      :delete-option="deleteOption"
    >
      <template v-slot:custom="{ data: { row, col } }">
        <div v-if="col.label == '性别'">
          {{ sexMap[row.sex] }}
        </div>
      </template>
    </TableComponent>
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
      sexMap: {
        0: '未知',
        1: '男性',
        2: '女性',
        9: '未说明'
      },
      searchSelectOption: {},
      selectOption: [
        {
          module: 'common',
          funcName: 'getnationality',
          selectKey: 'nationalSelect',
          label: 'name',
          value: 'id'
        },
        {
          module: 'personManagement',
          funcName: 'getBabyUuid',
          selectKey: 'babySelect',
          paramsKey: 'filter',
          label: 'name',
          value: 's_uuid',
          init: false
        }
      ],
      searchForm: [
        {
          type: 'select',
          key: 'school_code',
          placeholder: '请选择学校',
          label: '学校:',
          labelWidth: '80',
          selectKey: 'schoolSelect'
        },
        {
          type: 'select',
          key: 'c_id',
          placeholder: '请选择班级',
          label: '班级:',
          labelWidth: '80',
          selectKey: 'classSelect'
        },
        {
          type: 'string',
          key: 'name',
          placeholder: '请填写家长姓名',
          label: '家长姓名',
          labelWidth: '80'
        },
        {
          type: 'phone',
          key: 'phone',
          placeholder: '请填写手机号',
          label: '手机号',
          labelWidth: '120'
        },
        {
          type: 'string',
          key: 's_name',
          placeholder: '请填写宝宝姓名',
          label: '宝宝姓名',
          labelWidth: '80'
        }
      ],
      tableOption: {
        module: 'personManagement',
        funcName: 'getParentList',
        needSelection: false,
        needEdit: true,
        needDelete: true,
        params: {},
        actionWidth: 300,
        treeChildrenKey: 'null',
        rowKey: 'null'
      },
      tableColumns: [
        {
          label: '姓名',
          dataIndex: 'name'
        },
        {
          label: '手机号',
          dataIndex: 'phone'
        }
      ],
      topOperationColumn: {
        needAdd: true
      },
      addFormOption: {
        labelWidth: '120px',
        module: 'personManagement',
        funcName: 'createParentUser'
      },
      addForm: [
        {
          label: '姓名',
          key: 'name',
          placeholder: '请输入姓名',
          type: 'string',
          rules: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        {
          label: '性别',
          key: 'sex',
          placeholder: '请选择性别',
          type: 'select',
          options: [
            {
              label: '男',
              value: '1'
            },
            {
              label: '女',
              value: '2'
            }
          ],
          rules: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ]
        },
        {
          label: '手机号',
          key: 'phone',
          placeholder: '请输入手机号',
          type: 'phone',
          rules: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ]
        },
        {
          label: '绑定宝宝',
          type: 'dynamic',
          key: 'children',
          formOption: {
            labelWidth: '50px',
            inline: true
          },
          form: [
            {
              label: '姓名',
              key: 's_uuid',
              type: 'asyncSelect',
              selectKey: 'babySelect',
              placeholder: '请选择宝宝',
              style: { width: '150px' },
              rules: [
                { required: true, message: '请选择宝宝', trigger: 'change' }
              ]
            },
            {
              label: '关系',
              key: 'relation',
              type: 'select',
              placeholder: '请选择关系',
              style: { width: '150px' },
              options: [
                {
                  label: '爸爸',
                  value: '01'
                },
                {
                  label: '妈妈',
                  value: '02'
                },
                {
                  label: '爷爷',
                  value: '03'
                },
                {
                  label: '奶奶',
                  value: '04'
                },
                {
                  label: '外公',
                  value: '05'
                },
                {
                  label: '外婆',
                  value: '06'
                },
                {
                  label: '保姆',
                  value: '98'
                },
                {
                  label: '其他',
                  value: '99'
                }
              ],
              rules: [
                { required: true, message: '请选择与宝宝的关系', trigger: 'change' }
              ]
            }
          ]
        },
        {
          label: '证件类型',
          key: 'id_type',
          placeholder: '请选择证件类型',
          type: 'select',
          options: [
            {
              label: '居民身份证',
              value: '111'
            },
            {
              label: '临时居民身份证',
              value: '112'
            },
            {
              label: '户口簿',
              value: '113'
            }
          ]
        },
        {
          label: '身份证',
          key: 'card_id',
          placeholder: '请填写身份证号',
          type: 'string'
        },
        {
          label: '民族',
          key: 'national',
          placeholder: '请选择民族',
          type: 'select',
          selectKey: 'nationalSelect'
        },
        {
          label: '其他联系方式',
          key: 'other_phone',
          placeholder: '请填写其他联系方式',
          type: 'string'
        },
        {
          label: '居住地',
          key: 'residence_addr',
          placeholder: '请填写居住地址',
          type: 'string'
        },
        {
          label: '出生日期',
          key: 'birth_day',
          placeholder: '请选择出生日期',
          type: 'date'
        },
        {
          label: '政治面貌',
          key: 'poly',
          placeholder: '请选择政治面貌',
          type: 'select',
          options: [
            {
              label: '中国共产党党员',
              value: '01'
            },
            {
              label: '中国共产党预备党员',
              value: '02'
            },
            {
              label: '中国共产主义青年团团员',
              value: '03'
            },
            {
              label: '群众',
              value: '13'
            }
          ]
        },
        {
          label: '学历',
          key: 'degree',
          placeholder: '请选择学历',
          type: 'select',
          options: [
            {
              label: '小学',
              value: '81'
            },
            {
              label: '初中',
              value: '71'
            },
            {
              label: '高中',
              value: '61'
            },
            {
              label: '职高',
              value: '44'
            },
            {
              label: '中专',
              value: '41'
            },
            {
              label: '大专',
              value: '31'
            },
            {
              label: '本科',
              value: '21'
            },
            {
              label: '研究生',
              value: '17'
            },
            {
              label: '博士',
              value: '11'
            },
            {
              label: '其他',
              value: '90'
            }
          ]
        },
        {
          label: '国家',
          key: 'country',
          placeholder: '请选择国家',
          type: 'select',
          options: [
            {
              label: '中国',
              value: '156'
            },
            {
              label: '外国',
              value: '200'
            }
          ]
        },
        {
          label: '血型',
          key: 'blood_type',
          placeholder: '请选择血型',
          type: 'select',
          options: [
            {
              label: 'A',
              value: 'a'
            },
            {
              label: 'B',
              value: 'b'
            },
            {
              label: 'AB',
              value: 'ab'
            },
            {
              label: 'O',
              value: 'o'
            },
            {
              label: '未知',
              value: 'n'
            }
          ]
        },
        {
          label: '职业',
          key: 'profession',
          placeholder: '请填写职业',
          type: 'string'
        },
        {
          label: '工作单位',
          key: 'workunit',
          placeholder: '请填写工作单位',
          type: 'string'
        },
        {
          label: '邮箱',
          key: 'email',
          placeholder: '请填写邮箱',
          type: 'email'
        },
        {
          label: '头像',
          key: 'pic_url',
          type: 'upload',
          uploadType: 'image',
          uploadName: 'pics',
          uploadParams: {
            type: 'pics'
          },
          max: 1
        }
      ],
      editFormOption: {
        labelWidth: '120px',
        module: 'personManagement',
        funcName: 'updateParentUser',
        idIndex: 'uuid',
        idKey: 'uuid'
      },
      editForm: [
        {
          label: '姓名',
          key: 'name',
          placeholder: '请输入姓名',
          type: 'string',
          rules: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        {
          label: '性别',
          key: 'sex',
          placeholder: '请选择性别',
          type: 'select',
          options: [
            {
              label: '男',
              value: '1'
            },
            {
              label: '女',
              value: '2'
            }
          ],
          rules: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ]
        },
        {
          label: '手机号',
          key: 'phone',
          placeholder: '请输入手机号',
          type: 'phone',
          rules: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ]
        },
        {
          label: '绑定宝宝',
          type: 'dynamic',
          key: 'children',
          formOption: {
            labelWidth: '50px',
            inline: true
          },
          form: [
            {
              label: '姓名',
              key: 's_uuid',
              type: 'asyncSelect',
              selectKey: 'babySelect',
              placeholder: '请选择宝宝',
              style: { width: '150px' },
              rules: [
                { required: true, message: '请选择宝宝', trigger: 'change' }
              ]
            },
            {
              label: '关系',
              key: 'relation',
              type: 'select',
              placeholder: '请选择关系',
              style: { width: '150px' },
              options: [
                {
                  label: '爸爸',
                  value: '01'
                },
                {
                  label: '妈妈',
                  value: '02'
                },
                {
                  label: '爷爷',
                  value: '03'
                },
                {
                  label: '奶奶',
                  value: '04'
                },
                {
                  label: '外公',
                  value: '05'
                },
                {
                  label: '外婆',
                  value: '06'
                },
                {
                  label: '保姆',
                  value: '98'
                },
                {
                  label: '其他',
                  value: '99'
                }
              ],
              rules: [
                { required: true, message: '请选择与宝宝的关系', trigger: 'change' }
              ]
            }
          ]
        },
        {
          label: '证件类型',
          key: 'id_type',
          placeholder: '请选择证件类型',
          type: 'select',
          options: [
            {
              label: '居民身份证',
              value: '111'
            },
            {
              label: '临时居民身份证',
              value: '112'
            },
            {
              label: '户口簿',
              value: '113'
            }
          ]
        },
        {
          label: '身份证',
          key: 'card_id',
          placeholder: '请填写身份证号',
          type: 'string'
        },
        {
          label: '民族',
          key: 'national',
          placeholder: '请选择民族',
          type: 'select',
          selectKey: 'nationalSelect'
        },
        {
          label: '其他联系方式',
          key: 'other_phone',
          placeholder: '请填写其他联系方式',
          type: 'string'
        },
        {
          label: '居住地',
          key: 'residence_addr',
          placeholder: '请填写居住地址',
          type: 'string'
        },
        {
          label: '出生日期',
          key: 'birth_day',
          placeholder: '请选择出生日期',
          type: 'date'
        },
        {
          label: '政治面貌',
          key: 'poly',
          placeholder: '请选择政治面貌',
          type: 'select',
          options: [
            {
              label: '中国共产党党员',
              value: '01'
            },
            {
              label: '中国共产党预备党员',
              value: '02'
            },
            {
              label: '中国共产主义青年团团员',
              value: '03'
            },
            {
              label: '群众',
              value: '13'
            }
          ]
        },
        {
          label: '学历',
          key: 'degree',
          placeholder: '请选择学历',
          type: 'select',
          options: [
            {
              label: '小学',
              value: '81'
            },
            {
              label: '初中',
              value: '71'
            },
            {
              label: '高中',
              value: '61'
            },
            {
              label: '职高',
              value: '44'
            },
            {
              label: '中专',
              value: '41'
            },
            {
              label: '大专',
              value: '31'
            },
            {
              label: '本科',
              value: '21'
            },
            {
              label: '研究生',
              value: '17'
            },
            {
              label: '博士',
              value: '11'
            },
            {
              label: '其他',
              value: '90'
            }
          ]
        },
        {
          label: '国家',
          key: 'country',
          placeholder: '请选择国家',
          type: 'select',
          options: [
            {
              label: '中国',
              value: '156'
            },
            {
              label: '外国',
              value: '200'
            }
          ]
        },
        {
          label: '血型',
          key: 'blood_type',
          placeholder: '请选择血型',
          type: 'select',
          options: [
            {
              label: 'A',
              value: 'a'
            },
            {
              label: 'B',
              value: 'b'
            },
            {
              label: 'AB',
              value: 'ab'
            },
            {
              label: 'O',
              value: 'o'
            },
            {
              label: '未知',
              value: 'n'
            }
          ]
        },
        {
          label: '职业',
          key: 'profession',
          placeholder: '请填写职业',
          type: 'string'
        },
        {
          label: '工作单位',
          key: 'workunit',
          placeholder: '请填写工作单位',
          type: 'string'
        },
        {
          label: '邮箱',
          key: 'email',
          placeholder: '请填写邮箱',
          type: 'email'
        },
        {
          label: '头像',
          key: 'pic_url',
          type: 'upload',
          uploadType: 'image',
          uploadName: 'pics',
          uploadParams: {
            type: 'pics'
          },
          max: 1
        }
      ],
      deleteOption: {
        module: 'personManagement',
        funcName: 'recycleUser',
        ensureText: '确定要删除该用户吗？',
        params: {
          type: 'parent'
        },
        idKey: 'uuid',
        idIndex: 'uuid'
      }
    }
  },
  computed: {
    ...mapState('user', ['role'])
  },
  created() {
    if (this.role == 4) {
      this.searchSelectOption = [
        {
          module: 'parkManagement',
          funcName: 'getClassCode',
          selectKey: 'classSelect',
          label: 'class_name',
          value: 'class_id'
        }
      ]
      this.searchForm = [
        {
          type: 'select',
          key: 'c_id',
          placeholder: '请选择班级',
          label: '班级:',
          labelWidth: '120',
          selectKey: 'classSelect'
        },
        {
          type: 'string',
          key: 'name',
          placeholder: '请填写姓名',
          label: '姓名',
          labelWidth: '80'
        },
        {
          type: 'phone',
          key: 'phone',
          placeholder: '请填写手机号',
          label: '手机号',
          labelWidth: '120'
        }
      ]
    } else {
      this.searchSelectOption = [
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
      ]
    }
  },
  methods: {
  }
}
</script>
