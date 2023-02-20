<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854">
      <template v-for="(item, index) in tabbarData" :key="index">
        <van-tabbar-item :to="item.path">
          <template #icon>
            <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
            <img v-else :src="getAssetURL(item.imageActive)" alt="">
          </template>
          <template #default>
            <span>{{ item.text }}</span>
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>

import { ref, watch } from 'vue'
import tabbarData from '@/assets/data/tabbar'
import { getAssetURL } from '@/utils/load_assets'
import { useRoute } from 'vue-router'

const currentIndex = ref(0)
const route = useRoute()

// 监听路由的变化
watch(route, (newRoute) => {
  const index = tabbarData.findIndex(item => item.path === newRoute.path)
  if(index !== -1) return
  currentIndex.value = index
})

</script>

<style lang="less" scoped>
.tab-bar {
  // 局部修改
  --van-font-size-sm: 20px !important;
  // :deep(.van-tabbar-item ){
  //   font-size: 60px;
  // }
  img {
    height: 25px;
  }
}
</style>
