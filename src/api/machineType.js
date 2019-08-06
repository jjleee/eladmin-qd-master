import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/machineType',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/machineType/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/machineType',
    method: 'put',
    data
  })
}
