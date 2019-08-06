import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/lineInfo',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/lineInfo/' + id,
    method: 'delete'
  })
}

export function getLineNames() {
  return request({
    url: 'api/lineInfo/names',
    method: 'get'
  })
}

export function edit(data) {
  return request({
    url: 'api/lineInfo',
    method: 'put',
    data
  })
}
