<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <!-- 账号登录 -->
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><user /></el-icon> <span>账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>

      <!-- 手机登录 -->
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><cellphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <!-- 记住密码 -->
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <!-- 立即登陆 -->
    <el-button
      type="primary"
      class="login-btn"
      @click="handleLoginClick(isKeepPassword)"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
import { User, Cellphone } from '@element-plus/icons-vue'
import { ref } from 'vue'

const currentTab = ref<string>('account')
const isKeepPassword = ref(true)
const accountRef = ref<InstanceType<typeof LoginAccount>>()
const phoneRef = ref<InstanceType<typeof LoginPhone>>()

const handleLoginClick = (isKeepPassword: boolean) => {
  if (currentTab.value === 'account') {
    accountRef.value?.loginAction(isKeepPassword)
  } else {
    console.log('手机登录')
  }
}
</script>
<style lang="scss" scoped>
.login-panel {
  margin-bottom: 150px;
  width: 320px;

  .title {
    text-align: center;
  }

  .custom-tabs-label {
    display: flex;
    align-items: center;
    .el-icon {
      margin-right: 10px;
    }
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
