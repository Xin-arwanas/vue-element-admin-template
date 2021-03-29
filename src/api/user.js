import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/userlogin',
    method: 'post',
    data
  })
}

export function getNodeList(data) {
  return request({
    url: '/system/getSystemNodeList',
    method: 'post',
    data
  })
}

export function changePassword(data) {
  return request({
    url: '/user/changePassword',
    method: 'post',
    data
  })
}
