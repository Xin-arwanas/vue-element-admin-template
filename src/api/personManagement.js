import request from '@/utils/request'

// 获取教师列表
export function getTeacherList(data) {
  return request({
    url: '/user/getTeacherList',
    method: 'post',
    data
  })
}

// 新增教师
export function createTeacherUser(data) {
  return request({
    url: '/user/createTeacherUser',
    method: 'post',
    data
  })
}

// 编辑教师
export function updateTeacherUser(data) {
  return request({
    url: '/user/updateTeacherUser',
    method: 'post',
    data
  })
}

// 获取学生列表
export function getStudentList(data) {
  return request({
    url: '/user/getStudentList',
    method: 'post',
    data
  })
}

// 新增学生
export function createBabyClient(data) {
  return request({
    url: '/user/createBabyClient',
    method: 'post',
    data
  })
}

// 编辑学生
export function updateStudent(data) {
  return request({
    url: '/user/updateStudent',
    method: 'post',
    data
  })
}

// 搜索获取会员列表
export function getAgentUuid(data) {
  return request({
    url: '/user/getAgentUuid',
    method: 'post',
    data
  })
}

// 获取家长列表
export function getParentList(data) {
  return request({
    url: '/user/getParentList',
    method: 'post',
    data
  })
}

// 新增家长
export function createParentUser(data) {
  return request({
    url: '/user/createParentUser',
    method: 'post',
    data
  })
}

// 编辑家长
export function updateParentUser(data) {
  return request({
    url: '/user/updateParentUser',
    method: 'post',
    data
  })
}

// 搜索获取宝宝列表
export function getBabyUuid(data) {
  return request({
    url: '/user/getBabyUuid',
    method: 'post',
    data
  })
}

// 搜索获取家长列表
export function getParentUuid(data) {
  return request({
    url: '/user/getParentUuid',
    method: 'post',
    data
  })
}

// 删除用户
export function recycleUser(data) {
  return request({
    url: '/User/recycleUser',
    method: 'post',
    data
  })
}

// 导入学生
export function importStudents(data) {
  return request({
    url: '/User/importStudents',
    method: 'post',
    data
  })
}

// 根据学校id获取老师列表
export function getTeachers(data) {
  return request({
    url: '/User/getTeachers',
    method: 'post',
    data
  })
}
