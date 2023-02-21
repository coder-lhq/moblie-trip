import request from '../request'

export function getDetailInfos(houseId) {
  return request.get({
    url: '/detail/infos',
    params: {
      houseId
    }
  })
}
