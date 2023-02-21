<template>
  <div class="app">
    <router-view></router-view>
    <TabBar v-if="!route.meta.isShow" />
    <Loading />
  </div>
</template>

<script setup>
import TabBar from '@/components/tab-bar/tab-bar.vue'
import Loading from '@/components/loading/loading-load.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style lang="less" scoped></style>
