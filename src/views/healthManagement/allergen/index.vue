<template>
  <div>
    <TableComponent
      :top-operation-column="topOperationColumn"
      :table-columns="tableColumns"
      :table-option="tableOption"
      :select-option="selectOption"
      :add-form-option="addFormOption"
      :add-form.sync="addForm"
      :edit-form-option="editFormOption"
      :edit-form.sync="editForm"
      :delete-option="deleteOption"
    >
      <template v-slot:custom="{ data: { row } }">
        <div>
          {{ row.type == 1? '食品类':'药品类' }}
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
      selectOption: [],
      topOperationColumn: {
        needAdd: true
      },
      tableOption: {
        module: 'healthManagement',
        funcName: 'getAllergenList',
        needSelection: false,
        needEdit: true,
        needDelete: true,
        params: {},
        actionWidth: 300
      },
      tableColumns: [
        {
          label: '过敏源',
          dataIndex: 'name'
        },
        {
          label: '类型',
          dataIndex: 'type',
          type: 'custom'
        }
      ],
      addFormOption: {
        labelWidth: '80px',
        module: 'healthManagement',
        funcName: 'addAllergen'
      },
      addForm: [
        {
          label: '过敏源',
          key: 'name',
          placeholder: '请填写过敏源',
          type: 'string',
          rules: [
            { required: true, message: '请填写过敏源', trigger: 'blur' }
          ]
        },
        {
          label: '类型',
          key: 'type',
          placeholder: '请选择过敏源类型',
          type: 'select',
          options: [
            {
              label: '食品类',
              value: '1'
            },
            {
              label: '药品类',
              value: '2'
            }
          ],
          rules: [
            { required: true, message: '请选择过敏源类型', trigger: 'change' }
          ]
        }
      ],
      editFormOption: {
        labelWidth: '80px',
        module: 'healthManagement',
        funcName: 'editAllergen'
      },
      editForm: [
        {
          label: '过敏源',
          key: 'name',
          placeholder: '请填写过敏源',
          type: 'string',
          rules: [
            { required: true, message: '请填写过敏源', trigger: 'blur' }
          ]
        },
        {
          label: '类型',
          key: 'type',
          placeholder: '请选择过敏源类型',
          type: 'select',
          options: [
            {
              label: '食品类',
              value: '1'
            },
            {
              label: '药品类',
              value: '2'
            }
          ],
          rules: [
            { required: true, message: '请选择过敏源类型', trigger: 'change' }
          ]
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
  }
}
</script>
