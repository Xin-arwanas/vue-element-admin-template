import request from '@/utils/request'

// 获取媒体列表
export function getTeachMedia(data) {
  return request({
    url: '/WeeklyPlan/getTeachMedia',
    method: 'post',
    data
  })
}
