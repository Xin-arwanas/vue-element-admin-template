<template>
  <div>
    <TableComponent
      ref="mainTable"
      :search-form="searchForm"
      :table-columns="tableColumns"
      :table-option="tableOption"
      :select-option="selectOption"
      :top-operation-column="topOperationColumn"
    >
      <template v-slot:custom="{ data: { row, col } }">
        <div v-if="col.label == '性别'">
          {{ sexMap[row.sex] }}
        </div>
      </template>
      <template v-slot:extraTableActionFront="{ data: { row } }">
        <el-button
          type="info"
          size="mini"
          @click="checkDetail(row)"
        >查看详情</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="checkContract(row)"
        >查看合同</el-button>
        <el-button
          type="success"
          size="mini"
          @click="openAddContractForm(row)"
        >新增合同</el-button>
      </template>
    </TableComponent>
    <Dialog :visible.sync="contractDialogVisible" title="合同">
      <div class="dialogWrapper">
        <TableComponent
          :table-columns="contractTableColumns"
          :table-option="contractTableOption"
          :select-option="selectOption"
          :top-operation-column="topOperationColumn"
          :edit-form.sync="contractEditForm"
          :edit-form-option="contractEditFormOption"
          :delete-option="contractDeleteOption"
        />
      </div>
    </Dialog>
  </div>
</template>
<script>
import TableComponent from '@/components/TableComponent'
import { addContract, getClientInfo } from '@/api/memberManagement'
import Dialog from '@/components/Dialog'
export default {
  components: {
    TableComponent,
    Dialog
  },
  data() {
    return {
      sexMap: {
        '0': '未知',
        '1': '男性',
        '2': '女性',
        '9': '未说明'
      },
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
          funcName: 'getAgentUuid',
          selectKey: 'memberSelect',
          paramsKey: 'filter',
          label: 'name',
          value: 'uuid',
          init: false
        }
      ],
      searchForm: [
        {
          type: 'string',
          key: 'name',
          placeholder: '请填写会员姓名',
          label: '会员姓名:',
          labelWidth: '120'
        }
      ],
      topOperationColumn: {
        needOperationColumn: false,
        needAdd: false
      },
      tableOption: {
        module: 'memberManagement',
        funcName: 'getClientBabyList',
        needSelection: false,
        needEdit: false,
        needDelete: false,
        params: {},
        actionWidth: 400
      },
      tableColumns: [
        {
          label: '姓名',
          dataIndex: 'name',
          width: 300
        },
        {
          label: '性别',
          dataIndex: 'sex',
          type: 'custom',
          width: 200
        },
        {
          label: '生日',
          dataIndex: 'birth_day',
          width: 300
        },
        {
          label: '班级',
          dataIndex: 'class_name',
          width: 300
        },
        {
          label: '会员状态',
          dataIndex: 'client_status'
        }
      ],
      contractDialogVisible: false,
      contractTableOption: {
        module: 'memberManagement',
        funcName: 'getContractList',
        actionWidth: 200,
        needEdit: true,
        needDelete: true,
        params: {},
        autoHeight: true
      },
      contractTableColumns: [
        {
          label: '缴费日期',
          dataIndex: 'pay_date',
          width: 150
        },
        {
          label: '缴费性质',
          dataIndex: 'fee_type',
          width: 100
        },
        {
          label: '缴费类型',
          dataIndex: 'fee_period',
          width: 100
        },
        {
          label: '预缴学费金额',
          dataIndex: 'fee',
          width: 150
        },
        {
          label: '预计协议结束时间',
          dataIndex: 'over_date',
          width: 150
        },
        {
          label: '实际协议结束时间',
          dataIndex: 'over_date_real',
          width: 150
        }
      ],
      contractEditFormOption: {
        labelWidth: '140px',
        module: 'memberManagement',
        funcName: 'updateContract'
      },
      contractEditForm: [
        {
          label: '缴费日期',
          key: 'pay_date',
          type: 'date',
          placeholder: '请选择缴费日期',
          rules: [
            { required: true, message: '请选择缴费日期', trigger: 'change' }
          ]
        },
        {
          label: '缴费性质',
          key: 'fee_type',
          type: 'select',
          placeholder: '请选择缴费性质',
          options: [
            {
              label: '新生缴费',
              value: '新生缴费'
            },
            {
              label: '老会员缴费',
              value: '老会员缴费'
            },
            {
              label: '定金',
              value: '定金'
            }
          ],
          rules: [
            { required: true, message: '请选择缴费性质', trigger: 'change' }
          ]
        },
        {
          label: '定金',
          key: 'deposit',
          type: 'float',
          placeholder: '请输入定金',
          hide: true,
          showKey: 'fee_type',
          showId: '定金',
          rules: [
            { required: true, message: '请输入定金', trigger: 'blur' }
          ]
        },
        {
          label: '缴费类型',
          key: 'fee_period',
          type: 'select',
          placeholder: '请选择缴费类型',
          options: [
            {
              label: '半年',
              value: '半年'
            },
            {
              label: '一年',
              value: '一年'
            },
            {
              label: '月付',
              value: '月付'
            }
          ],
          rules: [
            { required: true, message: '请选择缴费类型', trigger: 'change' }
          ]
        },
        {
          label: '预缴费学费金额',
          key: 'fee',
          type: 'float',
          placeholder: '请输入预缴费学费金额',
          rules: [
            { required: true, message: '请输入预缴费学费金额', trigger: 'blur' }
          ]
        },
        {
          label: '预缴费月数',
          key: 'pay_month',
          type: 'select',
          placeholder: '请选择预缴费月数',
          options: [
            {
              label: '1',
              value: '1'
            },
            {
              label: '2',
              value: '2'
            },
            {
              label: '3',
              value: '3'
            },
            {
              label: '4',
              value: '4'
            },
            {
              label: '5',
              value: '5'
            },
            {
              label: '6',
              value: '6'
            },
            {
              label: '7',
              value: '7'
            },
            {
              label: '8',
              value: '8'
            },
            {
              label: '9',
              value: '9'
            },
            {
              label: '10',
              value: '10'
            },
            {
              label: '11',
              value: '11'
            },
            {
              label: '12',
              value: '12'
            }
          ],
          rules: [
            { required: true, message: '请选择预缴费月数', trigger: 'change' }
          ]
        },
        {
          label: '付款方式',
          key: 'pay_way',
          type: 'select',
          placeholder: '请选择付款方式',
          inputable: true,
          options: [
            {
              label: '支付宝',
              value: '支付宝'
            },
            {
              label: '微信',
              value: '微信'
            },
            {
              label: '银行汇款',
              value: '银行汇款'
            }
          ],
          rules: [
            { required: true, message: '请选择付款方式', trigger: 'change' }
          ]
        },
        {
          label: '协议开始时间',
          key: 'start_date',
          type: 'date',
          placeholder: '请选择协议开始时间',
          disabled: true,
          rules: [
            { required: true, message: '请选择协议开始时间', trigger: 'change' }
          ]
        },
        {
          label: '优惠等备注',
          key: 'remark',
          type: 'textarea',
          placeholder: '请填写优惠等备注'
        },
        {
          label: '已缴餐费',
          key: 'food_fee',
          type: 'float',
          placeholder: '请填写已缴餐费'
        },
        {
          label: '已缴餐费月数',
          key: 'food_month',
          type: 'select',
          placeholder: '请选择已缴餐费月数',
          options: [
            {
              label: '1',
              value: '1'
            },
            {
              label: '2',
              value: '2'
            },
            {
              label: '3',
              value: '3'
            },
            {
              label: '4',
              value: '4'
            },
            {
              label: '5',
              value: '5'
            },
            {
              label: '6',
              value: '6'
            },
            {
              label: '7',
              value: '7'
            },
            {
              label: '8',
              value: '8'
            },
            {
              label: '9',
              value: '9'
            },
            {
              label: '10',
              value: '10'
            },
            {
              label: '11',
              value: '11'
            },
            {
              label: '12',
              value: '12'
            }
          ]
        },
        {
          label: '已缴保险费',
          key: 'insurance',
          type: 'float',
          placeholder: '请填写已缴保险费'
        },
        {
          label: '实际协议结束时间',
          key: 'over_date_real',
          type: 'date',
          placeholder: '请选择实际协议结束时间'
        },
        {
          label: '退费备注',
          key: 'remark_repay',
          type: 'textarea',
          placeholder: '请填写退费备注'
        },
        {
          label: '应退费金额',
          key: 'repay',
          type: 'float',
          placeholder: '请填写应退费金额'
        },
        {
          label: '退费时间',
          key: 'repay_date',
          type: 'date',
          placeholder: '请选择退费时间'
        }
      ],
      contractDeleteOption: {
        module: 'memberManagement',
        funcName: 'deleteContract',
        ensureText: '确定要删除该条合同吗？'
      },

      addMemberId: '',
      contractAddFormOption: {
        labelWidth: '140px',
        module: 'memberManagement',
        funcName: 'addContract'
      },
      contractAddForm: [
        {
          label: '缴费日期',
          key: 'pay_date',
          type: 'date',
          placeholder: '请选择缴费日期',
          rules: [
            { required: true, message: '请选择缴费日期', trigger: 'change' }
          ]
        },
        {
          label: '缴费性质',
          key: 'fee_type',
          type: 'select',
          placeholder: '请选择缴费性质',
          options: [
            {
              label: '新生缴费',
              value: '新生缴费'
            },
            {
              label: '老会员缴费',
              value: '老会员缴费'
            },
            {
              label: '定金',
              value: '定金'
            }
          ],
          rules: [
            { required: true, message: '请选择缴费性质', trigger: 'change' }
          ]
        },
        {
          label: '定金',
          key: 'deposit',
          type: 'float',
          placeholder: '请输入定金',
          hide: true,
          showKey: 'fee_type',
          showId: '定金',
          rules: [
            { required: true, message: '请输入定金', trigger: 'blur' }
          ]
        },
        {
          label: '缴费类型',
          key: 'fee_period',
          type: 'select',
          placeholder: '请选择缴费类型',
          options: [
            {
              label: '半年',
              value: '半年'
            },
            {
              label: '一年',
              value: '一年'
            },
            {
              label: '月付',
              value: '月付'
            }
          ],
          rules: [
            { required: true, message: '请选择缴费类型', trigger: 'change' }
          ]
        },
        {
          label: '预缴费学费金额',
          key: 'fee',
          type: 'float',
          placeholder: '请输入预缴费学费金额',
          rules: [
            { required: true, message: '请输入预缴费学费金额', trigger: 'blur' }
          ]
        },
        {
          label: '预缴费月数',
          key: 'pay_month',
          type: 'select',
          placeholder: '请选择预缴费月数',
          options: [
            {
              label: '1',
              value: '1'
            },
            {
              label: '2',
              value: '2'
            },
            {
              label: '3',
              value: '3'
            },
            {
              label: '4',
              value: '4'
            },
            {
              label: '5',
              value: '5'
            },
            {
              label: '6',
              value: '6'
            },
            {
              label: '7',
              value: '7'
            },
            {
              label: '8',
              value: '8'
            },
            {
              label: '9',
              value: '9'
            },
            {
              label: '10',
              value: '10'
            },
            {
              label: '11',
              value: '11'
            },
            {
              label: '12',
              value: '12'
            }
          ],
          rules: [
            { required: true, message: '请选择预缴费月数', trigger: 'change' }
          ]
        },
        {
          label: '付款方式',
          key: 'pay_way',
          type: 'select',
          placeholder: '请选择付款方式',
          inputable: true,
          options: [
            {
              label: '支付宝',
              value: '支付宝'
            },
            {
              label: '微信',
              value: '微信'
            },
            {
              label: '银行汇款',
              value: '银行汇款'
            }
          ],
          rules: [
            { required: true, message: '请选择付款方式', trigger: 'change' }
          ]
        },
        {
          label: '协议开始时间',
          key: 'start_date',
          type: 'date',
          placeholder: '请选择协议开始时间',
          rules: [
            { required: true, message: '请选择协议开始时间', trigger: 'change' }
          ]
        },
        {
          label: '优惠等备注',
          key: 'remark',
          type: 'textarea',
          placeholder: '请填写优惠等备注'
        },
        {
          label: '已缴餐费',
          key: 'food_fee',
          type: 'float',
          placeholder: '请填写已缴餐费'
        },
        {
          label: '已缴餐费月数',
          key: 'food_month',
          type: 'select',
          placeholder: '请选择已缴餐费月数',
          options: [
            {
              label: '1',
              value: '1'
            },
            {
              label: '2',
              value: '2'
            },
            {
              label: '3',
              value: '3'
            },
            {
              label: '4',
              value: '4'
            },
            {
              label: '5',
              value: '5'
            },
            {
              label: '6',
              value: '6'
            },
            {
              label: '7',
              value: '7'
            },
            {
              label: '8',
              value: '8'
            },
            {
              label: '9',
              value: '9'
            },
            {
              label: '10',
              value: '10'
            },
            {
              label: '11',
              value: '11'
            },
            {
              label: '12',
              value: '12'
            }
          ]
        },
        {
          label: '已缴保险费',
          key: 'insurance',
          type: 'float',
          placeholder: '请填写已缴保险费'
        },
        {
          label: '实际协议结束时间',
          key: 'over_date_real',
          type: 'date',
          placeholder: '请选择实际协议结束时间'
        },
        {
          label: '退费备注',
          key: 'remark_repay',
          type: 'textarea',
          placeholder: '请填写退费备注'
        },
        {
          label: '应退费金额',
          key: 'repay',
          type: 'float',
          placeholder: '请填写应退费金额'
        },
        {
          label: '退费时间',
          key: 'repay_date',
          type: 'date',
          placeholder: '请选择退费时间'
        }
      ],

      detaiFormOption: {
        labelWidth: '160px',
        needFooter: false
      },
      detaiForm: [
        {
          label: '姓名',
          key: 'name',
          placeholder: '请输入姓名',
          type: 'string',
          readOnly: true
        },
        {
          label: '性别',
          key: 'sex',
          placeholder: '请选择性别',
          type: 'select',
          readOnly: true,
          options: [
            {
              label: '男',
              value: '1'
            },
            {
              label: '女',
              value: '2'
            }
          ]
        },
        {
          label: '学校',
          key: 'school_name',
          placeholder: '请选择学校',
          type: 'string',
          readOnly: true
        },
        {
          label: '班级',
          key: 'class_name',
          placeholder: '请选择班级',
          type: 'string',
          readOnly: true
        },
        {
          label: '来源渠道',
          key: 'client_way',
          type: 'select',
          readOnly: true,
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
          ]
        },
        {
          label: '介绍人（宝宝姓名）',
          key: 'agent_uuid',
          type: 'asyncSelect',
          readOnly: true,
          selectKey: 'memberSelect',
          hide: true,
          showKey: 'client_way',
          showId: '转介绍',
          placeholder: '请选择介绍人（宝宝姓名）'
        },
        {
          label: '与宝宝的关系',
          key: 'agent_relation',
          type: 'select',
          readOnly: true,
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
              label: '其他',
              value: '99'
            }
          ]
        },
        {
          label: '会员状态',
          key: 'client_status',
          type: 'select',
          readOnly: true,
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
          ]
        },
        {
          label: '家长信息',
          key: 'parents',
          type: 'dynamic',
          readOnly: true,
          formOption: {
            labelWidth: '60px',
            inline: true
          },
          form: [
            {
              label: '姓名',
              key: 'name',
              type: 'string',
              readOnly: true,
              placeholder: '请填写姓名',
              style: { width: '150px' }
            },
            {
              label: '手机号',
              key: 'phone',
              type: 'string',
              readOnly: true,
              placeholder: '请填写手机号',
              style: { width: '150px' }
            },
            {
              label: '关系',
              key: 'relation',
              type: 'select',
              readOnly: true,
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
                  label: '其他',
                  value: '99'
                }
              ]
            }
          ]
        },
        {
          label: '入园时间',
          key: 'in_date',
          type: 'date',
          readOnly: true,
          placeholder: '请选择入园时间'
        },
        {
          label: '小名',
          key: 'nick_name',
          type: 'string',
          readOnly: true,
          placeholder: '请填写小名'
        },
        {
          label: '证件类型',
          key: 'id_type',
          placeholder: '请选择证件类型',
          type: 'select',
          readOnly: true,
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
          type: 'string',
          readOnly: true
        },
        {
          label: '民族',
          key: 'national',
          placeholder: '请选择民族',
          type: 'select',
          readOnly: true,
          selectKey: 'nationalSelect'
        },
        {
          label: '居住地',
          key: 'residence_addr',
          placeholder: '请填写居住地址',
          readOnly: true,
          type: 'string'
        },
        {
          label: '出生日期',
          key: 'birth_day',
          placeholder: '请选择出生日期',
          readOnly: true,
          type: 'date'
        },
        {
          label: '国家',
          key: 'country',
          placeholder: '请选择国家',
          type: 'select',
          readOnly: true,
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
          readOnly: true,
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
          readOnly: true,
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
    openAddContractForm(row) {
      this.addMemberId = row.s_uuid
      this.$refs.mainTable.initFormDialog({
        title: '新增合同',
        formOption: this.contractAddFormOption,
        form: this.contractAddForm,
        confirm: ({ params, next }) => {
          this.confirmContractAdd(params).then(() => {
            next()
          })
        }
      })
    },
    confirmContractAdd(params) {
      return new Promise(resolve => {
        const p = { s_uuid: this.addMemberId, ...params }
        addContract(p).then(res => {
          this.$message({
            type: 'success',
            message: '新增成功!'
          })
          this.addMemberId = ''
          resolve()
        })
      })
    },
    checkContract(row) {
      this.contractTableOption.params.s_uuid = row.s_uuid
      this.contractDialogVisible = true
    },
    checkDetail(row) {
      const { s_uuid } = row
      getClientInfo({ s_uuid }).then(res => {
        this.$refs.mainTable.initFormDialog({
          title: '会员详情',
          formOption: this.detaiFormOption,
          form: this.detaiForm,
          data: res.data
        })
      })
    }
  }
}
</script>
