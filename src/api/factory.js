import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/factory',
    method: 'post',
    data
  })
}

export function getFactoryName() {
  return request({
    url: 'api/factory/names',
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'api/factory/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/factory',
    method: 'put',
    data
  })
}
