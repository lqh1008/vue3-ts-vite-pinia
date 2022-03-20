<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick"
      ><fold v-show="isFold" /> <expand v-show="!isFold"
    /></el-icon>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Fold, Expand } from '@element-plus/icons-vue'

const emit = defineEmits(['foldChange'])

const isFold = ref(false)
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>
<style lang="scss" scoped>
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
