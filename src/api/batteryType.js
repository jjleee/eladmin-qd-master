import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/batteryType',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/batteryType/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/batteryType',
    method: 'put',
    data
  })
}

export function getTypeNames() {
  return request({
    url: 'api/batteryType/names',
    method: 'get'
  })
}
