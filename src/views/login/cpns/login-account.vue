<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import LocalCache from '@/utils/cache'

import { rules } from '../configs/account-config'
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'

import { useLoginStore } from '@/stores/login/login'

const formRef = ref<InstanceType<typeof ElForm>>()

const loginStore = useLoginStore()

const account = reactive({
  name: LocalCache.getCache('name') ?? '',
  password: LocalCache.getCache('password') ?? ''
})

// loginStore
console.log('loginStore: ')

const loginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      if (isKeepPassword) {
        LocalCache.setCache('name', account.name)
        LocalCache.setCache('password', account.password)
        loginStore.accountLoginAction(account)
      } else {
        LocalCache.deleteCache('name')
        LocalCache.deleteCache('password')
      }
    } else {
      console.log('error submit!')
      return false
    }
  })
}
defineExpose({
  loginAction
})
</script>
<style lang="scss" scoped></style>
