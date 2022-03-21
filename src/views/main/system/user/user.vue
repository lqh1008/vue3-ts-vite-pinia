<template>
  <div class="user">
    <div class="search">
      <hy-form v-bind="searchFormConfig" />
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts" setup>
import { HyForm } from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'
</script>

<style scoped></style>
