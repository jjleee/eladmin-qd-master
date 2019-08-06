import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/ngRule',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/ngRule/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/ngRule',
    method: 'put',
    data
  })
}

export function getNgNames() {
  return request({
    url: 'api/ngRule/names',
    method: 'get'
  })
}
