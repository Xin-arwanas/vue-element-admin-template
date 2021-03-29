<template>
  <div>
    <div style="width:100%;overflow-y:auto;">
      <div class="search-container border-bottom">
        <FilterComponent
          ref="filter"
          :form="searchForm"
          :need-reset="false"
          @handleSearch="handleSearch"
        />
      </div>
      <div class="app-container">
        <el-row type="flex" align="middle" :gutter="20" class="row">
          <el-col class="title_col" :span="2">法定周六</el-col>
          <el-col
            :span="8"
          ><el-switch
            v-model="params.saturday"
            active-value="y"
            inactive-value="n"
          /></el-col>
        </el-row>

        <el-row type="flex" align="middle" :gutter="20" class="row">
          <el-col class="title_col" :span="2">法定周日</el-col>
          <el-col
            :span="8"
          ><el-switch
            v-model="params.sunday"
            active-value="y"
            inactive-value="n"
          /></el-col>
        </el-row>

        <el-row type="flex" align="middle" :gutter="20" class="row">
          <el-col class="title_col" :span="2">法定节假日</el-col>
          <el-col :span="8">放假时间</el-col>
          <el-col :span="8">补假时间</el-col>
        </el-row>

        <el-row type="flex" align="middle" :gutter="20" class="row" style="margin-bottom:0;">
          <el-col :span="2">
            <div v-for="(holiday, index) in holidays" :key="index" class="col">
              {{ holiday }}
            </div>
          </el-col>
          <el-col :span="8">
            <div v-for="(holiday, index) in holidays" :key="index" class="col">
              <el-date-picker
                v-model="params.holidays[index]"
                class="datePicker"
                type="dates"
                :placeholder="'请选择日期'"
                :size="formItemSize"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
              />
            </div>
          </el-col>
          <el-col :span="8">
            <div v-for="(work, index) in holidays" :key="index" class="col">
              <el-date-picker
                v-model="params.works[index]"
                class="datePicker"
                type="dates"
                :placeholder="'请选择日期'"
                :size="formItemSize"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
              />
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" :gutter="20" class="row" style="margin-bottom:0;">
          <el-col :span="2">
            <div v-for="(holiday,index) in diyHolidays" :key="holidays.length + index" class="col">
              <el-input v-model="holiday.title" placeholder="假期名称" :size="formItemSize" />
            </div>
          </el-col>
          <el-col :span="8">
            <div v-for="(holiday, index) in diyHolidays" :key="holidays.length + index" class="col">
              <el-date-picker
                v-model="holiday.date1"
                class="datePicker"
                type="dates"
                :placeholder="'请选择日期'"
                :size="formItemSize"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
              />
            </div>
          </el-col>
          <el-col :span="8">
            <div v-for="(holiday, index) in diyHolidays" :key="holidays.length + index" class="col">
              <el-date-picker
                v-model="holiday.date2"
                class="datePicker"
                type="dates"
                :placeholder="'请选择日期'"
                :size="formItemSize"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
              />
            </div>
          </el-col>
          <el-col :span="2">
            <div v-for="(holiday, index) in diyHolidays" :key="holidays.length + index" class="col">
              <el-button type="danger" :size="formItemSize" @click="handleDelete(index)">删除</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" :gutter="20" class="row">
          <el-col class="title_col" :span="2" />
          <el-col :span="8">
            <el-button type="primary" @click="handleAdd">自定义新增</el-button>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" :gutter="20" class="row">
          <el-col class="title_col" :span="2" />
          <el-col :span="8">
            <el-button type="success" @click="submit">保存</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import Filter from '@/components/SearchForm'
import { getHolidays, updateHolidays } from '@/api/attendanceManagement'
export default {
  components: {
    FilterComponent: Filter
  },
  data() {
    return {
      formItemSize: 'medium',
      params: {
        holidays: [],
        works: [],
        saturday: 'y',
        sunday: 'y',
        extra: []
      },
      holidays: ['元旦', '春节', '清明节', '劳动节', '端午节', '中秋节', '国庆节'],
      searchForm: [
        {
          type: 'year',
          key: 'year',
          placeholder: '请选择年份',
          label: '年份:',
          labelWidth: '80',
          value: new Date().getFullYear().toString()
        }
      ],
      diyHolidays: []
    }
  },
  mounted() {
    this.params.holidays = Array.from(this.holidays, x => [])
    this.params.works = Array.from(this.holidays, x => [])
    getHolidays({ year: new Date().getFullYear().toString() }).then(res => {
      const { holidays, works, saturday, sunday, extra } = res.data
      if (holidays) {
        this.params.holidays = holidays
      }
      if (works) {
        this.params.works = works
      }
      if (extra) {
        this.params.extra = extra
        this.diyHolidays = extra.map((item, i) => {
          return {
            title: item,
            date1: (holidays || {})[this.holidays.length + i],
            date2: (works || {})[this.holidays.length + i]
          }
        })
      }
      this.params.saturday = saturday
      this.params.sunday = sunday
    })
  },
  methods: {
    handleSearch(searchParams) {
      const { year } = searchParams
      getHolidays({ year: year }).then(res => {
        const { holidays, works, saturday, sunday, extra } = res.data
        if (holidays) {
          this.params.holidays = holidays
        } else {
          this.params.holidays = Array.from(this.holidays, x => [])
        }
        if (works) {
          this.params.works = works
        } else {
          this.params.works = Array.from(this.holidays, x => [])
        }
        if (extra) {
          this.params.extra = extra
          this.diyHolidays = extra.map((item, i) => {
            return {
              title: item,
              date1: (holidays || {})[this.holidays.length + i],
              date2: (works || {})[this.holidays.length + i]
            }
          })
        } else {
          this.params.extra = []
          this.diyHolidays = []
        }
        this.params.saturday = saturday || 'n'
        this.params.sunday = sunday || 'n'
      })
    },
    handleAdd() {
      this.diyHolidays.push({ title: '', date1: [], date2: [] })
    },
    handleDelete(index) {
      this.diyHolidays.splice(index, 1)
    },
    submit() {
      this.params.year = this.$refs.filter.$refs.form.params.year
      this.params.extra = this.diyHolidays.map(item => item.title)
      if (Array.isArray(this.params.holidays)) {
        this.params.holidays.splice(this.holidays.length)
      } else if (Object.prototype.toString.call(this.params.holidays).toLowerCase() == '[object object]') {
        Object.keys(this.params.holidays).map(key => {
          if (key >= this.holidays.length) {
            delete this.params.holidays[key]
          }
        })
      }
      if (Array.isArray(this.params.works)) {
        this.params.works.splice(this.holidays.length)
      } else if (Object.prototype.toString.call(this.params.works).toLowerCase() == '[object object]') {
        Object.keys(this.params.works).map(key => {
          if (key >= this.holidays.length) {
            delete this.params.works[key]
          }
        })
      }
      for (let i = this.holidays.length; i < this.holidays.length + this.diyHolidays.length; i++) {
        const extraHoliday = this.diyHolidays[i - this.holidays.length]
        this.params.holidays[i] = extraHoliday.date1
        this.params.works[i] = extraHoliday.date2
      }
      updateHolidays(this.params).then(() => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.search-container {
  padding: 20px 20px 10px;
}
.datePicker {
  width: 100%;
}
.row {
  margin-bottom: 20px;
  font-size: 16px;
  color: #444;
}
.col {
  line-height: 36px;
  margin-bottom: 20px;
}
</style>
