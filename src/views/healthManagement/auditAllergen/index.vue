<template>
  <div>
    <TableComponent
      ref="mainTable"
      :top-operation-column="topOperationColumn"
      :table-columns="tableColumns"
      :table-option="tableOption"
    >
      <template slot="topOperations">
        <el-button type="success" size="small" @click="handleAudit(1)">通过</el-button>
        <el-button type="danger" size="small" @click="handleAudit(2)">不通过</el-button>
      </template>
      <template v-slot:custom="{ data: { row } }">
        <div>
          {{ row.type == 1? '食品类':'药品类' }}
        </div>
      </template>
    </TableComponent>
  </div>
</template>
<script>
import TableComponent from '@/components/TableComponent'
import { auditAllergen } from '@/api/healthManagement'
export default {
  components: {
    TableComponent
  },
  data() {
    return {
      topOperationColumn: {
        needAdd: false
      },
      tableOption: {
        module: 'healthManagement',
        funcName: 'getAuditAllergenList',
        needSelection: true,
        needEdit: false,
        needDelete: false,
        params: {},
        actionWidth: 300,
        needAction: false
      },
      tableColumns: [
        {
          label: '过敏源',
          dataIndex: 'a_name'
        },
        {
          label: '类型',
          dataIndex: 'type',
          type: 'custom'
        },
        {
          label: '宝宝',
          dataIndex: 's_name'
        },
        {
          label: '学校',
          dataIndex: 'school_name'
        },
        {
          label: '申请人',
          dataIndex: 'operate_name'
        },
        {
          label: '申请时间',
          dataIndex: 'ctime'
        }
      ]
    }
  },
  methods: {
    handleAudit(audit) {
      const selectedArray = this.$refs.mainTable.tableSelectionArray
      if (selectedArray.length == 0) {
        this.$message({
          type: 'error',
          message: '请至少选择一项'
        })
        return
      }
      auditAllergen({
        data: selectedArray.map(item => {
          const { id, a_name, type, s_uuid, operate_uuid } = item
          return {
            id,
            a_name,
            type,
            s_uuid,
            operate_uuid
          }
        }),
        audit: audit
      }).then(() => {
        this.$message({
          type: 'success',
          message: '审核成功'
        })
        this.$refs.mainTable.getTableData()
      })
    }
  }
}
</script>
