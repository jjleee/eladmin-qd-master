import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/ocvRecipe',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/ocvRecipe/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/ocvRecipe',
    method: 'put',
    data
  })
}

export function getOcvNames() {
  return request({
    url: 'api/ocvRecipe/names',
    method: 'get'
  })
}
