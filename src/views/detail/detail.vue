<template>
  <div class="detail top-page">
    <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />
    <DetailSwipe v-if="mainPart" :swipeData="mainPart?.topModule.housePicture.housePics" />
    <DetailInfo v-if="mainPart" :topInfos="mainPart?.topModule" />
    <div class="facility">
      <DetailFacility :houseFacility="mainPart?.dynamicModule.facilityModule.houseFacility" />
      <DetailLandlord :landlord="mainPart?.dynamicModule.landlordModule" />
      <DetailComment :comment="mainPart?.dynamicModule.commentModule" />
      <DetailNotice :orderRules="mainPart?.dynamicModule.rulesModule.orderRules" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getDetailInfos } from '@/service'
import DetailSwipe from './cpns/detail_01-swipe.vue'
import DetailInfo from './cpns/detail_02-infos.vue'
import DetailFacility from './cpns/detail_03-facility.vue'
import DetailLandlord from './cpns/detail_04-landlord.vue'
import DetailComment from './cpns/detail_05-comment.vue'
import DetailNotice from './cpns/detail_06-notice.vue'
// 路由
const router = useRouter()
const {
  params: { id }
} = useRoute()

// 发送网络请求获取数据
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
getDetailInfos(id).then((res) => {
  detailInfos.value = res.data
})

const onClickLeft = () => router.back()
</script>

<style lang="less" scoped></style>
