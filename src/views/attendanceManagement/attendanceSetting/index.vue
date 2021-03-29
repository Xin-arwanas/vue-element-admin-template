<template>
  <div>
    <TableComponent
      :top-operation-column="topOperationColumn"
      :table-columns="tableColumns"
      :table-option="tableOption"
      :select-option="selectOption"
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
      topOperationColumn: {
        needOperationColumn: false,
        needAdd: false
      },
      tableOption: {
        module: 'attendanceManagement',
        funcName: 'getSchoolAttence',
        needSelection: false,
        needEdit: true,
        needDelete: false,
        params: {},
        actionWidth: 300
      },
      tableColumns: [
        {
          label: '园所名称',
          dataIndex: 'school_name'
        },
        {
          label: '教师上午打卡时间',
          dataIndex: 'start_stand'
        },
        {
          label: '教师下午打卡时间',
          dataIndex: 'off_stand'
        },
        {
          label: '学生上午打卡时间',
          dataIndex: 'start_stand_stu'
        },
        {
          label: '学生下午打卡时间',
          dataIndex: 'off_stand_stu'
        }
      ],
      editFormOption: {
        labelWidth: '160px',
        module: 'attendanceManagement',
        funcName: 'editSchoolAttence',
        idKey: 'class_id',
        idIndex: 'class_id'
      },
      editForm: [
        {
          label: '学校',
          key: 'school_code',
          placeholder: '请选择学校',
          disabled: true,
          type: 'select',
          selectKey: 'schoolSelect',
          rules: [
            { required: true, message: '请选择学校', trigger: 'change' }
          ]
        },
        {
          label: '教师上午打卡时间',
          key: 'start_stand',
          type: 'time',
          placeholder: '请选择教师上午打卡时间',
          format: 'HH:mm',
          showFormat: 'HH:mm',
          rules: [
            { required: true, message: '请选择教师上午打卡时间', trigger: 'change' }
          ]
        },
        {
          label: '教师下午打卡时间',
          key: 'off_stand',
          type: 'time',
          placeholder: '请选择教师下午打卡时间',
          format: 'HH:mm',
          showFormat: 'HH:mm',
          rules: [
            { required: true, message: '请选择教师下午打卡时间', trigger: 'change' }
          ]
        },
        {
          label: '学生上午打卡时间',
          key: 'start_stand_stu',
          type: 'time',
          placeholder: '请选择学生上午打卡时间',
          format: 'HH:mm',
          showFormat: 'HH:mm',
          rules: [
            { required: true, message: '请选择学生上午打卡时间', trigger: 'change' }
          ]
        },
        {
          label: '学生下午打卡时间',
          key: 'off_stand_stu',
          type: 'time',
          placeholder: '请选择学生下午打卡时间',
          format: 'HH:mm',
          showFormat: 'HH:mm',
          rules: [
            { required: true, message: '请选择学生下午打卡时间', trigger: 'change' }
          ]
        },
        {
          label: '考勤范围',
          key: 'range_size',
          type: 'string',
          placeholder: '请输入考勤范围'
        },
        {
          label: '考勤地址经度',
          key: 'st_lng',
          type: 'float',
          placeholder: '请输入考勤地址经度'
        },
        {
          label: '考勤地址维度',
          key: 'st_lat',
          type: 'float',
          placeholder: '请输入考勤地址维度'
        },
        {
          label: '考勤地址',
          key: 'st_address',
          type: 'textarea',
          placeholder: '请输入考勤地址'
        }
      ]
    }
  },
  methods: {
  }
}
</script>
