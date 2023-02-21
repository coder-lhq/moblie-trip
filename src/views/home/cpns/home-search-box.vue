<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="location bottom-gray-line">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="date-range bottom-gray-line" @click="selectDate">
      <div class="start">
        <span>入住</span>
        <span>{{ startDateStr }}</span>
      </div>
      <div class="stay">
        <span>共{{ staycount }}晚</span>
      </div>
      <div class="end">
        <span>离店</span>
        <span>{{ endDateStr }}</span>
      </div>
    </div>
    <van-calendar
      type="range"
      color="#ff9854"
      :round="false"
      v-model:show="showCalendar"
      @confirm="onConfirm"
    />
    <!-- 人数/选中价格 -->
    <div class="section statistics bottom-gray-line">
      <span>价格不限</span>
      <span>人数不限</span>
    </div>
    <!-- 关键字 -->
    <div class="section label bottom-gray-line">关键字/位置/民宿名</div>
    <!-- 热门推荐 -->
    <div class="hot-suggests">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div
          class="item"
          :style="{
            color: item.tagText.color,
            background: item.tagText.background.color
          }"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>
    <!-- 搜索 -->
    <div class="search-btn">
      <div class="btn" @click="clickSearch">开始搜索</div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue'
import { useRouter } from 'vue-router'
import useCityStore from '@/stores/modules/city'
import useHomeStore from '@/stores/modules/home'
import useMainStore from '@/stores/modules/main'
import { storeToRefs } from 'pinia'
import { formatMonthDay, getDiffDay } from '@/utils/format_date'

const router = useRouter()

const cityClick = () => {
  router.push('/city')
}

const positionClick = () => {
  navigator.geolocation.getCurrentPosition((res) => {
    console.log(res)
  }),
    (err) => {
      console.log(err)
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
}

const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)

// 日期数据
const mainStore = useMainStore()
const { startDate, endDate } = storeToRefs(mainStore)

console.log(startDate, endDate)
// 开始时间
const startDateStr = computed(() => formatMonthDay(startDate.value))
// 结束时间
const endDateStr = computed(() => formatMonthDay(endDate.value))
// 总共时间
const staycount = ref(getDiffDay(startDate.value, endDate.value))

// 是否显示日历
const showCalendar = ref(false)

// 选中日期
const selectDate = () => {
  showCalendar.value = true
}

const onConfirm = ([start, end]) => {
  // 1.设置时间
  mainStore.startDate = start
  mainStore.endDate = end
  staycount.value = getDiffDay(start, end)

  // 2.隐藏日历
  showCalendar.value = false
}

// 热门建议
const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)

// 开始搜索
const clickSearch = () => {
  router.push({
    path: '/search',
    query: {
      startDate: startDateStr.value,
      endDate: endDateStr.value,
      currentCity: currentCity.value.cityName
    }
  })
}
</script>

<style lang="less" scoped>
.search-box {
  --van-calendar-popup-height: 100%;
  .location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0px 20px;

    .city {
      flex: 1;
      color: #333;
      font-size: 15px;
    }

    .position {
      width: 74px;
      display: flex;
      align-items: center;

      .text {
        position: relative;
        top: 2px;
        font-size: 12px;
        color: #666;
      }

      img {
        margin-left: 5px;
        width: 18px;
        height: 18px;
      }
    }
  }

  .date-range {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0px 65px 0px 20px;
    .stay {
      flex: 1;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
    .start,
    .end {
      display: flex;
      flex-direction: column;
      span:first-of-type {
        font-size: 13px;
        color: #969799;
      }
    }
  }

  .statistics {
    display: flex;
    padding: 20px 65px 20px 20px;
    justify-content: space-between;
    font-size: 13px;
  }
  .label {
    padding: 20px 65px 20px 20px;
  }
  .section {
    color: #969799;
    font-size: 14px;
  }
  .hot-suggests {
    padding: 0px 65px 10px 20px;
    display: flex;
    flex-wrap: wrap;
    .item {
      padding: 4px 6px;
      margin: 4px;
      border-radius: 14px;
      font-size: 12px;
    }
  }
  .search-btn {
    display: flex;
    justify-content: center;
    .btn {
      width: 342px;
      height: 38px;
      max-height: 50px;
      font-weight: 500;
      font-size: 18px;
      line-height: 38px;
      text-align: center;
      border-radius: 20px;
      color: #fff;
      background-image: var(--theme-linear-gradient);
    }
  }
}
</style>
