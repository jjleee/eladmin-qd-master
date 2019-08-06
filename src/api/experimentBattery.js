import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/experimentBattery',
    method: 'post',
    data
  })
}
export function addExcel(data) {
  return request({
    url: 'api/experimentBattery/addExcel',
    method: 'post',
    data
  })
}
export function del(id) {
  return request({
    url: 'api/experimentBattery/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/experimentBattery',
    method: 'put',
    data
  })
}
