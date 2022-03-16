<template>
  <div class="login">
    <el-form
      class="login-form"
      ref="loginFormRef"
      :model="loginForm"
      status-icon
      :rules="loginRules"
      label-width="120px"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="loginForm.account" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(loginFormRef)"
          >Submit</el-button
        >
        <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'

const loginFormRef = ref<FormInstance>()

const loginForm = reactive({
  account: '',
  password: ''
})

const loginRules = reactive({
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  console.log(formEl)
}
</script>
<style lang="scss" scoped>
// .login {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(50%, 50%);
//   .login-form {
//   }
// }
</style>
