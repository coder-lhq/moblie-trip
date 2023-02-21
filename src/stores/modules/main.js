import { defineStore } from 'pinia'

const startDate = new Date()
const endDate = new Date()
endDate.setDate(startDate.getDate() + 1)

const useMainStoe = defineStore('main', {
  state: () => ({
    startDate,
    endDate,
    isLoading: true
  })
})

export default useMainStoe
