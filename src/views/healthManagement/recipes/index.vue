<template>
  <div class="recipes">
    <TableComponent
      ref="mainTable"
      :top-operation-column="topOperationColumn"
      :table-columns="tableColumns"
      :table-option="tableOption"
      :select-option="selectOption"
    >
      <template slot="topOperations">
        <el-row type="flex" justify="space-between" style="width:100%;">
          <ImportFile accept="excel" :request="handleUpload">
            <el-button size="small" type="primary">导入食谱</el-button>
          </ImportFile>
          <el-button type="warning" size="small" @click="appoint">指定老师</el-button>
        </el-row>
      </template>
      <template v-slot:custom="{ data: { row } }">
        <div :style="{textAlign:'left'}">
          <BasicForm
            :ref="`form_${row.week}`"
            :form.sync="form"
            :form-option="formOption"
            :data="{foods:row.foods,allergens:row.allergens}"
            :select-list="$refs.mainTable.selectList"
            @asyncSelectLoad="asyncSelectLoad"
          />
          <div style="padding-left:150px;">
            <el-button type="success" size="medium" @click="submit(row)">提交</el-button>
          </div>
        </div>
      </template>
    </TableComponent>
  </div>
</template>
<script>
import TableComponent from '@/components/TableComponent'
import BasicForm from '@/components/BasicForm'
import { editWeeklyRecipe } from '@/api/healthManagement'
import { importRecipe } from '@/api/healthManagement'
import ImportFile from '@/components/ImportFile'
export default {
  components: {
    TableComponent,
    BasicForm,
    ImportFile
  },
  data() {
    return {
      selectOption: [
        {
          module: 'healthManagement',
          funcName: 'searchAllergen',
          selectKey: 'allergenSelect',
          label: 'name',
          value: 'id',
          paramsKey: 'name'
        },
        {
          module: 'parkManagement',
          funcName: 'getschoolcode',
          selectKey: 'schoolSelect',
          label: 'name',
          value: 'code'
        },
        {
          module: 'personManagement',
          funcName: 'getTeachers',
          selectKey: 'teacherSelect',
          relationKey: 'school_code',
          paramsKey: 'school_code',
          label: 'name',
          value: 'uuid'
        }
      ],
      searchForm: [
        {
          type: 'select',
          key: 'school_code',
          placeholder: '请选择学校',
          label: '学校:',
          labelWidth: '80',
          selectKey: 'schoolSelect'
        }
      ],
      topOperationColumn: {
        needAdd: false
      },
      tableOption: {
        module: 'healthManagement',
        funcName: 'getWeeklyRecipe',
        needSelection: false,
        needEdit: false,
        needDelete: false,
        params: {},
        actionWidth: 300,
        needAction: false,
        autoHeight: true
      },
      tableColumns: [
        {
          label: '星期',
          dataIndex: 'weekday',
          width: 200
        },
        {
          label: '食谱',
          type: 'custom'
        }
      ],
      formOption: {
        labelWidth: '150px'
      },
      form: [
        {
          label: '过敏源',
          key: 'allergens',
          type: 'asyncSelect',
          multiple: true,
          selectKey: 'allergenSelect',
          placeholder: '请选择过敏源'
        },
        {
          label: '食谱',
          key: 'foods',
          type: 'dynamic',
          formOption: {
            labelWidth: '80px'
          },
          addPosition: 'behind',
          form: [
            // {
            //   label: '餐食类型',
            //   key: 'title',
            //   type: 'string',
            //   placeholder: '请输入餐点名'
            // },
            {
              label: '菜名',
              key: 'food',
              type: 'textarea',
              placeholder: '请填写食物'
            },
            {
              label: '图片',
              key: 'pic',
              type: 'upload',
              uploadType: 'image',
              uploadName: 'food',
              uploadParams: {
                type: 'food'
              },
              max: 1
            }
          ]
        }
      ],
      uploadLoading: false,

      appointForm: [
        {
          label: '学校',
          key: 'school_code',
          type: 'select',
          placeholder: '请选择学校',
          selectKey: 'schoolSelect',
          rules: [
            {
              required: true, message: '请选择学校', trigger: 'change'
            }
          ]
        },
        {
          label: '老师',
          key: 'uuid',
          type: 'select',
          placeholder: '请选择老师',
          selectKey: 'teacherSelect',
          rules: [
            {
              required: true, message: '请选择老师', trigger: 'change'
            }
          ]
        }
      ],
      appointFormOption: {
        labelWidth: '100px',
        module: 'healthManagement',
        funcName: 'chooseRecipeManager',
        messageText: '指定成功！'
      }
    }
  },
  methods: {
    asyncSelectLoad({ query, formItem }) {
      const { selectKey } = formItem
      const asyncLoadSelect = this.selectOption.find(option => option.selectKey == selectKey)
      const { paramsKey, params, label, value } = asyncLoadSelect
      const p = {}
      p[paramsKey] = query
      this.$refs.mainTable.initSelectList({ params: { ...(params || {}), ...p }, selectKey, label, value, selectDataKey: 'selectList' })
    },
    beforeSearch({ next }) {
      this.$refs.mainTable.initSelectList({ ...this.selectOption[0], selectDataKey: 'selectList' })
      next()
    },
    submit(row) {
      const { week, school_code } = row
      const form = this.$refs[`form_${week}`]
      form.confirm().then(params => {
        const p = { ...params, school_code, week }
        editWeeklyRecipe(p).then(() => {
          this.$message({
            type: 'success',
            message: '编辑成功!'
          })
        })
      })
    },
    handleUpload({ url, next }) {
      importRecipe({ url }).then(() => {
        next().then(() => {
          this.$refs.mainTable.handleSearch()
        })
      })
    },
    appoint() {
      this.$refs.mainTable.initFormDialog({
        title: '指定上传食谱图片的老师',
        form: this.appointForm,
        formOption: this.appointFormOption
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.recipes{
  ::v-deep{
    .el-table__row:nth-child(odd){
      background-color:#fde9e9;
    }
    .el-table__row:nth-child(even){
      background-color:#d7f7d7;
    }
  }
}

</style>
