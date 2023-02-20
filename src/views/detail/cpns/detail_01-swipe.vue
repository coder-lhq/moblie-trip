<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
      <template v-for="(item, index) in swipeData" :key="index">
        <van-swipe-item class="item">
          <img :src="item.url" alt="">
        </van-swipe-item>
      </template>
      <template #indicator="{active, total }">
        <div class="custom-indicator">
          <template v-for="(value, key, index) in swipeGroup">
            <span class="item" :class="{active: swipeData[active]?.enumPictureCategory == key}">
              <span>{{ getName(value[0].title) }}</span>
              <span v-if="swipeData[active]?.enumPictureCategory == key">
                {{ getCategoryIndex(swipeData[active]) }} / {{ value.length }}
              </span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>

const props = defineProps({
  swipeData: {
    type: Array,
    default: () => []
  }
})

// 对轮播图数据进行分类
const swipeGroup = {}

for(const item of props.swipeData) {
  let valueArray = swipeGroup[item.enumPictureCategory]
  if (!valueArray) {
    valueArray = []
    swipeGroup[item.enumPictureCategory] = valueArray
  }
  valueArray.push(item)
}
console.log(swipeGroup);

const nameReg = /【(.*?)】/i
const getName = (name) => {
  // return name.replace("：", "").replace("【", "").replace("】", "")
  const result = nameReg.exec(name)
  return result[1]
}

const getCategoryIndex = (data) => {
  const valueArray = swipeGroup[data.enumPictureCategory]
  return valueArray.findIndex(item => item === data) + 1
}


</script>

<style lang="less" scoped>
.swipe {
  .swipe-list {
    position: relative;
    .item {
      img {
        width: 100%;
      }
    }
    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, 0.1);

      .item {
        padding: 0px 3px;
        margin: 0 3px;
        border-radius: 3px;
        &.active {
          background-color: #fff;
          color: #333;
        }
      }
    }
  }
}
</style>
