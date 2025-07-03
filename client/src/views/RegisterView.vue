<template>
  <div class="auth-container">
    <h2>User Register</h2>
    <el-form :model="form" label-width="auto" label-position="top">
      <el-form-item label="username" required>
        <el-input v-model="form.username" placeholder="Input username" />
      </el-form-item>
      <el-form-item label="password">
        <el-input v-model="form.password" placeholder="Input password" type="password" />
      </el-form-item>
      <el-form-item label="confirm password">
        <el-input v-model="form.confirm" placeholder="Confirm password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleRegister">Register</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ElNotification } from 'element-plus'

import './auth.css'

const form = reactive({
  username: '',
  password: '',
  confirm: ''
})

function handleRegister() {
  if (form.password !== form.confirm) {
    alert('两次密码输入不一致')
    return
  }
  console.log('注册信息：', form)
  // 后续可发请求保存用户信息
}
</script>