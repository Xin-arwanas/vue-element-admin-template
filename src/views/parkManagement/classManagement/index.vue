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
          module: 'parkManagement',
          funcName: 'getschoolcode',
          selectKey: 'schoolSelect',
          label: 'name',
          value: 'code'
        }
      ],
      tableOption: {
        module: 'parkManagement',
        funcName: 'getClassList',
        needSelection: false,
        needEdit: true,
        needDelete: false,
        params: {},
        actionWidth: 300
      },
      tableColumns: [
        {
          label: '学校名称',
          dataIndex: 'school_name'
        },
        {
          label: '班级名称',
          dataIndex: 'class_name'
        },
        {
          label: '班级类型',
          dataIndex: 'type'
        },
        {
          label: '班级届数',
          dataIndex: 'class_year'
        }
      ],
      addFormOption: {
        labelWidth: '80px',
        module: 'parkManagement',
        funcName: 'createClass'
      },
      addForm: [
        {
          label: '学校',
          key: 'school_code',
          placeholder: '请选择学校',
          type: 'select',
          selectKey: 'schoolSelect',
          rules: [
            { required: true, message: '请选择学校', trigger: 'change' }
          ]
        },
        {
          label: '班级届数',
          key: 'class_year',
          type: 'year',
          placeholder: '请选择班级届数',
          rules: [
            { required: true, message: '请选择班级届数', trigger: 'change' }
          ]
        },
        {
          label: '班级类型',
          key: 'type',
          type: 'select',
          placeholder: '请选择班级类型',
          options: [
            {
              label: 'IC',
              value: 'IC'
            },
            {
              label: 'CASA',
              value: 'CASA'
            }
          ],
          rules: [
            { required: true, message: '请选择班级类型', trigger: 'change' }
          ]
        },
        {
          label: '班级名称',
          key: 'class_name',
          type: 'string',
          placeholder: '请填写班级名称',
          rules: [
            { required: true, message: '请填写班级名称', trigger: 'blur' }
          ]
        }
      ],
      editFormOption: {
        labelWidth: '80px',
        module: 'parkManagement',
        funcName: 'updateClass',
        idKey: 'class_id',
        idIndex: 'class_id'
      },
      editForm: [
        {
          label: '学校',
          key: 'school_code',
          placeholder: '请选择学校',
          type: 'select',
          selectKey: 'schoolSelect',
          rules: [
            { required: true, message: '请选择学校', trigger: 'change' }
          ]
        },
        {
          label: '班级届数',
          key: 'class_year',
          type: 'year',
          placeholder: '请选择班级届数',
          rules: [
            { required: true, message: '请选择班级届数', trigger: 'change' }
          ]
        },
        {
          label: '班级类型',
          key: 'type',
          type: 'select',
          placeholder: '请选择班级类型',
          options: [
            {
              label: 'IC',
              value: 'IC'
            },
            {
              label: 'CASA',
              value: 'CASA'
            }
          ],
          rules: [
            { required: true, message: '请选择班级类型', trigger: 'change' }
          ]
        },
        {
          label: '班级名称',
          key: 'class_name',
          type: 'string',
          placeholder: '请填写班级名称',
          rules: [
            { required: true, message: '请填写班级名称', trigger: 'blur' }
          ]
        }
      ]
    }
  },
  methods: {
  }
}
</script>
