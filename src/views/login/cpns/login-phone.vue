<template>
  <div class="login-phone">
    <el-form label-width="80px" :rules="rules" :model="phone">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="phone.code" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { rules } from '../configs/phone-config'
const phone = reactive({
  num: '',
  code: ''
})
</script>
<style lang="scss" scoped></style>
