<template>
  <div>
    <el-upload
      action=""
      :before-upload="acceptMap[accept]?_beforeUpload:beforeUpload"
      :accept="acceptMap[accept]?acceptMap[accept]:accept"
      :http-request="upload?upload:handleUpload"
      :show-file-list="false"
      :limit="1"
    >
      <div v-loading="uploadLoading">
        <slot />
      </div>
    </el-upload>
  </div>
</template>
<script>
import { uploadExcel } from '@/api/common'
export default {
  props: {
    beforeUpload: {
      type: Function,
      default: null
    },
    request: {
      type: Function,
      default: null
    },
    upload: {
      type: Function,
      default: null
    },
    limit: {
      type: Number,
      default: 1
    },
    accept: {
      type: String,
      default: ''
    },
    fileKey: {
      type: String,
      default: 'file'
    }
  },
  data() {
    return {
      uploadLoading: false,
      acceptMap: {
        excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'
      }
    }
  },
  methods: {
    _beforeUpload(file) {
      if (this.acceptMap[this.accept]) {
        const { type } = file
        switch (this.accept) {
          case 'excel':
            if (!['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].some(item => item == type)) {
              this.$message.error('文件格式不正确')
              return false
            }
            break
          default:
            return true
        }
        return true
      }
      if (this.beforeUpload && typeof (this.beforeUpload) == 'function') {
        return this.beforeUpload(file)
      }
      return true
    },
    handleUpload(option) {
      const { file, onSuccess, onError } = option
      const formData = new FormData()
      formData.append(this.fileKey, file)
      this.uploadLoading = true
      uploadExcel(formData).then(res => {
        const url = res.data
        if (this.request && typeof (this.request) == 'function') {
          this.request({
            url, next: () => {
              return new Promise(resolve => {
                onSuccess(res)
                this.uploadLoading = false
                resolve()
              })
            }
          })
          return
        }
        onSuccess(res)
        this.uploadLoading = false
      }).catch(() => {
        onError()
      })
    }
  }
}
</script>
