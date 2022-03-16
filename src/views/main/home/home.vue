<template>
  <div class="home">
    <el-button @click="handleAddClick">增加</el-button>
    <el-button @click="handleGoTestClick">去test</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useCounterStore } from '@/stores/counter'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'home',
  components: {},
  setup() {
    // console.log('props:::', props)
    // console.log('context:::', context)

    const counter = useCounterStore()
    const router = useRouter()

    const handleAddClick = () => {
      counter.increment()
      // counter.$patch({ count: counter.count + 1 })
    }

    const handleGoTestClick = () => {
      router.push('/test')
    }
    // counter.count++
    // with autocompletion ✨
    // or using an action instead

    return {
      handleAddClick,
      handleGoTestClick
    }
  }
})
</script>
<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
}
</style>
