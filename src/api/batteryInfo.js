import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/batteryInfo',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/batteryInfo/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/batteryInfo',
    method: 'put',
    data
  })
}

export function getBatteryName() {
  return request({
    url: 'api/batteryInfo/names',
    method: 'get'
  })
}
