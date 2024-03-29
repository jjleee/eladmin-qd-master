import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/processItem',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/processItem/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/processItem',
    method: 'put',
    data
  })
}
