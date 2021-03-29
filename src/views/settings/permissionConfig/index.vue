<template>
  <div class="app-container">
    <BasicTable
      :table-columns="tableColumns"
      :table-data="tableData"
      :list-loading="listLoading"
      :table-option="tableOption"
    >
      <template v-slot:custom="{ data: { row, column, $index, col } }">
        <div>
          <el-button
            v-if="row[col.key] == '有'"
            type="danger"
            size="small"
            @click="handleSwitch({ row, column, $index, col })"
          >取消权限</el-button>
          <el-button
            v-else
            type="success"
            size="small"
            @click="handleSwitch({ row, column, $index, col })"
          >添加权限</el-button>
        </div>
      </template>
    </BasicTable>
  </div>
</template>
<script>
import BasicTable from '@/components/BasicTable'
import { getPowerList, grantRole } from '@/api/setting'
export default {
  components: {
    BasicTable
  },
  data() {
    return {
      listLoading: false,
      tableData: [],
      tableOption: {
        needAction: false,
        params: {},
        treeChildrenKey: 'list'
      },
      tableColumns: [
        {
          label: '栏目',
          dataIndex: 'node'
        }
      ],
      topOperationColumn: {
        needAdd: false
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true
      getPowerList().then(res => {
        const { nodes, roles } = res.data
        if (this.tableData.length == 0) {
          roles.map(role => {
            this.tableColumns.push({
              label: role.name,
              type: 'custom',
              key: role.key,
              id: role.id
            })
          })
        }
        this.tableData = nodes
        this.listLoading = false
      })
    },
    handleSwitch({ row, column, index, col }) {
      grantRole({
        nodeId: row.id,
        roleId: col.id,
        change_type: row[col.key] == '有' ? 0 : 1
      }).then(res => {
        this.getData()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-container{
    ::v-deep {
      .el-table__row--level-1{
        background-color:#F0F0F0!important;
      }
    }
  }

</style>
