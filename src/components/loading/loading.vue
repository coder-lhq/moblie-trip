<template>
  <div class="loading" v-if="mainStore.isLoading" @click="loadingClick">
    <div class="bg">
      <img src="@/assets/img/home/full-screen-loading.gif" alt="" />
    </div>
  </div>
</template>

<script setup>
import useMainStore from '@/stores/modules/main'
const mainStore = useMainStore()
const loadingClick = () => {
  mainStore.isLoading = false
}
</script>
<style lang="less" scoped>
.loading {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background: rgba(0, 0, 0, 0.1);
  .bg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 104px;
    height: 104px;
    background: url(@/assets/img/home/loading-bg.png) center/100% 100% no-repeat;
    img {
      margin-bottom: 8px;
      height: 70px;
      height: 70px;
    }
  }
}
</style>
