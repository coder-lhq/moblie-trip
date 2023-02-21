<template>
  <div class="city">
    <div class="top">
      <!-- 搜索框 -->
      <van-search
        v-model="searchValue"
        placeholder="城市/区域/位置"
        shape="round"
        show-action
        @cancel="cancelClick"
      />

      <!-- tab的切换 -->
      <van-tabs v-model:active="tabActive" color="#ff9854" line-height="2">
        <template v-for="(value, key) in allCities" :key="value">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <template v-for="(value, key, index) in allCities" :key="index">
        <city-group v-show="tabActive === key" :group-data="value" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import useCityStore from '@/stores/modules/city'
import CityGroup from './cpns/city-group.vue'

const searchValue = ref('')
const tabActive = ref()

const router = useRouter()
const cancelClick = () => {
  router.back()
}

// 从store中获取数据
const ctityStore = useCityStore()
ctityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(ctityStore)

// 选中标签后的数据
const currentGroup = computed(() => allCities.value[tabActive.value])
</script>

<style lang="less" scoped>
.top {
  position: relative;
  z-index: 9;
}
.content {
  height: calc(100vh - 98px);
  overflow-y: auto;
}
</style>
