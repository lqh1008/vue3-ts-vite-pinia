<template>
  <div class="overview">
    <h2>overview</h2>
    <custom-element> </custom-element>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
//@ts-ignore
import { register } from '@/web-components/custom-element.es.js'
register('custom-element')
export default defineComponent({
  name: 'overview',
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
