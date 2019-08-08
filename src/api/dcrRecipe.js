import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/dcrRecipe',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/dcrRecipe/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/dcrRecipe',
    method: 'put',
    data
  })
}

export function getDcrNames(type) {
  return request({
    url: 'api/dcrRecipe/names/'+type,
    method: 'get'
  })
}
