import request from '@/utils/request'

// 获取节假日列表
export function getHolidays(data) {
  return request({
    url: '/Attence/getHolidays',
    method: 'post',
    data
  })
}

// 编辑节假日列表
export function updateHolidays(data) {
  return request({
    url: '/Attence/updateHolidays',
    method: 'post',
    data
  })
}

// 获取园所考勤设置
export function getSchoolAttence(data) {
  return request({
    url: '/Attence/getSchoolAttence',
    method: 'post',
    data
  })
}

// 编辑园所考勤设置
export function editSchoolAttence(data) {
  return request({
    url: '/Attence/editSchoolAttence',
    method: 'post',
    data
  })
}

// 获取老师考勤记录
export function getTeacherAttence(data) {
  return request({
    url: '/Attence/getTeacherAttence',
    method: 'post',
    data
  })
}

// 获取学生考勤记录
export function getStudentAttence(data) {
  return request({
    url: '/Attence/getStudentAttence',
    method: 'post',
    data
  })
}

// 获取请假列表
export function getAuditDayOffList(data) {
  return request({
    url: '/Attence/getAuditDayOffList',
    method: 'post',
    data
  })
}

// 审批请假
export function auditDayOff(data) {
  return request({
    url: '/Attence/auditDayOff',
    method: 'post',
    data
  })
}
