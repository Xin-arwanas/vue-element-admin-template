import request from '@/utils/request'

// 获取名族列表
export function getnationality(data) {
  return request({
    url: '/util/getnationality',
    method: 'post',
    data
  })
}

// 获取区域列表
export function getRegionList(data) {
  return request({
    url: '/util/getRegionList',
    method: 'post',
    data
  })
}

// 上传单张图片
export function uploadSinglePic(data, extra = {}) {
  return request({
    url: '/util/uploadSinglePic',
    method: 'post',
    data,
    ...extra
  })
}

// 上传音视频到网易云
export function uploadMedia(data, extra = {}) {
  return request({
    url: '/Util/uploadMedia',
    method: 'post',
    data,
    ...extra
  })
}

// 上传excel
export function uploadExcel(data, extra = {}) {
  return request({
    url: '/Util/uploadExcel',
    method: 'post',
    data,
    ...extra
  })
}
