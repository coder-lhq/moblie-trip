<template>
  <div class="categories">
    <template v-for="(item) in categories" :key="item.id">
      <div class="item">
        <img :src="item.pictureUrl" alt="">
        <div class="text">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>

<script setup>
import useCityStore from '@/stores/modules/home'
import { storeToRefs } from 'pinia'
// 分类数据
const homeStore = useCityStore()
const { categories } = storeToRefs(homeStore)
console.log(categories);
</script>

<style lang="less" scoped>
.categories {
  display: flex;
  overflow-x: auto;
  padding: 0px 10px;
  height: 80px;
  &::-webkit-scrollbar {
    display: none;
  }
  .item {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70px;
    img {
      width: 32px;
      height: 32px;
    }
    .text {
      font-size: 12px;
      margin-top: 8px;
    }
  }
}
</style>
