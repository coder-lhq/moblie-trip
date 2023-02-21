<template>
  <div class="home">
    <HomeNavBar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <HomeSearchBox />
    <HomeCategories />
    <HomeCntent />
    <div v-if="isShowSearchBar" class="search-bar">
      <SearchBar />
    </div>
  </div>
</template>

<script setup>
import { watch, ref, computed } from 'vue'
import useHomeStore from '@/stores/modules/home'
import useScroll from '@/hooks/useScroll'
import HomeNavBar from './cpns/home-nav-bar.vue'
import HomeSearchBox from './cpns/home-search-box.vue'
import HomeCategories from './cpns/home-categories.vue'
import HomeCntent from './cpns/home-content.vue'
import SearchBar from '@/components/search-bar/search-bar.vue'

// 发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouseListData()

// 下拉加载更多
// useScroll(() => {
//   homeStore.fetchHouseListData()
// })

const { isReachBottom, scrollTop } = useScroll()
watch(isReachBottom, () => {
  homeStore.fetchHouseListData().then(() => {
    isReachBottom.value = false
  })
})

// const isShowSearchBar = ref(false)
// watch(scrollTop, (newTop) => {
//   isShowSearchBar.value = newTop > 100
// })
//

// 定义的可响应式数据，依赖于另外一个可响应式数据，可以使用计算属性。
const isShowSearchBar = computed(() => {
  return scrollTop.value > 360
})
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 100px;
  .banner {
    img {
      width: 100%;
    }
  }

  .search-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
  }
}
</style>
