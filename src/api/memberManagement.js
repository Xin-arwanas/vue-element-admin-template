import request from '@/utils/request'

// 获取会员列表
export function getClientBabyList(data) {
  return request({
    url: '/user/getClientBabyList',
    method: 'post',
    data
  })
}

// 获取合同列表
export function getContractList(data) {
  return request({
    url: '/user/getContractList',
    method: 'post',
    data
  })
}

// 编辑合同
export function updateContract(data) {
  return request({
    url: '/user/updateContract',
    method: 'post',
    data
  })
}

// 删除合同
export function deleteContract(data) {
  return request({
    url: '/user/deleteContract',
    method: 'post',
    data
  })
}

// 新增合同
export function addContract(data) {
  return request({
    url: '/user/addContract',
    method: 'post',
    data
  })
}

// 获取会员详情
export function getClientInfo(data) {
  return request({
    url: '/user/getClientInfo',
    method: 'post',
    data
  })
}

// 获取转介绍列表
export function getAgentList(data) {
  return request({
    url: '/User/getAgentList',
    method: 'post',
    data
  })
}

// 编辑转介绍奖励
export function editAgentReward(data) {
  return request({
    url: '/User/editAgentReward',
    method: 'post',
    data
  })
}
