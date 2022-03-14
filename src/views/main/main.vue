<template>
  <div class="main">
    MAIN
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'main',
  components: {},
  setup() {
    return {}
  }
})
</script>
<style scoped></style>
