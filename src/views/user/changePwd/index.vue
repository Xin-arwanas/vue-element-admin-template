<template>
  <div>
    <div style="width:100%;">
      <el-row>
        <el-col :span="12">
          <div class="app-container">
            <BasicForm ref="form" :form.sync="form" :form-option="formOption" />
            <div style="text-align: right">
              <el-button
                type="primary"
                size="small"
                @click="save"
              >保存</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import BasicForm from '@/components/BasicForm'
import { encryptDes } from '@/utils/ECB.js'
import { changePassword } from '@/api/user'
export default {
  components: {
    BasicForm
  },
  data() {
    return {
      formOption: {
        labelWidth: '80px'
      },
      form: [
        {
          label: '原密码',
          key: 'old_pwd',
          type: 'password',
          placeholder: '请输入原密码',
          rules: [
            {
              required: true, message: '原密码不能为空', trigger: 'blur'
            }
          ]
        },
        {
          label: '新密码',
          key: 'new_pwd',
          type: 'password',
          placeholder: '请输入新密码',
          rules: [
            {
              required: true, message: '新密码不能为空', trigger: 'blur'
            }
          ]
        },
        {
          label: '确认密码',
          key: 'confirm_new_pwd',
          type: 'password',
          placeholder: '请再次输入新密码',
          rules: [
            {
              required: true, message: '确认密码不能为空', trigger: 'blur'
            }
          ]
        }
      ]
    }
  },
  methods: {
    save() {
      this.$refs.form.confirm().then(params => {
        const { new_pwd, confirm_new_pwd } = params
        if (new_pwd != confirm_new_pwd) {
          this.$message({
            type: 'error',
            message: '请确认新密码与确认密码输入一致'
          })
          return
        }
        const p = {}
        Object.keys(params).map(key => {
          p[key] = this.handleEncryption(params[key])
        })
        changePassword(p).then(() => {
          this.$message({
            type: 'success',
            message: '修改密码成功!'
          })
          this.$refs.form.resetFields()
        })
      })
    },
    handleEncryption(str) {
      return encryptDes(str, 'mengbao1')
    }
  }
}
</script>
