<template>
  <div :style="{ ...(formOption.formStyle || {}) }">
    <el-form
      :key="refreshKey"
      ref="form"
      :inline="!!formOption.inline"
      :model="params"
      :label-position="formOption.labelPosition || 'right'"
      :label-width="formOption.labelWidth || labelWidth"
      @submit.native.prevent
    >
      <template v-for="(formItem, index) in asyncForm">
        <el-form-item
          v-if="!formItem.hide || showFormItem(formItem)"
          :key="index"
          :class="{readOnly:formItem.readOnly}"
          :prop="formItem.key"
          :label="formItem.label"
          :rules="rules(formItem)"
          :label-width="
            formItem.labelWidth || formOption.labelWidth || labelWidth
          "
        >
          <template v-if="formItem.type == 'custom'">
            <slot name="custom" :data="{ formItem, params, selectList }" />
          </template>
          <el-input
            v-if="['string', 'phone', 'float', 'password', 'email'].includes(formItem.type)"
            v-model="params[formItem.key]"
            :show-password="formItem.type == 'password'"
            :disabled="formItem.readOnly || formItem.disabled"
            :maxlength="formItem.limit"
            :show-word-limit="!!formItem.limit"
            :placeholder="formItem.placeholder || ''"
            :size="formOption.size || formItem.size || formItemSize"
            :style="{ width: '100%', ...formItem.style }"
          />
          <el-input
            v-if="formItem.type == 'textarea'"
            v-model="params[formItem.key]"
            :disabled="formItem.readOnly || formItem.disabled"
            :maxlength="formItem.limit"
            :show-word-limit="!!formItem.limit"
            :placeholder="formItem.placeholder || ''"
            :autosize="{ minRows: 2 }"
            type="textarea"
            :style="{ width: '100%', ...formItem.style }"
          />
          <el-time-picker
            v-if="['time','timeRange'].includes(formItem.type)"
            v-model="params[formItem.key]"
            :disabled="formItem.readOnly || formItem.disabled"
            :is-range="formItem.type == 'timeRange'"
            range-separator="-"
            :placeholder="formItem.placeholder || '请选择时间'"
            :start-placeholder="formItem.startPlaceholder || '开始时间'"
            :end-placeholder="formItem.endPlaceholder || '结束时间'"
            :size="formOption.size || formItem.size || formItemSize"
            :value-format="formItem.format || defaultFormat[formItem.type]"
            :format="formItem.showFormat || defaultFormat[formItem.type]"
            :style="{ width: '100%', ...formItem.style }"
          />
          <el-date-picker
            v-if="['date','dateTime','dateRange','dateTimeRange','year','month','dates'].includes(formItem.type)"
            v-model="params[formItem.key]"
            :disabled="formItem.readOnly || formItem.disabled"
            range-separator="-"
            :type="formItem.type.toLowerCase()"
            :start-placeholder="formItem.startPlaceholder || '开始日期'"
            :end-placeholder="formItem.endPlaceholder || '结束日期'"
            :placeholder="formItem.placeholder || '请选择日期'"
            :size="formOption.size || formItem.size || formItemSize"
            :value-format="formItem.format || defaultFormat[formItem.type]"
            :format="formItem.showFormat || defaultFormat[formItem.type]"
            :style="{ width: '100%', ...formItem.style }"
          />
          <el-select
            v-if="formItem.type == 'select'"
            v-model="params[formItem.key]"
            :disabled="formItem.readOnly || formItem.disabled"
            :filterable="!!formItem.inputable"
            :allow-create="!!formItem.inputable"
            :clearable="formItem.hasOwnProperty('clearable')?formItem.clearable:true"
            :loading="formItem.loading"
            :placeholder="formItem.placeholder || '请选择'"
            :size="formOption.size || formItem.size || formItemSize"
            :style="{ width: '100%', ...formItem.style }"
            @change="(value) => selectChange({ value, formItem })"
          >
            <el-option
              v-for="option in formItem.options ||
                selectList[formItem.selectKey]"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
          <el-select
            v-if="formItem.type == 'multiSelect'"
            v-model="params[formItem.key]"
            :disabled="formItem.readOnly || formItem.disabled"
            multiple
            :loading="formItem.loading"
            :placeholder="formItem.placeholder || '请选择'"
            :size="formOption.size || formItem.size || formItemSize"
            :style="{ width: '100%', ...formItem.style }"
          >
            <el-option
              v-for="option in formItem.options ||
                selectList[formItem.selectKey]"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
          <el-select
            v-if="formItem.type == 'asyncSelect'"
            v-model="params[formItem.key]"
            :multiple="formItem.multiple"
            filterable
            remote
            :disabled="formItem.readOnly || formItem.disabled"
            :loading="formItem.loading"
            :remote-method="(query) => asyncSelectLoad({ query, formItem })"
            :placeholder="formItem.placeholder || '请选择'"
            :size="formOption.size || formItem.size || formItemSize"
            :style="{ width: '100%', ...formItem.style }"
            @change="(value) => selectChange({ value, formItem })"
          >
            <el-option
              v-for="item in selectList[formItem.selectKey] || []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-cascader
            v-if="formItem.type == 'cascader'"
            v-model="params[formItem.key]"
            :disabled="formItem.readOnly || formItem.disabled"
            :separator="formItem.separator || '/'"
            :props="cascaderProps(formItem)"
            :placeholder="formItem.placeholder || '请选择'"
            :size="formOption.size || formItem.size || formItemSize"
            :style="{ width: '100%', ...formItem.style }"
          />
          <div v-if="formItem.type == 'upload'">
            <el-upload
              :ref="`upload_${formItem.key}`"
              :disabled="formItem.readOnly || formItem.disabled"
              :class="{ hide: params[formItem.key].length >= formItem.max }"
              :action="''"
              :data="formItem.uploadParams || {}"
              :name="formItem.uploadName || 'file'"
              :multiple="!!formItem.multiple"
              :limit="formItem.max || 1"
              :file-list="fileList[formItem.key] || []"
              :list-type="
                formItem.uploadType == 'image' ? 'picture-card' : 'text'
              "
              :before-upload="(file) => beforeUpload({ file, formItem })"
              :accept="uploadAccept[formItem.uploadType]"
              :http-request="(option) => handleUpload({ option, formItem })"
              :on-preview="(file) => handlePreview({ file, formItem })"
              :on-exceed="(file,fileList) => onExceed({file,fileList,formItem})"
              :on-success="
                (response, file, fileLists) =>
                  uploadSuccess({
                    response,
                    file,
                    fileList: fileLists,
                    formItem,
                  })
              "
              :on-remove="
                (file, fileLists) =>
                  uploadRemove({
                    file,
                    fileList: fileLists,
                    formItem,
                  })
              "
            >
              <i class="el-icon-plus" />
            </el-upload>
          </div>

          <div v-if="formItem.type == 'dynamic'">
            <el-button
              v-if="!(formItem.readOnly || formItem.disabled) && (formItem.hasOwnProperty('addPosition')?formItem.addPosition == 'font':true)"
              style="display: block"
              type="primary"
              :size="formOption.size || formItem.size || formItemSize"
              @click="addDynamic({ formItem })"
            >新增</el-button>
            <template
              v-if="params[formItem.key] && params[formItem.key].length > 0"
            >
              <draggable handle=".dynamic_row_index" :set-data="dynamicSetData" :value="params[formItem.key]" :group="`dynamicForm_${formItem.key}`" ghost-class="sortable-ghost" @update="$event => dynamicListChange(formItem,$event)">
                <el-row
                  v-for="(dynamicItem, i) in params[formItem.key] || []"
                  :key="`${formItem.key}_${i}`"
                >

                  <el-col v-if="formItem.needIndex" class="dynamic_row_index" :span="1" style="text-align:center;">{{ dynamicIndex(i,formItem.indexType) }}</el-col>

                  <el-col :span="(formItem.readOnly || formItem.disabled)?23:19">
                    <BasicForm
                      :ref="`dynamicForm_${formItem.key}`"
                      :form.sync="formItem.form"
                      :form-option="formItem.formOption"
                      :select-list="selectList"
                      :data="params[formItem.key][i] || {}"
                      @selectChange="selectChange"
                      @cascaderLoad="cascaderLoad"
                      @asyncSelectLoad="asyncSelectLoad"
                    />
                  </el-col>
                  <el-col v-if="!(formItem.readOnly || formItem.disabled)" :span="2" :offset="1">
                    <el-button
                      type="danger"
                      :size="formOption.size || formItem.size || formItemSize"
                      @click="deleteDynamic({ formItem, index: i })"
                    >删除</el-button>
                  </el-col>

                </el-row>
              </draggable>
            </template>
            <el-button
              v-if="!(formItem.readOnly || formItem.disabled) && formItem.hasOwnProperty('addPosition')?formItem.addPosition == 'behind':false"
              style="display: block"
              type="primary"
              :size="formOption.size || formItem.size || formItemSize"
              @click="addDynamic({ formItem })"
            >新增</el-button>
          </div>
          <Tinymce
            v-if="formItem.type == 'editor'"
            v-model="params[formItem.key]"
            :height="300"
            :menubar="''"
            :toolbar="[
              'bold italic underline strikethrough alignleft aligncenter alignright outdent indent removeformat',
            ]"
          />
        </el-form-item>
      </template>
    </el-form>
    <el-dialog
      :visible.sync="previewVisible"
      :append-to-body="true"
      @close="
        () => {
          previewVisible = false;
          previewImageUrl = '';
        }
      "
    >
      <div style="height: 500px; text-align: center">
        <el-image
          style="width: 500px; height: 500px"
          :src="previewImageUrl"
          fit="contain"
        />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import { validPhone, validFloat, validEmail } from '@/utils/validate'
import { uploadSinglePic, uploadMedia, uploadExcel } from '@/api/common'
import draggable from 'vuedraggable'
const validPhoneNumber = (rule, value, callback) => {
  if (!value) {
    callback()
  }
  if (!validPhone(value)) {
    callback(new Error('请填写正确的手机号'))
  } else {
    callback()
  }
}
const validFloatNumber = (rule, value, callback) => {
  if (!value) {
    callback()
  }
  if (!validFloat(value)) {
    callback(new Error('请填写正确的数字'))
  } else {
    callback()
  }
}
const validEmailString = (rule, value, callback) => {
  if (!value) {
    callback()
  }
  if (!validEmail(value)) {
    callback(new Error('请填写正确的邮箱地址'))
  } else {
    callback()
  }
}
export default {
  name: 'BasicForm',
  components: {
    Tinymce,
    draggable
  },
  props: {
    formOption: {
      type: Object,
      default() {
        return {}
      }
    },
    form: {
      type: Array,
      default() {
        return []
      }
    },
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    selectList: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      previewVisible: false,
      previewImageUrl: '',
      refreshKey: 0,
      formItemSize: 'medium',
      labelWidth: '100px',
      asyncForm: [],
      params: {},
      fileList: {},
      defaultFormat: {
        date: 'yyyy-MM-dd',
        time: 'HH:mm:ss',
        dateTime: 'yyyy-MM-dd HH:mm:ss',
        dateRange: 'yyyy-MM-dd',
        timeRange: 'HH:mm:ss',
        dateTimeRange: 'yyyy-MM-dd HH:mm:ss',
        year: 'yyyy',
        month: 'yyyy-MM',
        dates: 'yyyy-MM-dd'
      },
      uploadAccept: {
        image: 'image/*',
        video: 'video/*',
        audio: 'audio/*',
        media: 'video/*,audio/*',
        excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'
      },
      letterIndex: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    }
  },
  computed: {
    // 表单规则，无需在页面中写的在这里配置
    rules() {
      return (formItem) => {
        let rules = formItem.rules || []
        const { type } = formItem
        if (type == 'phone') {
          rules = [
            {
              validator: validPhoneNumber,
              message: '请填写正确的手机号',
              trigger: 'blur'
            },
            ...rules
          ]
        }
        if (type == 'float') {
          rules = [
            {
              validator: validFloatNumber,
              message: '请填写正确的数字',
              trigger: 'blur'
            },
            ...rules
          ]
        }
        if (type == 'email') {
          rules = [
            {
              validator: validEmailString,
              message: '请填写正确的邮箱地址',
              trigger: 'blur'
            },
            ...rules
          ]
        }
        return rules
      }
    },
    // 动态表单显示变量（注意：这里不能修改变量，会造成死循环）
    showFormItem() {
      return (formItem) => {
        const { showKey, showId } = formItem
        const targetValue = this.params[showKey] // 目标值（用户操作的值）
        let result = false
        if (Array.isArray(targetValue)) { // 兼容多选下拉框
          if (Array.isArray(showId)) { // 多种情况都会显示，于是使用数组
            result =
              targetValue.findIndex((value) =>
                showId.some((item) => item == value)
              ) > -1
          } else {
            result = targetValue.findIndex((value) => value == showId) > -1
          }
        }
        if (
          Object.prototype.toString.call(targetValue) == '[object String]' ||
          !isNaN(targetValue)
        ) {
          if (Array.isArray(showId)) {
            result = showId.some((item) => item == targetValue)
          } else {
            result = targetValue == showId
          }
        }
        return result
      }
    },
    // 级联选择器props配置
    cascaderProps() {
      return (formItem) => {
        return {
          expandTrigger: 'click',
          lazy: false,
          emitPath: true,
          checkStrictly: false,
          value: 'value',
          label: 'label',
          children: 'children',
          leaf: 'leaf',
          ...(formItem.cascaderProps || {}),
          lazyLoad: (node, resolve) =>
            this.cascaderLoad({ node, resolve, formItem }) // 异步获取数据方法（建议都采取异步加载的方式，若需一次性数据写入，需对el-cascader的参数做判断）
        }
      }
    },
    serializeSelectList() {
      // 下拉框数据对象改变（仅仅是对象地址改变，数据值可能不变），即将下拉框的loading改为false
      Object.keys(this.selectList).map(selectKey => {
        if (this.asyncForm.some(formItem => formItem.selectKey == selectKey && formItem.type == 'asyncSelect')) {
          this.changeSelectLoading(selectKey, false)
        }
      })
      return JSON.stringify(this.selectList)
    },
    // 动态增减表单索引
    dynamicIndex(i, type) {
      return (i, type) => {
        switch (type) {
          case 'number':
            return i + 1
          case 'letter':
            return this.letterIndex[i]
          default:
            return i + 1
        }
      }
    }
  },
  watch: {
    data(newV, oldV) {
      this.initForms()
    },
    // 监听序列化下拉列表数据
    serializeSelectList(newV, oldV) {
      const newValue = JSON.parse(newV)
      const oldValue = JSON.parse(oldV)
      Object.keys(newValue).map((selectKey) => {
        if (
          JSON.stringify(newValue[selectKey]) !=
          JSON.stringify(oldValue[selectKey])
        ) {
          const targets = this.asyncForm.filter(
            (item) => item.selectKey == selectKey
          )
          if (targets && targets.length > 0) {
            targets.map(target => {
              const { key, type, multiple } = target
              if (type == 'asyncSelect' || multiple) {
                this.changeSelectLoading(selectKey, false)
                return
              }
              if (JSON.stringify(oldValue[selectKey]) && oldValue[selectKey].length > 0) {
                this.$set(this.params, key, '')
              }
            })
          }
        }
      })
    }
  },
  mounted() {
    this.initForms()
  },
  methods: {
    // 重置表单
    resetFields() {
      this.$refs.form.resetFields()
    },
    // 刷新表单状态（强制更新表单状态）
    refreshForm() {
      this.refreshKey++
    },
    // 初始化表单
    initForms() {
      if (this.form.length > 0) {
        this.asyncForm = JSON.parse(JSON.stringify(this.form)) // 拷贝表单数组
        this.asyncForm.map((formItem) => {
          this.setParams(formItem)
        })
      }
    },
    // 设置对应表单
    setParams(formItem) {
      const arrayInitValue = [
        'timeRange',
        'dateRange',
        'dateTimeRange',
        'multiSelect',
        'upload',
        'dynamic',
        'cascader'
      ]
      let value = ''
      const { type, key, paramsType = 'string', selectKey, value: defaultValue } = formItem
      if (arrayInitValue.some((item) => item === type)) {
        // 初始化需要是一个数组的type
        value = []
        if (
          ['timeRange', 'dateRange', 'dateTimeRange'].findIndex(
            (v) => v == type
          ) > -1
        ) {
          value = ['', '']
        }
      }
      if (type === 'upload') {
        let fileList = []
        if (this.data[key]) {
          switch (paramsType) {
            case 'string':
              if (typeof (this.data[key]) == 'string') {
                // 获取到的是个相对路径
                fileList = [{
                  name: `媒体`,
                  url: process.env.VUE_APP_ROOT_PATH + this.data[key]
                }]
                value = [this.data[key]]
              }
              if (Array.isArray(this.data[key]) && this.data[key].length > 0) {
                // 获取到相对路径的数组
                fileList = this.data[key].map((item, index) => {
                  return {
                    name: `媒体${index + 1}`,
                    url: process.env.VUE_APP_ROOT_PATH + item
                  }
                })
                value = this.data[key]
              }
              if (Object.prototype.toString.call(this.data[key]).toLowerCase() == '[object object]' && Object.keys(this.data[key]).length > 0) {
                // 媒体类返回的是一个对象
                fileList = [
                  {
                    name: this.data[key].videoName,
                    url: this.data[key].origUrl
                  }
                ]
                value = [this.data[key].vid]
              }
              break
            case 'file':
              // 当返回的是一个file对象时，在这里做进一步判断
              break
          }
          this.$set(this.fileList, key, fileList)
          this.$set(this.params, key, value)
          return
        } else {
          this.$set(this.fileList, key, [])
        }
      }
      if (type == 'select' && selectKey && this.data[key]) {
        // 下拉列表接收到数据，需要提醒父组件，看是否有关联表单需要初始化（通常是再去获取关联下拉列表数据）
        this.$emit('selectChange', { value: this.data[key], formItem })
      }
      if (type == 'asyncSelect' && selectKey && this.data[key]) {
        // 异步搜索类下拉列表（通常列表数据庞大，其中不含数据所给id项）
        if (!Array.isArray(this.data[key])) {
          this.asyncSelectLoad({
            query: this.data[key],
            formItem
          })
        } else {
          this.changeSelectLoading(selectKey, false)
        }
      }
      if (this.data[key]) {
        this.$set(this.params, key, this.data[key])
        return
      }
      if (defaultValue) {
        if (selectKey) {
          if (this.selectList[selectKey].some(item => item.value == defaultValue)) {
            this.$set(this.params, key, defaultValue)
            this.$emit('selectChange', { value: defaultValue, formItem })
          } else {
            this.$set(this.params, key, this.selectList[selectKey].length > 0 ? this.selectList[selectKey][0].value : '')
            this.$emit('selectChange', { value: this.selectList[selectKey].length > 0 ? this.selectList[selectKey][0].value : '', formItem })
          }
        } else {
          this.$set(this.params, key, defaultValue)
        }
        return
      }
      this.$set(this.params, key, value)
      // this.$set(this.params, key, this.data[key] || defaultValue || value)
    },
    selectChange({ value, formItem }) {
      // 下拉列表选择回调
      this.$emit('selectChange', { value, formItem })
      // 异步获取下拉列表同时需要填充其他表单
      const { selectKey } = formItem
      if (selectKey) {
        this.asyncForm.map(item => {
          if (item.selectKey && item.selectKey == selectKey && !['select', 'asyncSelect', 'cascader', 'multiSelect'].includes(item.type)) {
            const { key } = item
            if (this.selectList[selectKey].find(o => o.value == value)) {
              this.params[key] = this.selectList[selectKey].find(o => o.value == value)[key]
            }
          }
        })
      }
    },
    asyncSelectLoad({ query, formItem }) {
      // 异步搜索下拉列表搜索回调
      const { selectKey } = formItem
      this.changeSelectLoading(selectKey, true)
      this.$emit('asyncSelectLoad', { query, formItem })
    },
    changeSelectLoading(selectKey, bool) {
      // 改变下拉列表loading
      this.asyncForm.map((formItem) => {
        const { selectKey: targetSelectKey } = formItem
        if (targetSelectKey == selectKey) {
          this.$set(formItem, 'loading', bool)
        }
      })
    },
    addDynamic({ formItem }) {
      // 动态增加动态表单
      const { key } = formItem
      // const asyncParams = JSON.parse(JSON.stringify(this.params))
      // asyncParams[key].push({})
      // this.$set(this, 'params', asyncParams)
      // this.params[key].push({})
      // 此处bug，按照以上写法，会初始化dynamic表单外的其他表单
      const dynamicForms = this.$refs[`dynamicForm_${key}`]
      const asyncParams = JSON.parse(JSON.stringify(this.params))
      if (!dynamicForms) {
        asyncParams[key].push({})
        this.$set(this, 'params', asyncParams)
        return
      }
      if (dynamicForms && Array.isArray(dynamicForms)) {
        dynamicForms.map((dynamicForm, i) => {
          asyncParams[key][i] = dynamicForm.params
        })
        asyncParams[key].push({})
        this.$set(this, 'params', asyncParams)
      }
    },
    deleteDynamic({ formItem, index }) {
      // 删除动态增减表单
      const { key } = formItem
      const dynamicForms = this.$refs[`dynamicForm_${key}`]
      if (dynamicForms && Array.isArray(dynamicForms)) {
        dynamicForms.map((dynamicForm, i) => {
          this.$set(this.params[key], i, dynamicForm.params)
        })
        this.params[key].splice(index, 1)
      }
    },
    confirmRecursionForm({ ref, key }) {
      // 验证参数传进来的dynamic表单，可以考虑使用Promise.all进行优化
      return new Promise((resolve, reject) => {
        let successNum = 0
        let failNum = 0
        if (this.$refs[ref].length > 0) {
          this.$refs[ref].map((refItem, i) => {
            this.$refs[ref][i].confirm().then(params => {
              // const serializeParams = JSON.parse(JSON.stringify(this.params))
              // serializeParams[key][i] = params
              // this.$set(this, 'params', serializeParams)
              this.params[key][i] = params
              successNum++
              if (successNum == this.$refs[ref].length) {
                resolve()
              }
            }).catch(() => {
              failNum++
              if ((successNum + failNum) == this.$refs[ref].length) {
                reject()
              }
            })
          })
        } else {
          resolve()
        }
      })
    },
    checkAllDynamicForms() {
      // 验证所有dynamic表单，可以考虑使用Promise.all进行优化
      return new Promise((resolve, reject) => {
        let num = 0
        const dynamicFormRefKeys = Object.keys(this.$refs).filter(item => item.slice(0, 11) == 'dynamicForm')
        for (let i = 0; i < dynamicFormRefKeys.length; i++) {
          const ref = dynamicFormRefKeys[i]
          this.confirmRecursionForm({ ref, key: ref.slice(12, ref.length) }).then(() => {
            num++
            if (num == dynamicFormRefKeys.length) {
              resolve()
            }
          }).catch(() => {
            reject()
          })
        }
      })
    },
    confirm() {
      // 验证当前表单，有dynamic时需要先验证dynamic表单，目前存在问题：若dynamic中有验证没通过的表单，外部表单将不做验证，也可以考虑使用Promise.all优化
      return new Promise((resolve, reject) => {
        if (Object.keys(this.$refs).some(item => item.slice(0, 11) == 'dynamicForm')) {
          this.checkAllDynamicForms().then(() => {
            this.validate().then(data => {
              resolve(data)
            }).catch(() => {
              reject()
            })
          }).catch(() => {
            reject()
          })
        } else {
          this.validate().then(data => {
            resolve(data)
          }).catch(() => {
            reject()
          })
        }
      })
    },
    validate() {
      // 验证表单rules，同时做数据处理
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(async(valid) => {
          if (valid) {
            const submitData = {}
            // 未填数据将不会加入要传的参数中
            Object.keys(this.params).map((key) => {
              if (this.params[key] && this.params[key].toString().length > 0) {
                submitData[key] = this.params[key]
              }
            })
            await this.asyncForm.map((formItem) => {
              const { type, key, max, hide, submit = true } = formItem
              // 判断是否只传选中值
              if (
                type == 'cascader' &&
                !this.cascaderProps(formItem).emitPath &&
                Array.isArray(submitData[key])
              ) {
                submitData[key] = submitData[key][submitData[key].length - 1]
              }
              // upload最大可传数量为1时，不传数组
              if (type == 'upload' && max == 1 && Array.isArray(submitData[key]) && submitData[key].length > 0) {
                submitData[key] = submitData[key][0]
              }
              // 隐藏表单不传
              if (hide && !this.showFormItem(formItem)) {
                delete submitData[key]
              }
              // 规定不需要提交的不传
              if (!submit) {
                delete submitData[key]
              }
            })
            resolve(submitData)
          } else {
            reject()
          }
        })
      })
    },
    handleUpload({ option, formItem }) {
      // 自定义上传方法
      const { file, onProgress, onSuccess, onError } = option
      const { uploadType, uploadParams = {}, uploadName = 'file' } = formItem
      const formData = new FormData()
      Object.keys(uploadParams).map(key => {
        formData.append(key, uploadParams[key])
      })
      formData.append(uploadName, file)
      if (uploadType == 'image') {
        uploadSinglePic(formData, {
          onUploadProgress: (progressEvent) => {
            const num = progressEvent.loaded / progressEvent.total * 100 | 0
            onProgress({ percent: num }) // 进度条
          }
        }).then(res => {
          onSuccess(res)
        }).catch(() => {
          onError()
        })
      } else if (['video', 'audio', 'media'].includes(uploadType)) {
        uploadMedia(formData, {
          onUploadProgress: (progressEvent) => {
            const num = progressEvent.loaded / progressEvent.total * 100 | 0
            onProgress({ percent: num }) // 进度条
          }
        }).then(res => {
          onSuccess(res)
        }).catch(() => {
          onError()
        })
      } else if (uploadType == 'excel') {
        uploadExcel(formData, {
          onUploadProgress: (progressEvent) => {
            const num = progressEvent.loaded / progressEvent.total * 100 | 0
            onProgress({ percent: num }) // 进度条
          }
        }).then(res => {
          onSuccess(res)
        }).catch(() => {
          onError()
        })
      }
    },
    uploadSuccess({ response, file, fileList, formItem }) {
      // 上传成功回调
      const { key, paramsType = 'string', resIndex = 'data' } = formItem
      let value = ''
      switch (paramsType) {
        case 'string':
          value = this.recLookup(response, resIndex)
          break
        case 'file':
          value = file
          break
        default:
          value = this.recLookup(response, resIndex)
          break
      }
      this.params[key].push(value)
      // this.fileList[key].push(file)
    },
    uploadRemove({ file, fileList, formItem }) {
      // 移除上传文件
      const { key, paramsType = 'string' } = formItem
      this.fileList[key] = fileList
      let value = []
      switch (paramsType) {
        case 'string':
          value = fileList.map((item) => item.url)
          break
        case 'file':
          value = fileList
          break
        default:
          value = fileList.map((item) => item.url)
          break
      }
      this.params[key] = value
    },
    beforeUpload({ file, formItem }) {
      // 上传前回调，做文件类型判断等
      const { uploadType } = formItem
      const { type, size } = file
      if (uploadType == 'image' && type.slice(0, 5) == 'image' && size > 2 * 1024 * 1024) {
        this.$message.error('图片大小不能超过2M')
        return false
      }
      if (uploadType == 'excel' && !['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].some(item => item == type)) {
        this.$message.error('文件格式不正确')
        return false
      }
      if (this.uploadAccept[uploadType].indexOf(type.slice(0, 5)) <= -1) {
        this.$message.error('文件格式不正确')
        return false
      }
      return true
    },
    handlePreview({ file, formItem }) {
      // 预览选择的文件，若需要预览excel等，可以多做一个判断，并使用components中的PreviewFile组件
      const { uploadType } = formItem
      if (uploadType == 'image') {
        this.previewImageUrl = file.url
        this.previewVisible = true
      } else if (['video', 'audio', 'media'].includes(uploadType)) {
        if (file.url) {
          window.open(file.url)
        } else {
          const { raw } = file
          const url = window.URL.createObjectURL(raw)
          window.open(url)
        }
      }
    },
    onExceed({ formItem, files, fileList }) {
      // 选择文件数量超出max时的提示
      const { max } = formItem
      this.$message.error(`最多只能上传${max}个`)
    },
    cascaderLoad({ node, resolve, formItem }) {
      // 级联选择器，异步查询方法
      this.$emit('cascaderLoad', {
        node,
        resolve,
        formItem
      })
    },
    dynamicSetData(dataTransfer) {
      // to avoid Firefox bug --- 避免火狐bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '')
    },
    dynamicListChange(formItem, { oldIndex, newIndex }) {
      // dynamic表单拖动改变回调
      const { key } = formItem
      const dynamicForms = this.$refs[`dynamicForm_${key}`]
      if (dynamicForms && Array.isArray(dynamicForms)) {
        dynamicForms.map((dynamicForm, i) => {
          this.$set(this.params[key], i, dynamicForm.params)
        })
      }
      const asyncParams = JSON.parse(JSON.stringify(this.params))
      if (newIndex > oldIndex) {
        asyncParams[key].splice(newIndex + 1, 0, JSON.parse(JSON.stringify(asyncParams[key][oldIndex])))
        asyncParams[key].splice(oldIndex, 1)
        this.$set(this, 'params', asyncParams)
      }
      if (newIndex < oldIndex) {
        asyncParams[key].splice(newIndex, 0, JSON.parse(JSON.stringify(asyncParams[key][oldIndex])))
        asyncParams[key].splice(oldIndex + 1, 1)
        this.$set(this, 'params', asyncParams)
      }
    },
    recLookup(obj, path) {
      // dataIndex等可传data.0.img等形式，用该方法来获取数据
      const parts = path.split('.')
      if (parts.length === 1) {
        return obj[parts[0]]
      }
      return this.recLookup(obj[parts[0]], parts.slice(1).join('.'))
    }
  }
}
</script>
<style lang="scss" scoped>
.hide {
  ::v-deep {
    .el-upload--picture-card,
    .el-upload--text {
      display: none;
    }
  }
}
.el-form-item {
  ::v-deep {
    .el-form-item {
      margin-bottom: 22px;
    }
  }
}
.dynamic_row_index{
  cursor:move;
}
.el-form-item.readOnly{
  ::v-deep{
    .el-input.is-disabled .el-input__inner{
        background-color:white;
        color:inherit;
        cursor:default;
      }
      .el-textarea.is-disabled .el-textarea__inner{
        background-color:white;
        color:inherit;
        cursor:default;
      }
      .el-select .el-input.is-disabled .el-input__inner{
        background-color:white;
        color:inherit;
        cursor:default;
      }
      .el-input.is-disabled .el-input__icon{
        cursor:default;
      }
  }
}
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #409EFF!important;
}
</style>
