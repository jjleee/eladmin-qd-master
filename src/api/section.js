import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/section',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/section/' + id,
    method: 'delete'
  })
}

export function getSectionNames() {
  return request({
    url: 'api/section/names',
    method: 'get'
  })
}

export function edit(data) {
  return request({
    url: 'api/section',
    method: 'put',
    data
  })
}
