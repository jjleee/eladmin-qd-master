import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/lineType',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/lineType/' + id,
    method: 'delete'
  })
}

export function getTypeName() {
  return request({
    url: 'api/lineType/names',
    method: 'get'
  })
}

export function edit(data) {
  return request({
    url: 'api/lineType',
    method: 'put',
    data
  })
}
