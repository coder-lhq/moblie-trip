<template>
  <div class="map">
    <DetailSection title="位置周边" more-text="查看跟多周边信息">
      <div class="baidu" ref="mapRef"></div>
    </DetailSection>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import DetailSection from '@/components/detail-section/detail-section.vue'

const props = defineProps({
  position: {
    type: Object,
    default: () => {}
  }
})

const mapRef = ref()

onMounted(() => {
  setTimeout(() => {
    const map = new BMapGL.Map(mapRef.value) // 创建地图实例
    const point = new BMapGL.Point(props.position.longitude, props.position.latitude) // 创建点坐标
    const marker = new BMapGL.Marker(point) // 创建标注
    map.addOverlay(marker) // 将标注添加到地图中
    map.centerAndZoom(point, 15) // 初始化地图，设置中心点坐标和地图级别
  }, 100)
})
</script>

<style lang="less" scoped>
.baidu {
  height: 300px;
}
</style>
