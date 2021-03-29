<template>
  <div>
    <TableComponent
      :search-form="searchForm"
      :select-option="selectOption"
      :table-columns="tableColumns"
      :table-option="tableOption"
      :top-operation-column="topOperationColumn"
      :add-form-option="addFormOption"
      :add-form="addForm"
      :edit-form="editForm"
      :edit-form-option="editFormOption"
      :delete-option="deleteOption"
    >
      <div slot="top_area">111</div>
      <template v-slot:extraTableActionBehind="{ data: { row } }">
        <el-button
          type="info"
          size="mini"
          @click="test(row)"
        >其他操作</el-button>
      </template>
      <template slot="topOperations">
        <el-button type="primary" size="small">上方特殊按钮</el-button>
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
      searchForm: [
        {
          type: 'select',
          key: 'select2',
          placeholder: '下拉框',
          options: [
            {
              label: '111',
              value: 1
            },
            {
              label: '222',
              value: 2
            }
          ]
        },
        {
          type: 'string',
          key: 'name',
          limit: 10,
          placeholder: '这是个普通input'
        },
        {
          type: 'date',
          key: 'date',
          placeholder: '这是个日期选择器'
        },
        {
          type: 'time',
          key: 'time',
          placeholder: '这是个时间选择器'
        },
        {
          type: 'dateRange',
          key: 'dateRange',
          startPlaceholder: '开始日期1',
          endPlaceholder: '结束日期1'
        },
        {
          type: 'timeRange',
          key: 'timeRange',
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间'
        },
        {
          type: 'dateTime',
          key: 'dateTime',
          placeholder: '这是个日期时间选择器'
        },
        {
          type: 'dateTimeRange',
          key: 'dateTimeRange',
          startPlaceholder: '开始日期时间',
          endPlaceholder: '结束日期时间'
        },
        {
          type: 'select',
          key: 'select',
          placeholder: '下拉框',
          options: [
            {
              label: '111',
              value: 1
            },
            {
              label: '222',
              value: 2
            }
          ]
        },
        {
          type: 'string',
          key: 'aaa',
          placeholder: 'aaa',
          hide: true,
          showKey: 'select',
          showId: 1
        }
      ],
      selectOption: [
        {
          module: 'select',
          funcName: 'getSelect',
          selectKey: 'select1',
          label: 'name',
          value: 'id'
        }
      ],
      tableOption: {
        module: 'table',
        funcName: 'getTreeTable',
        needSelection: false,
        needEdit: true,
        needDelete: true,
        params: {
          test: 'aaa'
        },
        actionWidth: 300,
        rowKey: 'id'
      },
      tableColumns: [
        {
          label: 'ID',
          dataIndex: 'id',
          width: 200,
          prop: 'id'
        },
        {
          label: '标题',
          dataIndex: 'title',
          width: 700,
          prop: 'title'
        },
        {
          label: '图片',
          dataIndex: 'imgs.0',
          type: 'image',
          width: 200,
          ImageFit: 'cover',
          prop: 'img'
        },
        {
          label: '作者',
          dataIndex: 'author',
          width: 120,
          prop: 'author'
        },
        {
          label: '时间',
          dataIndex: 'display_time',
          width: 180,
          prop: 'display_time'
        },
        {
          label: 'pageviews',
          dataIndex: 'pageviews',
          prop: 'pageviews'
        }
      ],
      topOperationColumn: {
        needAdd: true
      },
      addFormOption: {
        labelWidth: '80px',
        module: 'table',
        funcName: 'handleAdd'
      },
      addForm: [
        {
          label: '名字',
          key: 'id',
          placeholder: '请输入名字',
          type: 'string',
          rules: [
            { required: true, message: '请输入名字', trigger: 'blur' }
          ]
        },
        {
          label: '文本域',
          key: 'area',
          placeholder: '请输入内容',
          type: 'textarea',
          rules: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ]
        },
        {
          label: '日期',
          key: 'date',
          placeholder: '请选择日期',
          type: 'date',
          rules: [
            { required: true, message: '请选择日期', trigger: 'blur' }
          ]
        },
        {
          label: '时间',
          type: 'time',
          key: 'time',
          placeholder: '请选择一个时间',
          rules: [
            { required: true, message: '请选择时间', trigger: 'blur' }
          ]
        },
        {
          label: '日期范围',
          type: 'dateRange',
          key: 'dateRange',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
          rules: [
            { required: true, message: '请选择日期', trigger: 'blur' }
          ]
        },
        {
          label: '时间范围',
          type: 'timeRange',
          key: 'timeRange',
          placeholder: '这是个时间范围选择器',
          rules: [
            { required: true, message: '请选择日期', trigger: 'blur' }
          ]
        },
        {
          label: '下拉框',
          type: 'select',
          key: 'select',
          placeholder: '请选择',
          options: [
            {
              label: '1',
              value: 1
            },
            {
              label: '2',
              value: 2
            },
            {
              label: '3',
              value: 3
            }
          ],
          rules: [
            { required: true, message: '请选择', trigger: 'blur' }
          ]
        },
        {
          label: '多选框',
          type: 'multiSelect',
          key: 'select2',
          placeholder: '请选择',
          options: [
            {
              label: '1',
              value: 1
            },
            {
              label: '2',
              value: 2
            },
            {
              label: '3',
              value: 3
            }
          ],
          selectKey: 'select1',
          rules: [
            { required: true, message: '请选择', trigger: 'blur' }
          ]
        },
        {
          label: '显示',
          type: 'string',
          key: 'show',
          showKey: 'select2',
          showId: 1,
          hide: true,
          placeholder: '请填写显示内容',
          rules: [
            { required: true, message: '请填写显示内容', trigger: 'blur' }
          ]
        },
        {
          label: '上传图片',
          key: 'imgs',
          type: 'upload',
          uploadType: 'image',
          multiple: true,
          paramsType: 'string',
          resIndex: 'data',
          max: 3
        },
        {
          label: '上传视频',
          key: 'video_path',
          type: 'upload',
          uploadType: 'video',
          paramsType: 'string',
          resIndex: 'data',
          max: 1
        },
        {
          label: '上传音频',
          key: 'audio',
          type: 'upload',
          uploadType: 'audio',
          paramsType: 'string',
          resIndex: 'data',
          max: 1
        },
        {
          label: '',
          labelWidth: '0',
          type: 'editor',
          key: 'content',
          rules: [
            { required: true, message: '请填写内容', trigger: 'blur' }
          ]
        }
      ],
      editFormOption: {
        labelWidth: '80px',
        module: 'table',
        funcName: 'handleEdit'
      },
      editForm: [
        {
          label: 'ID',
          key: 'id',
          placeholder: '请输入id',
          type: 'string',
          rules: [
            { required: true, message: '请输入id', trigger: 'blur' }
          ]
        },
        {
          label: 'title',
          key: 'title',
          placeholder: '请输入标题',
          type: 'string',
          rules: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ]
        },
        {
          label: '作者',
          key: 'author',
          placeholder: '请输入作者',
          type: 'string',
          rules: [
            { required: true, message: '请输入作者', trigger: 'blur' }
          ]
        },
        {
          label: '时间',
          key: 'display_time',
          placeholder: '请选择日期',
          showFormat: 'yyyy年mm月dd日 HH时mm分ss秒',
          type: 'dateTime',
          rules: [
            { required: true, message: '请选择时间', trigger: 'blur' }
          ]
        },
        {
          label: '上传图片',
          key: 'imgs',
          type: 'upload',
          uploadType: 'image',
          multiple: true,
          paramsType: 'string',
          resIndex: 'data',
          max: 3
        },
        {
          label: '上传视频',
          key: 'video_path',
          type: 'upload',
          uploadType: 'video',
          paramsType: 'string',
          resIndex: 'data',
          max: 1
        }
      ],
      deleteOption: {
        ensureTitle: '删除',
        ensureText: '确定要删除该条数据吗',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        module: 'table',
        funcName: 'handleDelete'
      }
    }
  },
  methods: {
    test(row) {
      alert(row.id)
    }
  }
}
</script>
