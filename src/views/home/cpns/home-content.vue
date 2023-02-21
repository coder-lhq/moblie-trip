<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="item in houseList" :key="item.data.id">
        <house-item-v9
          @click="itemClick(item.data)"
          v-if="item.discoveryContentType === 9"
          :itemData="item.data"
        />
        <house-item-v3 @click="itemClick(item.data)" v-else :itemData="item.data" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import useHomeStore from '@/stores/modules/home'
import { storeToRefs } from 'pinia'
import houseItemV9 from '@/components/house-item-v9/house-item-v9.vue'
import houseItemV3 from '@/components/house-item-v3/house-item-v3.vue'

const homeSotre = useHomeStore()
const { houseList } = storeToRefs(homeSotre)

const router = useRouter()
const itemClick = ({ houseId }) => {
  router.push('/detail/' + houseId)
}
</script>

<style lang="less" scoped>
.content {
  padding: 0px 20px;
  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
