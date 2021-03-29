import request from '@/utils/request'

// 获取栏目列表
export function getNode(data) {
  return request({
    url: '/system/getAllNodes',
    method: 'post',
    data
  })
}
// 新增栏目
export function addNode(data) {
  return request({
    url: '/system/addSystemNode',
    method: 'post',
    data
  })
}
// 编辑栏目
export function updateNode(data) {
  return request({
    url: '/system/updateSystemNode',
    method: 'post',
    data
  })
}
// 删除栏目
export function deleteNode(data) {
  return request({
    url: '/system/deleteSystemNode',
    method: 'post',
    data
  })
}
// 获取权限列表
export function getPowerList(data) {
  return request({
    url: '/system/getPowerList',
    method: 'post',
    data
  })
}
// 切换权限
export function grantRole(data) {
  return request({
    url: '/system/grantRole',
    method: 'post',
    data
  })
}
