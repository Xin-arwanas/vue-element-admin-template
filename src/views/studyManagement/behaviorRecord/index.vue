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
    >
      <template slot="topOperations">
        <el-tooltip class="item" effect="dark" placement="bottom">
          <div slot="content" style="text-align:center;">导出的数据是以搜索栏中的选择为依据<br>而非表格中的数据</div>
          <el-button type="info" size="small" @click="handleExport">导出</el-button>
        </el-tooltip>
      </template>
    </TableComponent>
  </div>
</template>
<script>
import TableComponent from '@/components/TableComponent'
import { mapState } from 'vuex'
import { exportClassBehavior } from '@/api/studyManagement'
export default {
  components: {
    TableComponent
  },
  data() {
    return {
      canExport: false,
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
          labelWidth: '120',
          rules: [
            { required: true, message: '请选择日期', trigger: 'change' }
          ]
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
        module: 'studyManagement',
        funcName: 'getBehaviorRecord',
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
          label: '记录人',
          dataIndex: 't_name'
        },
        {
          label: '日期',
          dataIndex: 'date'
        }
      ],
      topOperationColumn: {
        needAdd: false,
        needOperationColumn: true
      },
      editFormOption: {
        labelWidth: '80px',
        needFooter: false,
        title: '详情'
      },
      editForm: [
        {
          label: '工作列表',
          type: 'dynamic',
          key: 'list',
          readOnly: true,
          formOption: {
            labelWidth: '80px',
            inline: true
          },
          form: [
            {
              label: '工作名称',
              key: 'w_name',
              type: 'string',
              placeholder: '',
              readOnly: true
            },
            {
              label: '时间',
              key: 'time',
              type: 'time',
              placeholder: '',
              format: 'HH:mm',
              showFormat: 'HH:mm',
              readOnly: true
            }
          ]
        },
        {
          label: '补充记录',
          type: 'textarea',
          key: 'desc',
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
          labelWidth: '120',
          rules: [
            { required: true, message: '请选择日期', trigger: 'change' }
          ]
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
  methods: {
    handleExport() {
      this.$refs.mainTable.confirmSearchForm().then(params => {
        const { class_id, date } = params
        const p = {}
        if (this.role != 7) {
          p.class_id = class_id
        }
        p.date = date
        exportClassBehavior(p).then(res => {
          var url = process.env.VUE_APP_ROOT_PATH + res.data.url
          window.open(url)
        })
      })
    }
  }
}
</script>
