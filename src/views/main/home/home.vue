<template>
  <div>count:{{ count }}</div>
  <div>doubleCount:{{ doubleCount }}</div>
</template>
<script lang="ts" setup>
import { useCounterStore } from '@/stores/counter'
import { computed } from 'vue'
const counter = useCounterStore()
//使用computed获取响应式数据
const doubleCount = computed(() => counter.count * 2)

const { count } = counter
</script>
