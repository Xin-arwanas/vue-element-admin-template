import request from '@/utils/request'

// 获取学校代码列表（下拉框）
export function getschoolcode(data) {
  return request({
    url: '/school/getschoolcode',
    method: 'post',
    data
  })
}

// 获取对应班级代码列表（下拉框）
export function getClassCode(data) {
  return request({
    url: '/school/getClassCode',
    method: 'post',
    data
  })
}

// 获取园所列表
export function getSchoolList(data) {
  return request({
    url: '/school/getSchoolList',
    method: 'post',
    data
  })
}

// 新增园所
export function createschool(data) {
  return request({
    url: '/school/createschool',
    method: 'post',
    data
  })
}

// 编辑园所
export function updateSchool(data) {
  return request({
    url: '/school/updateSchool',
    method: 'post',
    data
  })
}

// 获取班级列表
export function getClassList(data) {
  return request({
    url: '/school/getClassList',
    method: 'post',
    data
  })
}

// 新增班级
export function createClass(data) {
  return request({
    url: '/school/createClass',
    method: 'post',
    data
  })
}

// 编辑班级
export function updateClass(data) {
  return request({
    url: '/school/updateClass',
    method: 'post',
    data
  })
}

// 获取监控列表
export function getCameraList(data) {
  return request({
    url: '/CameraTransfer/getCameraList',
    method: 'post',
    data
  })
}

// 编辑监控
export function editCamera(data) {
  return request({
    url: '/CameraTransfer/editCamera',
    method: 'post',
    data
  })
}
