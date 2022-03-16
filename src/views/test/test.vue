<template>
  <div class="test"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useCounterStore } from '@/stores/counter'

export default defineComponent({
  name: '',
  components: {},
  setup() {
    console.log(111)

    const data = useCounterStore().count
    console.log(data)

    return {}
  }
})
</script>
<style scoped></style>
