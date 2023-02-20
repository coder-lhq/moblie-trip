import request from '../request'

export function getHotSuggests() {
  return request.get({
    url: '/home/hotSuggests'
  })
}

export function getCategories() {
  return request.get({
    url: '/home/categories'
  })
}

export function getHomeHouseList(page) {
  return request.get({
    url: '/home/houselist',
    params: {
      page
    }
  })
}
