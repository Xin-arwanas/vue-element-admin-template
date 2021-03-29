<template>
  <div>
    <TableComponent
      ref="mainTable"
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
      <template slot="topOperations">
        <!-- <el-button size="small" type="primary" @click="importVisible=true">导入学生</el-button> -->
        <el-button
          size="small"
          type="primary"
          @click="handleImport"
        >导入学生</el-button>
      </template>
      <template v-slot:custom="{ data: { row, col } }">
        <div v-if="col.label == '性别'">
          {{ sexMap[row.sex] }}
        </div>
        <div v-if="col.label == '是否毕业'">
          <el-tag
            :type="row.up_status == 0?'success':'info'"
          >{{ row.up_status == 1?'毕业':'在读' }}</el-tag>
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
      selectOption: [
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
        },
        {
          module: 'common',
          funcName: 'getnationality',
          selectKey: 'nationalSelect',
          label: 'name',
          value: 'id'
        },
        {
          module: 'personManagement',
          funcName: 'getAgentUuid',
          selectKey: 'memberSelect',
          paramsKey: 'filter',
          label: 'name',
          value: 'uuid',
          init: false
        },
        {
          module: 'personManagement',
          funcName: 'getParentUuid',
          selectKey: 'parentSelect',
          paramsKey: 'filter',
          label: 'concat_name',
          value: 'uuid',
          init: false
        }
      ],
      searchSelectOption: [],
      searchForm: [
        {
          type: 'select',
          key: 'school_code',
          placeholder: '请选择学校',
          label: '学校:',
          labelWidth: '120',
          selectKey: 'schoolSelect'
        },
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
        }
      ],
      tableOption: {
        module: 'personManagement',
        funcName: 'getStudentList',
        needSelection: false,
        needEdit: true,
        needDelete: true,
        params: {},
        actionWidth: 300
      },
      tableColumns: [
        {
          label: '姓名',
          dataIndex: 'name'
        },
        {
          label: '小名',
          dataIndex: 'nick_name'
        },
        {
          label: '性别',
          dataIndex: 'sex',
          type: 'custom'
        },
        {
          label: '生日',
          dataIndex: 'birth_day'
        },
        {
          label: '学校',
          dataIndex: 'school_name'
        },
        {
          label: '班级',
          dataIndex: 'class_name'
        },
        {
          label: '是否毕业',
          dataIndex: 'up_status',
          type: 'custom'
        }
      ],
      topOperationColumn: {
        needAdd: true,
        addText: '录入新学生'
      },
      addFormOption: {
        labelWidth: '160px',
        module: 'personManagement',
        funcName: 'createBabyClient'
      },
      addForm: [
        {
          label: '姓名',
          key: 'name',
          type: 'string',
          placeholder: '请填写姓名',
          rules: [
            { required: true, message: '请填写姓名', trigger: 'blur' }
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
          label: '出生日期',
          key: 'birth_day',
          type: 'date',
          placeholder: '请选择出生日期',
          rules: [
            { required: true, message: '请选择出生日期', trigger: 'blur' }
          ]
        },
        {
          label: '来源渠道',
          key: 'client_way',
          type: 'select',
          placeholder: '请选择来源渠道',
          options: [
            {
              label: '上门',
              value: '上门'
            },
            {
              label: '大众',
              value: '大众'
            },
            {
              label: '转介绍',
              value: '转介绍'
            }
          ],
          rules: [
            { required: true, message: '请选择来源渠道', trigger: 'change' }
          ]
        },
        {
          label: '介绍人（宝宝姓名）',
          key: 'agent_uuid',
          type: 'asyncSelect',
          selectKey: 'memberSelect',
          hide: true,
          showKey: 'client_way',
          showId: '转介绍',
          placeholder: '请选择介绍人（宝宝姓名）',
          rules: [
            { required: true, message: '请选择介绍人（宝宝姓名）', trigger: 'change' }
          ]
        },
        {
          label: '与宝宝的关系',
          key: 'agent_relation',
          type: 'select',
          hide: true,
          showKey: 'client_way',
          showId: '转介绍',
          placeholder: '请选择与宝宝的关系',
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
          ]
        },
        {
          label: '小名',
          key: 'nick_name',
          type: 'string',
          placeholder: '请填写小名'
        },
        {
          label: '父亲姓名',
          key: 'father_name',
          type: 'string',
          placeholder: '请填写父亲姓名'
        },
        {
          label: '父亲电话',
          key: 'father_phone',
          type: 'phone',
          placeholder: '请填写父亲电话号码'
        },
        {
          label: '母亲姓名',
          key: 'mother_name',
          type: 'string',
          placeholder: '请填写母亲姓名'
        },
        {
          label: '母亲电话',
          key: 'mother_phone',
          type: 'phone',
          placeholder: '请填写母亲电话号码'
        }
      ],
      editFormOption: {
        labelWidth: '160px',
        module: 'personManagement',
        funcName: 'updateStudent',
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
          label: '学校',
          key: 'school_code',
          placeholder: '请选择学校',
          type: 'select',
          selectKey: 'schoolSelect',
          rules: [
            { required: true, message: '请选择学校', trigger: 'change' }
          ]
        },
        {
          label: '班级',
          key: 'class_id',
          placeholder: '请选择班级',
          type: 'select',
          selectKey: 'classSelect',
          rules: [
            { required: true, message: '请选择班级', trigger: 'change' }
          ]
        },
        {
          label: '来源渠道',
          key: 'client_way',
          type: 'select',
          placeholder: '请选择来源渠道',
          options: [
            {
              label: '上门',
              value: '上门'
            },
            {
              label: '大众',
              value: '大众'
            },
            {
              label: '转介绍',
              value: '转介绍'
            }
          ],
          rules: [
            { required: true, message: '请选择来源渠道', trigger: 'change' }
          ]
        },
        {
          label: '介绍人（宝宝姓名）',
          key: 'agent_uuid',
          type: 'asyncSelect',
          selectKey: 'memberSelect',
          hide: true,
          showKey: 'client_way',
          showId: '转介绍',
          placeholder: '请选择介绍人（宝宝姓名）',
          rules: [
            { required: true, message: '请选择介绍人（宝宝姓名）', trigger: 'change' }
          ]
        },
        {
          label: '与宝宝的关系',
          key: 'agent_relation',
          type: 'select',
          hide: true,
          showKey: 'client_way',
          showId: '转介绍',
          placeholder: '请选择与宝宝的关系',
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
          ]
        },
        {
          label: '会员状态',
          key: 'client_status',
          type: 'select',
          placeholder: '请选择会员状态',
          options: [
            {
              label: '毕业会员',
              value: '毕业会员'
            },
            {
              label: '在读会员',
              value: '在读会员'
            },
            {
              label: '未入园会员',
              value: '未入园会员'
            }
          ],
          rules: [
            { required: true, message: '请选择会员状态', trigger: 'change' }
          ]
        },
        {
          label: '绑定家长',
          type: 'dynamic',
          key: 'parents',
          formOption: {
            labelWidth: '50px',
            inline: true
          },
          form: [
            {
              label: '姓名',
              key: 'uuid',
              type: 'asyncSelect',
              selectKey: 'parentSelect',
              placeholder: '请选择家长',
              style: { width: '200px' },
              rules: [
                { required: true, message: '请选择家长', trigger: 'change' }
              ]
            },
            {
              label: '关系',
              key: 'relation',
              type: 'select',
              placeholder: '请选择与宝宝的关系',
              style: { width: '180px' },
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
            // {
            //   label: '手机号',
            //   key: 'phone',
            //   type: 'phone',
            //   selectKey: 'parentSelect',
            //   placeholder: '请填写手机号',
            //   style: { width: '200px' },
            //   rules: [
            //     { required: true, message: '请填写手机号', trigger: 'change' }
            //   ]
            // }
          ]
        },
        {
          label: '入园时间',
          key: 'in_date',
          type: 'date',
          placeholder: '请选择入园时间'
        },
        {
          label: '小名',
          key: 'nick_name',
          type: 'string',
          placeholder: '请填写小名'
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
          type: 'student'
        },
        idKey: 'uuid',
        idIndex: 'uuid'
      },
      importSelectList: {
        schoolSelect: [],
        classSelect: []
      },
      importVisible: false,
      importFormOption: {
        labelWidth: '80px',
        module: 'personManagement',
        funcName: 'importStudents',
        messageText: '导入成功!'
      },
      importForm: [
        {
          label: '学校',
          type: 'select',
          selectKey: 'schoolSelect',
          placeholder: '请选择学校',
          key: 'school_code',
          rules: [
            { required: true, message: '请选择学校', trigger: 'change' }
          ]
        },
        {
          label: '班级',
          type: 'select',
          selectKey: 'classSelect',
          placeholder: '请选择班级',
          key: 'class_id',
          rules: [
            { required: true, message: '请选择班级', trigger: 'change' }
          ]
        },
        {
          label: '文件',
          key: 'url',
          type: 'upload',
          uploadType: 'excel',
          max: 1,
          uploadName: 'file',
          rules: [
            { required: true, message: '请选择文件', trigger: 'change' }
          ]
        }
      ]
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
    handleImport() {
      this.$refs.mainTable.initFormDialog({
        title: '导入学生',
        formOption: this.importFormOption,
        form: this.importForm
      })
    }
  }
}
</script>
