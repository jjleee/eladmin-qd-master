import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/departmentInfo',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/departmentInfo/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/departmentInfo',
    method: 'put',
    data
  })
}
