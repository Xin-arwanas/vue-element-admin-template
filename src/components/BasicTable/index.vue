<template>
  <div :class="tableData.length == 0?'empty':''" :style="{height:tableOption.autoHeight?'':'100%',width:'100%'}">
    <el-table
      ref="table"
      :key="refreshKey"
      v-loading="listLoading"
      :data="tableData"
      :height="tableOption.autoHeight?null:(tableData.length > 0?'100%':'auto')"
      border
      fit
      :row-key="tableOption.rowKey || 'id'"
      :tree-props="{ children: tableOption.treeChildrenKey || 'children' }"
      :default-expand-all="!!tableOption.expandAll"
      @selection-change="handleSelectionChange"
      @expand-change="handleExpand"
    >
      <el-table-column v-if="!!tableOption.needExpand" type="expand">
        <template slot-scope="{ row, column, $index }">
          <slot name="expand" :data="{ row, column, $index }" />
        </template>
      </el-table-column>
      <el-table-column
        v-if="!!tableOption.needSelection"
        type="selection"
        width="40"
        fixed="left"
      />
      <el-table-column
        v-if="tableOption.needIndex"
        align="center"
        type="index"
        width="50"
      />
      <el-table-column
        v-for="(col, index) in tableColumns"
        :key="index"
        :show-overflow-tooltip="true"
        :label="col.label || ''"
        :align="col.align || 'center'"
        :width="col.width || ''"
      >
        <template slot-scope="{ row, column, $index }">
          <template v-if="col.type === 'custom'">
            <slot name="custom" :data="{ row, column, $index, col }" />
          </template>
          <template v-else-if="col.type === 'image'">
            <el-image
              v-if="imageResult({row, dataIndex:col.dataIndex,index:0})"
              :style="{ width: '100px', height: '100px', ...col.imageStyle }"
              :fit="col.ImageFit"
              :src="imageResult({row, dataIndex:col.dataIndex,index:0})"
              :preview-src-list="[imageResult({row, dataIndex:col.dataIndex})]"
            />
          </template>
          <span v-else :style="{...col.textStyle}">{{ recLookup(row, col.dataIndex || "") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableOption.hasOwnProperty('needAction')?tableOption.needAction:true"
        fixed="right"
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        :width="tableOption.actionWidth || 150"
      >
        <template slot-scope="{ row, column, $index }">
          <slot name="extraActionFront" :data="{ row, column, $index }" />
          <el-button
            v-if="!!tableOption.needEdit"
            type="primary"
            size="mini"
            @click="handleEdit(row, column, $index)"
          >
            {{ tableOption.editText?tableOption.editText:'编辑' }}
          </el-button>
          <el-button
            v-if="!!tableOption.needDelete"
            size="mini"
            type="danger"
            @click="handleDelete(row, column, $index)"
          >
            删除
          </el-button>
          <slot name="extraActionBehind" :data="{ row, column, $index }" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Sortable from 'sortablejs'
export default {
  props: {
    tableColumns: {
      type: Array,
      default() { return [] }
    },
    tableOption: {
      type: Object,
      default() { return {} }
    },
    tableData: {
      type: Array,
      default() { return [] }
    },
    listLoading: {
      type: Boolean,
      default() { return false }
    }
  },
  data() {
    return {
      imgPath: process.env.VUE_APP_ROOT_PATH,
      refreshKey: 0,
      expandList: [],
      sortable: null
    }
  },
  computed: {
    imageResult() {
      // 表格中的图片
      return ({ row, dataIndex, index }) => {
        const target = this.recLookup(row, dataIndex || '')
        if (Array.isArray(target)) {
          const result = target.map(item => item ? this.imgPath + item : '')
          if (index || index == 0) {
            return result[index]
          }
          return result
        }
        return target ? this.imgPath + target : ''
      }
    }
  },
  // watch: {
  //   tableData(val) {
  //     if (val.length > 0 && !this.sortable && this.tableOption.dragable) {
  //       this.setSort()
  //     }
  //   }
  // },
  mounted() {
    this.$nextTick(() => {
      // 表格拖拽
      if (this.tableOption.dragable) {
        this.setSort()
      }
    })
  },
  methods: {
    setSort() {
      const el = this.$refs.table.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          // 拖拽结束回调，待开发
          // const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          // this.list.splice(evt.newIndex, 0, targetRow)

          // // for show the changes, you can delete in you code
          // const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          // this.newList.splice(evt.newIndex, 0, tempIndex)
        }
      })
    },
    recLookup(obj, path) {
      const parts = path.split('.')
      if (parts.length === 1) {
        return obj[parts[0]]
      }
      return this.recLookup(obj[parts[0]], parts.slice(1).join('.'))
    },
    handleSelectionChange(val) {
      this.$emit('selectionChange', val)
    },
    handleEdit(row, column, index) {
      this.$emit('handleEdit', {
        row,
        column,
        index
      })
    },
    handleDelete(row, column, index) {
      this.$emit('handleDelete', {
        row,
        column,
        index
      })
    },
    handleExpand(row, expanded) {
      // 树状表格状态记录，新增、编辑或删除后保持原来状态
      if (expanded) {
        this.expandList.push(row[this.tableOption.rowKey || 'id'].toString())
      } else {
        this.expandList.splice(this.expandList.findIndex(item => item == (row[this.tableOption.rowKey || 'id'])), 1)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #409EFF!important;
}
.empty{
  ::v-deep{
    .el-table__body-wrapper{
      max-height:60px!important;
    }
  }
}
</style>
