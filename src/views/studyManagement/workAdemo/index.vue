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
      <template slot="topOperations">
        <el-tooltip class="item" effect="dark" placement="bottom">
          <div slot="content" style="text-align:center;">导出的数据是以搜索栏中的选择为依据<br>而非表格中的数据</div>
          <el-button type="info" size="small" @click="openExportFormDialog">导出班级汇总</el-button>
        </el-tooltip>
      </template>
      <template v-slot:extraTableActionFront="{ data: { row } }">
        <el-button
          type="primary"
          size="mini"
          @click="checkDetail(row)"
        >查看详情</el-button>
      </template>
    </TableComponent>
    <Dialog title="详情" :visible.sync="detailVisible" @close="detail = []">
      <div class="dialogWrapper" style="height:50vh;display:flex;">
        <TableComponent
          ref="detailTable"
          :table-columns="detailTableColumns"
          :table-option="detailTableOption"
          :search-select-option="detailSearchSelectOption"
          :search-form="detailSearchForm"
          :top-operation-column="detailTopOperationColumn"
        >
          <template v-slot:tableExpand="{data:{row}}">
            <el-row>
              <el-col class="col title" :span="8">
                工作项目
              </el-col>
              <el-col class="col title" :span="8">
                示范时间
              </el-col>
              <el-col class="col title" :span="8">
                评价记录
              </el-col>
            </el-row>
            <el-row v-for="(item,index) in row.work" :key="index" type="flex" class="row border-bottom">
              <el-col class="col center" :span="8">
                {{ item.name }}
              </el-col>
              <el-col class="col center" :span="8">
                <div v-if="!item.demos" class="lineHeight">暂未示范</div>
                <template v-else>
                  <div v-for="(demo,i) in item.demos" :key="i" class="lineHeight">{{ demo.ctime }}</div>
                </template>
              </el-col>
              <el-col class="col center" :span="8">
                <div v-if="!item.scores" class="lineHeight">暂未评价</div>
                <template v-else>
                  <el-row v-for="(score,j) in item.scores" :key="j" class="row10" type="flex" style="width:100%;">
                    <el-col class="center" :span="3">
                      <el-image class="image" :src="scoreMap[score.score]" />
                    </el-col>
                    <el-col style="text-align:left;" :span="21">{{ score.remark }}</el-col>
                  </el-row>
                </template>
              </el-col>
            </el-row>
          </template>
        </TableComponent>
      </div>
    </Dialog>
  </div>
</template>
<script>
import TableComponent from '@/components/TableComponent'
import Dialog from '@/components/Dialog'
import { mapState } from 'vuex'
import { exportClassBabyWork } from '@/api/studyManagement'
export default {
  components: {
    TableComponent,
    Dialog
  },
  data() {
    return {
      scoreMap: {
        1: require('@/assets/images/work_circle.png'),
        2: require('@/assets/images/work_delta.png'),
        3: require('@/assets/images/work_star.png')
      },
      selectOption: [],
      searchSelectOption: [],
      searchForm: [
        {
          type: 'select',
          key: 'school_code',
          placeholder: '请选择学校',
          label: '学校:',
          labelWidth: '120',
          selectKey: 'schoolSelect',
          rules: [
            {
              required: true, message: '请选择学校', trigger: 'change'
            }
          ]
        },
        {
          type: 'select',
          key: 'c_id',
          placeholder: '请选择班级',
          label: '班级:',
          labelWidth: '120',
          selectKey: 'classSelect',
          rules: [
            {
              required: true, message: '请选择班级', trigger: 'change'
            }
          ]
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
        module: 'studyManagement',
        funcName: 'getStudentList',
        needSelection: false,
        needEdit: false,
        needDelete: false,
        params: {},
        actionWidth: 200
      },
      tableColumns: [
        {
          label: '姓名',
          dataIndex: 'name'
        },
        {
          label: '小名',
          dataIndex: 'nick_name'
        }
      ],
      topOperationColumn: {
        needAdd: false,
        needOperationColumn: true
      },
      detailVisible: false,
      detailSearchSelectOption: [],
      detailTopOperationColumn: {
        needAdd: false,
        needOperationColumn: false
      },
      detailSearchForm: [
        {
          type: 'date',
          key: 'date',
          placeholder: '请选择日期',
          label: '日期:',
          labelWidth: '120'
        }
      ],
      detailTableColumns: [
        {
          label: '周期',
          dataIndex: 'period'
        }
      ],
      detailTableOption: {
        module: 'studyManagement',
        funcName: 'getStudentWorkRecord',
        needSelection: false,
        needEdit: false,
        needDelete: false,
        needAction: false,
        params: {},
        actionWidth: 200,
        needExpand: true,
        expandAll: true
      },
      summaryFormOptions: {
        labelWidth: '80px'
      },
      summaryForm: [
        {
          label: '类型',
          type: 'select',
          key: 'type',
          options: [
            {
              label: '示范表',
              value: '1'
            },
            {
              label: '引导表',
              value: '2'
            }
          ],
          rules: [
            {
              required: true, message: '请选择类型', trigger: 'blur'
            }
          ]
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
    checkDetail(row) {
      this.detailTableOption.params.s_uuid = row.s_uuid
      this.detailVisible = true
    },
    openExportFormDialog() {
      this.$refs.mainTable.confirmSearchForm().then(params => {
        const { c_id } = params
        const p = {}
        if (this.role != 7) {
          p.class_id = c_id
        }
        this.$refs.mainTable.initFormDialog({
          title: '导出汇总',
          form: this.summaryForm,
          formOption: this.summaryFormOptions,
          confirm: ({ params, next }) => {
            exportClassBabyWork({ ...params, ...p }).then(res => {
              var url = process.env.VUE_APP_ROOT_PATH + res.data.url
              next()
              this.$message({
                type: 'success',
                message: '导出成功！'
              })
              window.open(url)
            })
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.title{
  font-size:20px;
  font-weight:bold;
}
.center{
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.col{
  text-align:center;
}
.border-bottom{
  border-bottom: 1px solid #eee;
}
.row{
  padding:20px 0;
}
.row10{
  padding:10px 0;
}
.lineHeight{
  line-height:20px;
}
.image{
  width:20px;
}
.el-table__expanded-cell .row:last-child{
  border-bottom:0;
}
</style>
