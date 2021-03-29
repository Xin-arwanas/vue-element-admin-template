import request from '@/utils/request'

// 获取周计划列表
export function getPlanList(data) {
  return request({
    url: '/WeeklyPlan/getPlanList',
    method: 'post',
    data
  })
}

// 新增周计划
export function addPlan(data) {
  return request({
    url: '/WeeklyPlan/addPlan',
    method: 'post',
    data
  })
}

// 编辑周计划
export function updatePlan(data) {
  return request({
    url: '/WeeklyPlan/updatePlan',
    method: 'post',
    data
  })
}

// 删除周计划
export function deletePlan(data) {
  return request({
    url: '/WeeklyPlan/deletePlan',
    method: 'post',
    data
  })
}

// 导入周计划
export function importWeeklyPlan(data) {
  return request({
    url: '/WeeklyPlan/importWeeklyPlan',
    method: 'post',
    data
  })
}

// 获取宝宝工作
export function getWorkTypeList(data) {
  return request({
    url: '/BabyWork/getWorkTypeList',
    method: 'post',
    data
  })
}

// 新增宝宝工作
export function addWorkType(data) {
  return request({
    url: '/BabyWork/addWorkType',
    method: 'post',
    data
  })
}

// 编辑宝宝工作
export function updateWorkType(data) {
  return request({
    url: '/BabyWork/updateWorkType',
    method: 'post',
    data
  })
}

// 删除宝宝工作
export function deleteWorkType(data) {
  return request({
    url: '/BabyWork/deleteWorkType',
    method: 'post',
    data
  })
}

// 获取工作记录
export function getBehaviorRecord(data) {
  return request({
    url: '/Record/getBehaviorRecord',
    method: 'post',
    data
  })
}

// 导出宝宝工作
export function exportClassBehavior(data) {
  return request({
    url: '/Record/exportClassBehavior',
    method: 'post',
    data
  })
}

// 获取工作与示范学生列表
export function getStudentList(data) {
  return request({
    url: '/Record/getStudentList',
    method: 'post',
    data
  })
}

// 获取周期工作记录
export function getStudentWorkRecord(data) {
  return request({
    url: '/Record/getStudentWorkRecord',
    method: 'post',
    data
  })
}

// 导出宝宝工作汇总
export function exportClassBabyWork(data) {
  return request({
    url: '/Record/exportClassBabyWork',
    method: 'post',
    data
  })
}
