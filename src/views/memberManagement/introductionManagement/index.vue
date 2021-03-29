<template>
  <div>
    <TableComponent
      ref="table"
      :top-operation-column="topOperationColumn"
      :table-option="tableOption"
      :table-columns="tableColumns"
    >
      <template v-slot:extraTableActionFront="{ data: { row } }">
        <el-button
          type="primary"
          size="mini"
          @click="handleCheck(row)"
        >查看</el-button>
        <el-button
          type="info"
          size="mini"
          @click="editReward(row)"
        >编辑奖励</el-button>
      </template>
    </TableComponent>
    <Dialog title="被介绍会员" :visible.sync="detailVisible" @close="detail = []">
      <div class="dialogWrapper">
        <BasicTable
          :table-columns="detailTableColumns"
          :table-data="detail"
          :table-option="detailTableOption"
        />
      </div>
    </Dialog>
  </div>
</template>
<script>
import TableComponent from '@/components/TableComponent'
import BasicTable from '@/components/BasicTable'
import Dialog from '@/components/Dialog'
import { editAgentReward } from '@/api/memberManagement'
export default {
  components: {
    TableComponent,
    BasicTable,
    Dialog
  },
  data() {
    return {
      topOperationColumn: {
        needOperationColumn: false,
        needAdd: false
      },
      tableOption: {
        module: 'memberManagement',
        funcName: 'getAgentList',
        needSelection: false,
        needEdit: false,
        needDelete: false,
        params: {},
        actionWidth: 300
      },
      tableColumns: [
        {
          label: '介绍人（宝宝）',
          dataIndex: 'agent_name'
        },
        {
          label: '介绍人数',
          dataIndex: 'student_num'
        },
        {
          label: '积分',
          dataIndex: 'point'
        },
        {
          label: '奖励',
          dataIndex: 'reward_remark'
        }
      ],
      detailVisible: false,
      detail: [],
      detailTableOption: {
        needSelection: false,
        needAction: false
      },
      detailTableColumns: [
        {
          label: '姓名',
          dataIndex: 'name'
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
          label: '会员状态',
          dataIndex: 'client_status'
        },
        {
          label: '介绍人',
          dataIndex: 'agent_name'
        }
      ],
      rewardFormOption: {
        labelWidth: '120px'
      },
      rewardForm: [
        {
          type: 'textarea',
          label: '奖励内容',
          key: 'reward_remark',
          placeholder: '请填写奖励内容'
        }
      ]
    }
  },
  methods: {
    handleCheck(row) {
      this.detail = row.student_list
      this.detailVisible = true
    },
    editReward(row) {
      this.$refs.table.initFormDialog({
        title: '奖励',
        formOption: this.rewardFormOption,
        form: this.rewardForm,
        data: row,
        confirm: ({ params, next }) => {
          this.confirmEditReward({ ...params, agent_uuid: row.agent_uuid }).then(() => {
            next()
          })
        }
      })
    },
    confirmEditReward(params) {
      return new Promise(resolve => {
        editAgentReward(params).then(() => {
          this.$message({
            type: 'success',
            message: '编辑成功!'
          })
          resolve()
          this.$refs.table.refreshTableData()
        })
      })
    }
  }
}
</script>
