import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/globalProtectParam',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/globalProtectParam/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/globalProtectParam',
    method: 'put',
    data
  })
}

export function getProtectNames() {
  return request({
    url: 'api/globalProtectParam/names',
    method: 'get'
  })
}
