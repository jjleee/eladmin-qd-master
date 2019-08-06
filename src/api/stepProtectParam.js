import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/stepProtectParam',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/stepProtectParam/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/stepProtectParam',
    method: 'put',
    data
  })
}

export function getByStroke(stroke) {
  return request({
    url: 'api/stepProtectParam/getByStroke/'+ stroke,
    method: 'get',
  })
}

export function getByName(protectName) {
  return request({
    url: 'api/stepProtectParam/getByName/'+ protectName,
    method: 'get',
  })
}
