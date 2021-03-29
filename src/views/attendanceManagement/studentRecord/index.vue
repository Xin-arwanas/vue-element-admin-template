<template>
  <div>
    <TableComponent
      :search-form="searchForm"
      :top-operation-column="topOperationColumn"
      :table-columns="tableColumns"
      :table-option="tableOption"
    >
      <template v-slot:custom="{ data: { row, col } }">
        <div v-if="col.label=='迟到'" :style="{color:['0 分钟','-'].some(item => item == row.start_late) ?'#606266':'red'}">
          {{ row.start_late }}
        </div>
        <div v-if="col.label=='早退'" :style="{color:['0 分钟','-'].some(item => item == row.off_early) ?'#606266':'red'}">
          {{ row.off_early }}
        </div>
      </template>
    </TableComponent>
  </div>
</template>
<script>
import TableComponent from '@/components/TableComponent'
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
          type: 'month',
          key: 'month',
          placeholder: '请选择月份',
          label: '考勤月份:',
          labelWidth: '120'
        },
        {
          type: 'string',
          key: 'name',
          placeholder: '请输入宝宝姓名',
          label: '宝宝姓名:',
          labelWidth: '120'
        }
      ],
      topOperationColumn: {
        needOperationColumn: false,
        needAdd: false
      },
      tableOption: {
        module: 'attendanceManagement',
        funcName: 'getStudentAttence',
        needSelection: false,
        needEdit: false,
        needDelete: false,
        params: {},
        needAction: false
      },
      tableColumns: [
        {
          label: '姓名',
          dataIndex: 'name'
        },
        {
          label: '到校时间',
          dataIndex: 'start_time'
        },
        {
          label: '到校体温',
          dataIndex: 'start_temperature'
        },
        {
          label: '迟到',
          dataIndex: 'start_late',
          type: 'custom'
        },
        {
          label: '离校时间',
          dataIndex: 'off_time'
        },
        {
          label: '离校体温',
          dataIndex: 'off_temperature'
        },
        {
          label: '早退',
          dataIndex: 'off_early',
          type: 'custom'
        }
      ]
    }
  },
  methods: {
  }
}
</script>
