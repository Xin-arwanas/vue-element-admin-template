<template>
  <div>
    <TableComponent
      ref="mainTable"
      :table-columns="tableColumns"
      :table-option="tableOption"
      :search-select-option="searchSelectOption"
      :search-form="searchForm"
      :top-operation-column="topOperationColumn"
    >
      <template v-slot:custom="{ data: { row } }">
        <div :style="{color: row.normal == 'n' ?'red':'#606266'}">
          {{ row.normal == 'n'?'有异常':'无异常' }}
        </div>
      </template>
      <template v-slot:extraTableActionFront="{data: { row }}">
        <el-button
          type="primary"
          size="mini"
          @click="detail = row;detailVisible = true;"
        >查看详情</el-button>
      </template>
    </TableComponent>
    <Dialog title="详情" :visible.sync="detailVisible" @close="detail = {}">
      <div class="dialogWrapper">
        <el-row type="flex" align="middle" :gutter="20" class="row">
          <el-col :span="3" class="title">起床体温</el-col>
          <el-col :span="2" class="arrow">>></el-col>
          <el-col :span="18" class="content" :style="{color:(detail.up_temperature >= detail.min_temperature && detail.up_temperature <= detail.max_temperature)?'#606266':'red'}">{{ detail.up_temperature }}℃</el-col>
        </el-row>
        <el-row type="flex" align="middle" :gutter="20" class="row">
          <el-col :span="3" class="title">{{ detail.up_time }}</el-col>
          <el-col :span="2" class="arrow">>></el-col>
          <el-col :span="18" class="content">宝宝起床</el-col>
        </el-row>

        <el-row v-for="(item,index) in detail.list" :key="index" type="flex" align="middle" :gutter="20" class="row">
          <el-col :span="3" class="title">{{ item.time }}</el-col>
          <el-col :span="2" class="arrow">>></el-col>
          <el-col :span="18" class="content" :style="{color:item.desc == '无异常'?'#606266':'red'}">{{ item.desc }}</el-col>
        </el-row>

        <el-row type="flex" align="middle" :gutter="20" class="row">
          <el-col :span="3" class="title">{{ detail.sleep_time }}</el-col>
          <el-col :span="2" class="arrow">>></el-col>
          <el-col :span="18" class="content">宝宝入睡</el-col>
        </el-row>
        <el-row type="flex" align="middle" :gutter="20" class="row">
          <el-col :span="3" class="title">睡前体温</el-col>
          <el-col :span="2" class="arrow">>></el-col>
          <el-col :span="18" class="content" :style="{color:(detail.sleep_temperature >= detail.min_temperature && detail.sleep_temperature <= detail.max_temperature)?'#606266':'red'}">{{ detail.sleep_temperature }}℃</el-col>
        </el-row>
      </div>
    </Dialog>
  </div>
</template>
<script>
import TableComponent from '@/components/TableComponent'
import Dialog from '@/components/Dialog'
import { mapState } from 'vuex'
export default {
  components: {
    TableComponent,
    Dialog
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
        funcName: 'getNapRecord',
        needSelection: false,
        needEdit: false,
        needDelete: false,
        params: {},
        actionWidth: 200
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
        },
        {
          label: '有无异常',
          type: 'custom',
          dataIndex: 'normal'
        }
      ],
      topOperationColumn: {
        needAdd: false,
        needOperationColumn: false
      },
      detailVisible: false,
      detail: {}
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
  methods: {
    checkDetail(row) {
      this.detail = row
      this.detailVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.row{
  font-size:22px;
  line-height:50px;
  padding-left:50px;
}
.arrow{
  text-align:center;
}
.content{
  line-height:38px;
}
</style>
