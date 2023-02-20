import { defineStore } from 'pinia'
import { getDetailInfos } from '@/service'
const useDetailInfoData = defineStore('detail', {
  state: () => ({
    housePics: []
  }),
  actions: {
    async fetchDetailData(id) {
      const { data: { mainPart } } = await getDetailInfos(id)
      this.housePics = mainPart.topModule.housePicture.housePics
    }
  }
})

export default useDetailInfoData
