<template>
  <div class="main">
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
<style scoped lang="scss">
.main {
}
</style>
