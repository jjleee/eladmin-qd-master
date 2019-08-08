import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/divisionRecipe',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/divisionRecipe/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/divisionRecipe',
    method: 'put',
    data
  })
}

export function getDivisionNames(type) {
  return request({
    url: 'api/divisionRecipe/names/'+type,
    method: 'get'
  })
}
