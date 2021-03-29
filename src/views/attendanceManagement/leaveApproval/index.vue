<template>
  <div>
    <TableComponent
      ref="table"
      :search-form="searchForm"
      :top-operation-column="topOperationColumn"
      :table-columns="tableColumns"
      :table-option="tableOption"
      :before-search="beforeSearch"
    >
      <template v-slot:extraTableActionBehind="{ data: { row } }">
        <el-button type="success" size="mini" @click="auditLeave(row.id,'同意')">同意</el-button>
        <el-button type="danger" size="mini" @click="auditLeave(row.id,'不同意')">不同意</el-button>
      </template>
    </TableComponent>
  </div>
</template>
<script>
import TableComponent from '@/components/TableComponent'
import { auditDayOff } from '@/api/attendanceManagement'
export default {
  components: {
    TableComponent
  },
  data() {
    return {
      selectOption: [

      ],
      searchForm: [
        {
          type: 'select',
          key: 'status',
          placeholder: '请选择审批状态',
          label: '审批状态:',
          labelWidth: '120',
          clearable: false,
          options: [
            {
              label: '待审批',
              value: '0'
            },
            {
              label: '已审批',
              value: '1'
            }
          ],
          value: '0'
        }
      ],
      topOperationColumn: {
        needOperationColumn: false,
        needAdd: false
      },
      tableOption: {
        module: 'attendanceManagement',
        funcName: 'getAuditDayOffList',
        needSelection: false,
        needEdit: false,
        needDelete: false,
        params: {},
        needAction: true,
        actionWidth: 250
      },
      tableColumns: [
        {
          label: '姓名',
          dataIndex: 'name'
        },
        {
          label: '请假类型',
          dataIndex: 'off_type'
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
          label: '起始时间',
          dataIndex: 'start_time'
        },
        {
          label: '结束时间',
          dataIndex: 'end_time'
        },
        {
          label: '请假理由',
          dataIndex: 'off_desc'
        },
        {
          label: '请假图片',
          dataIndex: 'off_pic',
          type: 'image'
        },
        {
          label: '状态',
          dataIndex: 'check_status'
        }
      ]
    }
  },
  methods: {
    beforeSearch({ params, next }) {
      const { status } = params
      next().then(() => {
        this.tableOption.needAction = status == 0
      })
    },
    auditLeave(id, status) {
      auditDayOff({
        id,
        status
      }).then(() => {
        this.$message({
          type: 'success',
          message: '审批成功!'
        })
        this.$refs.table.search()
      })
    }
  }
}
</script>
