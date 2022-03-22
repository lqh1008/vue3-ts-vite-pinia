<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick"
      ><fold v-show="isFold" /> <expand v-show="!isFold"
    /></el-icon>
    <div class="content">
      <hy-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Fold, Expand } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
// import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/login/login'

import UserInfo from './user-info.vue'
import HyBreadcrumb from '@/base-ui/breadcrumb'

import { pathMapToBreadcrumb } from '@/utils/map-menus'

const emit = defineEmits(['foldChange'])
const breadcrumbs = computed(() => {
  const userMenu = useLoginStore().userMenu
  const route = useRoute()
  return pathMapToBreadcrumb(userMenu, route.path)
})

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
