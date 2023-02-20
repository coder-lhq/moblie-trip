<template>
  <div class="detail top-page">
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />
    <DetailSwipe v-if="mainPart" :swipeData="mainPart?.topModule.housePicture.housePics"/>
    <DetailInfo v-if="mainPart" :topInfos="mainPart?.topModule" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter} from 'vue-router'
import DetailSwipe from './cpns/detail_01-swipe.vue'
import DetailInfo from './cpns/detail_02-infos.vue'
import { getDetailInfos } from '@/service'

// 路由
const router = useRouter()
const { params: { id } } =  useRoute()

// 发送网络请求获取数据
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
getDetailInfos(id).then((res) => {
  detailInfos.value = res.data
})

const onClickLeft = () => router.back()
</script>

<style lang="less" scoped>

</style>
