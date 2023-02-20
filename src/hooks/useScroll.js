import { ref, onMounted, onUnmounted} from 'vue'
import { throttle } from 'underscore'
// export default function useScroll(reachBottomCB) {
//   const scrollListenerHandler = () => {
//     const clientHeight = document.documentElement.clientHeight
//     const scrollTop = Math.ceil(document.documentElement.scrollTop)
//     const scrollHeight = document.documentElement.scrollHeight
//     console.log(clientHeight, scrollTop, scrollHeight)
//     if ((clientHeight + scrollTop) >= scrollHeight) {
//       console.log("滚动到底部");
//       if (reachBottomCB) reachBottomCB()
//     }
//   }
//   onMounted(() => {
//     // 下拉加载更多
//     console.log("挂载scroll");
//     window.addEventListener('scroll', scrollListenerHandler)
//   })

//   onUnmounted(() => {
//     // 下拉加载更多
//     console.log("销毁scroll");
//     window.removeEventListener('scroll', scrollListenerHandler)
//   })
// }

export default function useScroll() {
  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)
  const scrollListenerHandler = throttle(() => {
    console.log("监听到滚动");
    clientHeight.value = document.documentElement.clientHeight
    scrollTop.value = Math.ceil(document.documentElement.scrollTop)
    scrollHeight.value = document.documentElement.scrollHeight
    if ((clientHeight.value + scrollTop.value) >= scrollHeight.value) {
      console.log("滚动到底部");
      isReachBottom.value = true
    }
  }, 100)
  onMounted(() => {
    // 下拉加载更多
    console.log("挂载scroll");
    window.addEventListener('scroll', scrollListenerHandler)
  })

  onUnmounted(() => {
    // 下拉加载更多
    console.log("销毁scroll");
    window.removeEventListener('scroll', scrollListenerHandler)
  })
  return {
    isReachBottom,
    clientHeight,
    scrollTop,
    scrollHeight
  }
}
