<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span class="title" v-show="!collapse">Vue3+TS</span>
    </div>
    <el-menu
      class="el-menu-vertical"
      default-active="2"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse="collapse"
    >
      <template v-for="item in userMenu" :key="item.id">
        <el-sub-menu v-if="item.type === 1" :index="String(item.id)">
          <template #title>
            <el-icon style="margin-right: 20px"><food /></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="String(item.id) + '-' + String(subItem.id)"
            >{{ subItem.name }}</el-menu-item
          >
        </el-sub-menu>
        <el-menu-item v-else></el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import { Food } from '@element-plus/icons-vue'
import { useLoginStore } from '@/stores/login/login'

defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})

const userMenu = computed(() => {
  //此处断言元组避免item取不到type等值
  return useLoginStore().userMenu as [
    {
      type: number
      name: string
      id: number
      children: [{ id: number; name: string }]
    }
  ]
})
</script>

<style scoped lang="scss">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  :deep(.el-submenu__title) {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
