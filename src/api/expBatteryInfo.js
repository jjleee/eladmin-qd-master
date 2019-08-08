import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/expBatteryInfo',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/expBatteryInfo/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/expBatteryInfo',
    method: 'put',
    data
  })
}

export function getBatteryName() {
  return request({
    url: 'api/expBatteryInfo/names',
    method: 'get'
  })
}
