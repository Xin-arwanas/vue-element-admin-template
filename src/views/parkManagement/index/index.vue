<template>
  <div>
    <TableComponent
      :table-columns="tableColumns"
      :table-option="tableOption"
      :select-option="selectOption"
      :add-form-option="addFormOption"
      :add-form.sync="addForm"
      :edit-form-option="editFormOption"
      :edit-form.sync="editForm"
    />
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
        {
          selectKey: 'region',
          module: 'common',
          funcName: 'getRegionList',
          paramsKey: 'pid',
          init: false,
          label: 'title',
          value: 'id'
        }
      ],
      tableOption: {
        module: 'parkManagement',
        funcName: 'getSchoolList',
        needSelection: false,
        needEdit: true,
        needDelete: false,
        params: {},
        actionWidth: 300
      },
      tableColumns: [
        {
          label: '园所名字',
          dataIndex: 'name'
        },
        {
          label: '所在省份',
          dataIndex: 'province_name'
        },
        {
          label: '所在市',
          dataIndex: 'city_name'
        },
        {
          label: '园长姓名',
          dataIndex: 'manage_name'
        }
      ],
      addFormOption: {
        labelWidth: '120px',
        module: 'parkManagement',
        funcName: 'createschool'
      },
      addForm: [
        {
          label: '园所区域',
          key: 'region_code',
          type: 'cascader',
          placeholder: '请选择园所区域',
          selectKey: 'region',
          cascaderProps: {
            lazy: true,
            emitPath: false,
            checkStrictly: true,
            leaf: 'isLast'
          },
          rules: [
            { required: true, message: '请选择园所区域', trigger: 'change' }
          ]
        },
        {
          label: '园区名称',
          key: 'name',
          type: 'string',
          placeholder: '请填写园区名称',
          rules: [
            { required: true, message: '请填写园区名称', trigger: 'blur' }
          ]
        },
        {
          label: '园区地址',
          key: 'addr',
          type: 'textarea',
          placeholder: '请填写园区地址',
          rules: [
            { required: true, message: '请填写园区地址', trigger: 'blur' }
          ]
        },
        {
          label: '园所类型',
          key: 'type',
          type: 'select',
          placeholder: '请选择园所类型',
          options: [
            {
              label: '直营',
              value: '直营'
            },
            {
              label: '连锁',
              value: '连锁'
            }
          ],
          rules: [
            { required: true, message: '请选择园所类型', trigger: 'change' }
          ]
        },
        {
          label: '园区介绍',
          key: 'content',
          type: 'textarea',
          placeholder: '请填写园区介绍'
        },
        {
          label: '最低正常体温',
          key: 'min_temperature',
          type: 'float',
          placeholder: '请填写最低正常体温'
        },
        {
          label: '最高正常体温',
          key: 'max_temperature',
          type: 'float',
          placeholder: '请填写最高正常体温'
        }
      ],
      editFormOption: {
        labelWidth: '120px',
        module: 'parkManagement',
        funcName: 'updateSchool',
        idIndex: 'code',
        idKey: 'school_code'
      },
      editForm: [
        {
          label: '园所区域',
          key: 'region_code',
          type: 'cascader',
          placeholder: '请选择园所区域',
          selectKey: 'region',
          cascaderProps: {
            lazy: true,
            emitPath: false,
            checkStrictly: true,
            leaf: 'isLast'
          },
          disabled: true,
          editDataRebuild(row) {
            const { region_code } = row
            const arr = []
            const area1 = region_code.slice(0, 2)
            const area2 = region_code.slice(2, 4)
            const area3 = region_code.slice(4, 6)
            const area4 = region_code.slice(6, 9)
            const area5 = region_code.slice(9, 12)
            arr.push(area1)
            if (area2 == '00') return arr
            arr.push(area1 + area2 + '00000000')
            if (area3 == '00') return arr
            arr.push(area1 + area2 + area3 + '000000')
            if (area4 == '000') return arr
            arr.push(area1 + area2 + area3 + area4 + '000')
            if (area5 == '000') return arr
            arr.push(region_code)
            return arr
          },
          rules: [
            { required: true, message: '请选择园所区域', trigger: 'change' }
          ]
        },
        {
          label: '园区名称',
          key: 'name',
          type: 'string',
          placeholder: '请填写园区名称',
          rules: [
            { required: true, message: '请填写园区名称', trigger: 'blur' }
          ]
        },
        {
          label: '园区地址',
          key: 'addr',
          type: 'textarea',
          placeholder: '请填写园区地址',
          rules: [
            { required: true, message: '请填写园区地址', trigger: 'blur' }
          ]
        },
        {
          label: '园所类型',
          key: 'type',
          type: 'select',
          placeholder: '请选择园所类型',
          options: [
            {
              label: '直营',
              value: '直营'
            },
            {
              label: '连锁',
              value: '连锁'
            }
          ],
          rules: [
            { required: true, message: '请选择园所类型', trigger: 'change' }
          ]
        },
        {
          label: '园区介绍',
          key: 'content',
          type: 'textarea',
          placeholder: '请填写园区介绍'
        },
        {
          label: '最低正常体温',
          key: 'min_temperature',
          type: 'float',
          placeholder: '请填写最低正常体温'
        },
        {
          label: '最高正常体温',
          key: 'max_temperature',
          type: 'float',
          placeholder: '请填写最高正常体温'
        }
      ]
    }
  },
  methods: {
  }
}
</script>
