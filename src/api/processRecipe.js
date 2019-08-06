import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/processRecipe',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/processRecipe/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/processRecipe',
    method: 'put',
    data
  })
}

export function getProcessNames() {
  return request({
    url: 'api/processRecipe/names',
    method: 'get'
  })
}
