import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/dcrCalculateRule',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/dcrCalculateRule/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/dcrCalculateRule',
    method: 'put',
    data
  })
}

export function getDcrCalNames() {
  return request({
    url: 'api/dcrCalculateRule/names',
    method: 'get'
  })
}
