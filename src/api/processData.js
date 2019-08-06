import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/processData',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/processData/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/processData',
    method: 'put',
    data
  })
}
