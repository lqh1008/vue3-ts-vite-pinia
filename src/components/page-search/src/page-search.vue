<template>
  <div class="page-search">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button>重置</el-button>
          <el-button type="primary">搜索</el-button>
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { HyForm } from '@/base-ui/form'
const propsConfig = defineProps({
  searchFormConfig: {
    type: Object,
    reuqired: true
  }
})
console.log(propsConfig)
const formData = ref({
  id: '',
  name: '',
  password: '',
  sport: '',
  date: ''
})
</script>
<style lang="scss" scoped>
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
