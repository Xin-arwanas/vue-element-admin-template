<template>
  <div>
    <TableComponent
      ref="mainTable"
      :search-form="searchForm"
      :search-select-option="searchSelectOption"
      :top-operation-column="topOperationColumn"
      :table-columns="tableColumns"
      :table-option="tableOption"
      :edit-form="editForm"
      :edit-form-option="editFormOption"
      :delete-option="deleteOption"
    >
      <template slot="topOperations">
        <ImportFile accept="excel" :request="handleUpload">
          <el-button size="small" type="primary">导入周计划</el-button>
        </ImportFile>
      </template>
      <template v-slot:editFormCustom="{data:{formItem}}">
        <el-divider v-if="formItem.key == 'discussDivider'" content-position="center">团讨</el-divider>
        <el-divider v-if="formItem.key == 'outdoorDivider'" content-position="center">户外</el-divider>
        <el-divider v-if="formItem.key == 'interestDivider'" content-position="center">兴趣课</el-divider>
      </template>
    </TableComponent>
  </div>
</template>
<script>
import TableComponent from '@/components/TableComponent'
import ImportFile from '@/components/ImportFile'
import { importWeeklyPlan } from '@/api/studyManagement'
import { mapState } from 'vuex'
export default {
  components: {
    TableComponent,
    ImportFile
  },
  data() {
    return {
      selectOption: [

      ],
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
          selectKey: 'schoolSelect'
        },
        {
          type: 'select',
          key: 'class_id',
          placeholder: '请选择班级',
          label: '班级:',
          labelWidth: '120',
          selectKey: 'classSelect'
        },
        {
          type: 'dateRange',
          key: 'date',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
          label: '日期:',
          labelWidth: '120'
        }
      ],
      topOperationColumn: {
        needAdd: false,
        needOperationColumn: true
      },
      tableOption: {
        module: 'studyManagement',
        funcName: 'getPlanList',
        needSelection: false,
        needEdit: true,
        needDelete: true,
        actionWidth: 200,
        params: {},
        editText: '查看'
      },
      tableColumns: [
        {
          label: '学校',
          dataIndex: 'school_name'
        },
        {
          label: '班级',
          dataIndex: 'class_name'
        },
        {
          label: '星期',
          dataIndex: 'weekday'
        },
        {
          label: '日期',
          dataIndex: 'date'
        },
        {
          label: '发布人',
          dataIndex: 'operate_name'
        }
      ],
      editFormOption: {
        module: 'studyManagement',
        funcName: 'updatePlan',
        labelWidth: '120px',
        needFooter: false
      },
      editForm: [
        {
          label: '目的',
          key: 'goal',
          type: 'textarea',
          placeholder: '',
          readOnly: true
        },
        {
          label: '工作',
          key: 'work',
          type: 'textarea',
          placeholder: '',
          readOnly: true
        },
        {
          label: '日期',
          key: 'date',
          type: 'date',
          placeholder: '请选择日期',
          readOnly: true
        },
        {
          label: '',
          key: 'discussDivider',
          submit: false,
          labelWidth: '0',
          type: 'custom'
        },
        {
          label: '团讨内容',
          key: 'discuss',
          type: 'textarea',
          placeholder: '',
          readOnly: true
        },
        {
          label: '团讨媒体选择',
          key: 'discussMediaType',
          submit: false,
          type: 'select',
          readOnly: true,
          placeholder: ' ',
          options: [
            {
              label: '图片',
              value: '图片'
            },
            {
              label: '音视频',
              value: '媒体'
            }
          ],
          editDataRebuild(row) {
            const { discuss_pic, discuss_media } = row
            if (discuss_pic && Array.isArray(discuss_pic) && discuss_pic.length > 0) {
              return '图片'
            }
            if (discuss_media && Object.prototype.toString.call(discuss_media).toLowerCase() == '[object object]' && Object.keys(discuss_media).length > 0) {
              return '媒体'
            }
            return ''
          }
        },
        {
          label: '团讨图片',
          key: 'discuss_pic',
          type: 'upload',
          uploadType: 'image',
          max: 3,
          hide: true,
          showKey: 'discussMediaType',
          showId: '图片',
          multiple: true,
          uploadName: 'plan',
          readOnly: true,
          uploadParams: {
            type: 'plan'
          }
        },
        {
          label: '团讨媒体',
          key: 'discuss_media',
          type: 'upload',
          readOnly: true,
          uploadType: 'media',
          max: 1,
          hide: true,
          showKey: 'discussMediaType',
          showId: '媒体',
          uploadName: 'vod_url',
          resIndex: 'data.0.vid'
        },
        {
          label: '',
          key: 'outdoorDivider',
          submit: false,
          labelWidth: '0',
          type: 'custom'
        },
        {
          label: '户外内容',
          key: 'outdoor',
          type: 'textarea',
          readOnly: true,
          placeholder: ''
        },
        {
          label: '户外媒体选择',
          key: 'outdoorMediaType',
          submit: false,
          type: 'select',
          readOnly: true,
          placeholder: ' ',
          options: [
            {
              label: '图片',
              value: '图片'
            },
            {
              label: '音视频',
              value: '媒体'
            }
          ],
          editDataRebuild(row) {
            const { outdoor_pic, outdoor_media } = row
            if (outdoor_pic && Array.isArray(outdoor_pic) && outdoor_pic.length > 0) {
              return '图片'
            }
            if (outdoor_media && Object.prototype.toString.call(outdoor_media).toLowerCase() == '[object object]' && Object.keys(outdoor_media).length > 0) {
              return '媒体'
            }
            return ''
          }
        },
        {
          label: '户外图片',
          key: 'outdoor_pic',
          type: 'upload',
          readOnly: true,
          uploadType: 'image',
          max: 3,
          hide: true,
          showKey: 'outdoorMediaType',
          showId: '图片',
          multiple: true,
          uploadName: 'plan',
          uploadParams: {
            type: 'plan'
          }
        },
        {
          label: '户外媒体',
          key: 'outdoor_media',
          type: 'upload',
          readOnly: true,
          uploadType: 'media',
          max: 1,
          hide: true,
          showKey: 'outdoorMediaType',
          showId: '媒体',
          uploadName: 'vod_url',
          resIndex: 'data.0.vid'
        },

        {
          label: '',
          key: 'interestDivider',
          submit: false,
          labelWidth: '0',
          type: 'custom'
        },
        {
          label: '兴趣课内容',
          key: 'interest',
          type: 'textarea',
          readOnly: true,
          placeholder: ''
        },
        {
          label: '兴趣课媒体选择',
          key: 'interestMediaType',
          submit: false,
          type: 'select',
          readOnly: true,
          placeholder: ' ',
          options: [
            {
              label: '图片',
              value: '图片'
            },
            {
              label: '音视频',
              value: '媒体'
            }
          ],
          editDataRebuild(row) {
            const { interest_pic, interest_media } = row
            if (interest_pic && Array.isArray(interest_pic) && interest_pic.length > 0) {
              return '图片'
            }
            if (interest_media && Object.prototype.toString.call(interest_media).toLowerCase() == '[object object]' && Object.keys(interest_media).length > 0) {
              return '媒体'
            }
            return ''
          }
        },
        {
          label: '兴趣课图片',
          key: 'interest_pic',
          type: 'upload',
          readOnly: true,
          uploadType: 'image',
          max: 3,
          hide: true,
          showKey: 'interestMediaType',
          showId: '图片',
          multiple: true,
          uploadName: 'plan',
          uploadParams: {
            type: 'plan'
          }
        },
        {
          label: '兴趣课媒体',
          key: 'interest_media',
          type: 'upload',
          readOnly: true,
          uploadType: 'media',
          max: 1,
          hide: true,
          showKey: 'interestMediaType',
          showId: '媒体',
          uploadName: 'vod_url',
          resIndex: 'data.0.vid'
        }
      ],
      deleteOption: {
        module: 'studyManagement',
        funcName: 'deletePlan',
        ensureText: '确定要删除该周计划吗？'
      }
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
          type: 'dateRange',
          key: 'date',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
          label: '日期:',
          labelWidth: '120'
        }
      ]
      this.topOperationColumn.needOperationColumn = true
    } else {
      this.topOperationColumn.needOperationColumn = false
    }
  },
  methods: {
    beforeSearch({ params, next }) {
      next().then(() => {
        this.tableOption.needEdit = !params.school_code
      })
    },
    handleUpload({ url, next }) {
      importWeeklyPlan({ url }).then(() => {
        next().then(() => {
          this.$refs.mainTable.search()
        })
      })
    }
  }
}
</script>
