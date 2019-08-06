import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/vacuumPlan',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/vacuumPlan/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/vacuumPlan',
    method: 'put',
    data
  })
}

export function getVacuums() {
  return request({
    url: 'api/vacuumPlan/vacuums',
    method: 'get',
  })
}
