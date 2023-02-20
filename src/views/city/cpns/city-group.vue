<template>
  <div class="city-group">
    <van-index-bar @select="clickSelect" :index-list="indexList"        highlight-color="#ff9854">
      <van-index-anchor index="热门推荐" />
      <div class="list">
        <template v-for="(item, index) in groupData.hotCities" :key="index">
          <div class="city" @click="cityClick(item)">{{ item.cityName }}</div>
        </template>
      </div>
      <template v-for="(group, index) in groupData.cities" :key="index">
        <van-index-anchor :index="group.group" />
        <template v-for="(city, indey) in group.cities" :key="indey">
          <van-cell :title="city.cityName" @click="cityClick(city)" />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import useCityStore from '@/stores/modules/city.js'
import { computed } from 'vue'

// 定义props
const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({})
  }
})

// 动态索引
const indexList = computed(() => {
  const list = props.groupData.cities.map((item) => item.group)
  list.unshift('#')
  return list
})

// 监听城市的点击
const router = useRouter()
const cityStore = useCityStore()
const cityClick = (city) => {
  // 选中的当前城市
  cityStore.currentCity = city
  router.back()
}
</script>

<style lang="less" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px 25px 10px 10px;

  .city {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
    width: 70px;
    height: 28px;
    border-radius: 14px;
    font-size: 12px;
    color: #000;
    background-color: #fff4ec;
  }
}
</style>
