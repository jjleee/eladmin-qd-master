import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/formationRecipe',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/formationRecipe/' + id,
    method: 'delete'
  })
}

export function copy(id,name) {
  return request({
    url: 'api/formationRecipe/copy',
    method: 'post',
    params:{
      id:id,
      name:name,
    }
  })
}

export function edit(data) {
  return request({
    url: 'api/formationRecipe',
    method: 'put',
    data
  })
}

export function getFormationNames() {
  return request({
    url: 'api/formationRecipe/names',
    method: 'get'
  })
}
