import dayjs from 'dayjs'

// 日期格式化
export function formatMonthDay(date, format = 'MM月DD日') {
  return dayjs(date).format(format)
}

// 获取时间区间天数
export function getDiffDay(startDate, endDate) {
  return dayjs(endDate).diff(startDate, 'day')
}
