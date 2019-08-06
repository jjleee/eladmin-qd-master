import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/leakVacuum',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/leakVacuum/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/leakVacuum',
    method: 'put',
    data
  })
}

export function getLeakNames() {
  return request({
    url: 'api/leakVacuum/leaks',
    method: 'get',
  })
}
