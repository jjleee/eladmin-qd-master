import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/binningRule',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/binningRule/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/binningRule',
    method: 'put',
    data
  })
}

export function getBinningNames() {
  return request({
    url: 'api/binningRule/names',
    method: 'get'
  })
}
