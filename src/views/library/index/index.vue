<template>
  <div>
    <TableComponent
      :top-operation-column="topOperationColumn"
      :table-columns="tableColumns"
      :table-option="tableOption"
      :select-option="selectOption"
      :delete-option="deleteOption"
    >
      <template v-slot:extraTableActionFront="{ data: { row } }">
        <el-button
          type="primary"
          size="mini"
          @click="checkMedia(row)"
        >查看媒体</el-button>
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
      selectOption: [],
      topOperationColumn: {
        needAdd: false,
        needOperationColumn: false
      },
      tableOption: {
        module: 'library',
        funcName: 'getTeachMedia',
        needSelection: false,
        needEdit: false,
        needDelete: false,
        params: {},
        actionWidth: 200
      },
      tableColumns: [
        {
          label: '标题',
          dataIndex: 'title'
        },
        {
          label: '分类',
          dataIndex: 'type'
        },
        {
          label: '上传人',
          dataIndex: 'name'
        },
        {
          label: '上传时间',
          dataIndex: 'ctime'
        },
        {
          label: '媒体类别',
          dataIndex: 'media_type'
        }
      ],
      deleteOption: {
        module: 'healthManagement',
        funcName: 'deleteAllergen',
        ensureText: '确定要删除该过敏源吗？'
      }
    }
  },
  methods: {
    checkMedia(row) {
      const { origUrl } = row.video_path || {}
      if (origUrl) {
        window.open(origUrl)
      }
    }
  }
}
</script>
