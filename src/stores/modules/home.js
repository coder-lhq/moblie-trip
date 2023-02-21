import { defineStore } from 'pinia'
import { getHotSuggests, getCategories, getHomeHouseList } from '@/service/index'
const useHomeStore = defineStore('home', {
  state: () => ({
    hotSuggests: [],
    categories: [],
    page: 1,
    houseList: []
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHotSuggests()
      this.hotSuggests = res.data
    },
    async fetchCategoriesData() {
      const res = await getCategories()
      this.categories = res.data
    },
    async fetchHouseListData() {
      const res = await getHomeHouseList(this.page)
      this.houseList.push(...res.data)
      this.page++
    }
  }
})

export default useHomeStore
