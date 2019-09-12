import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/binningPlan',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/binningPlan/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/binningPlan',
    method: 'put',
    data
  })
}

export function getBinningNames() {
  return request({
    url: 'api/binningPlan/names',
    method: 'get'
  })
}
export function getStepName(number) {
  return request({
    url: 'api/binningPlan/step/' + number,
    method: 'post'
  })
}
