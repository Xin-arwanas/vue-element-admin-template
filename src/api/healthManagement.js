import request from '@/utils/request'

// 获取过敏源列表
export function getAllergenList(data) {
  return request({
    url: '/Food/getAllergenList',
    method: 'post',
    data
  })
}

// 新增过敏源
export function addAllergen(data) {
  return request({
    url: '/Food/addAllergen',
    method: 'post',
    data
  })
}

// 编辑过敏源
export function editAllergen(data) {
  return request({
    url: '/Food/editAllergen',
    method: 'post',
    data
  })
}

// 删除过敏源
export function deleteAllergen(data) {
  return request({
    url: '/Food/deleteAllergen',
    method: 'post',
    data
  })
}

// 获取食谱列表
export function getWeeklyRecipe(data) {
  return request({
    url: '/Food/getWeeklyRecipe',
    method: 'post',
    data
  })
}

// 异步搜索获取过敏源列表
export function searchAllergen(data) {
  return request({
    url: '/Food/searchAllergen',
    method: 'post',
    data
  })
}

// 编辑食谱
export function editWeeklyRecipe(data) {
  return request({
    url: '/Food/editWeeklyRecipe',
    method: 'post',
    data
  })
}

// 获取待审核过敏源
export function getAuditAllergenList(data) {
  return request({
    url: '/Food/getAuditAllergenList',
    method: 'post',
    data
  })
}

// 审核过敏源
export function auditAllergen(data) {
  return request({
    url: '/Food/auditAllergen',
    method: 'post',
    data
  })
}

// 导入食谱excel
export function importRecipe(data) {
  return request({
    url: '/Food/importRecipe',
    method: 'post',
    data
  })
}

// 获取晨检记录
export function getDailyCheckRecord(data) {
  return request({
    url: '/Record/getDailyCheckRecord',
    method: 'post',
    data
  })
}

// 获取午睡记录
export function getNapRecord(data) {
  return request({
    url: '/Record/getNapRecord',
    method: 'post',
    data
  })
}

// 获取健康题库
export function getEpidemicQuestions(data) {
  return request({
    url: '/Epidemic/getEpidemicQuestions',
    method: 'post',
    data
  })
}

// 新增题目
export function addEpidemicQuestion(data) {
  return request({
    url: '/Epidemic/addEpidemicQuestion',
    method: 'post',
    data
  })
}

// 编辑题目
export function updateEpidemicQuestion(data) {
  return request({
    url: '/Epidemic/updateEpidemicQuestion',
    method: 'post',
    data
  })
}

// 删除题目
export function deleteEpidemicQuestion(data) {
  return request({
    url: '/Epidemic/deleteEpidemicQuestion',
    method: 'post',
    data
  })
}

// 移动题目
export function moveSort(data) {
  return request({
    url: '/Epidemic/moveSort',
    method: 'post',
    data
  })
}

// 上下线题目
export function enableAndDisable(data) {
  return request({
    url: '/Epidemic/enableAndDisable',
    method: 'post',
    data
  })
}

// 获取健康打卡记录
export function getEpidemicRecord(data) {
  return request({
    url: '/Record/getEpidemicRecord',
    method: 'post',
    data
  })
}

// 指定上传图片的老师
export function chooseRecipeManager(data) {
  return request({
    url: '/Food/chooseRecipeManager',
    method: 'post',
    data
  })
}
