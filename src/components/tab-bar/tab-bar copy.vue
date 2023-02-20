<template>
  <div class="tab-bar">
    <div 
        class="tab-bar-item"
        :class="{active: currentIndex === index}"
        v-for="(item, index) in tabbarData" :key="index"
        @click="itemClick(index, item)"
      >
      <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
      <img v-else :src="getAssetURL(item.imageActive)" alt="">
      <span class="text">{{ item.text }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import tabbarData from '@/assets/data/tabbar'
import { getAssetURL } from '@/utils/load_assets'
import { useRouter } from 'vue-router'
const currentIndex = ref(0)
const router = useRouter()
const itemClick = (index, item) => {
  currentIndex.value = index
  router.push(item.path)
}
</script>

<style lang="less" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  border-top: 1px solid #f3f3f3;
  .tab-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.active {
      color: var(--primary--color)
    }
    img {
      width: 36px;
    }
    .text {
      font-size: 14px;
      margin-top: 2px;
    }
  }
}
</style>