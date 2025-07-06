<template>
  <div class="auth-container">
    <h2>User Register</h2>
    <el-form :model="form" label-width="auto" label-position="top">
      <el-form-item label="Username" required>
        <el-input v-model="form.username" placeholder="Input username" />
      </el-form-item>
      <el-form-item label="Password" required>
        <el-input v-model="form.password" placeholder="Input password" type="password" />
      </el-form-item>
      <el-form-item label="Confirm Password" required>
        <el-input v-model="form.confirm" placeholder="Confirm password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleRegister">Register</el-button>
        <el-button @click="resetForm">Cancel</el-button>
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

const router = useRouter()

const form = reactive({
  username: '',
  password: '',
  confirm: ''
})

const resetForm = () => {
  form.username = ''
  form.password = ''
  form.confirm = ''
}

async function handleRegister() {
  if (!form.username || !form.password || !form.confirm) {
    return ElNotification.error('Please fill all fields')
  }

  if (form.password !== form.confirm) {
    return ElNotification.error('Passwords do not match')
  }

  try {
    const res = await axios.post('/api/user/register', {
      username: form.username,
      password: form.password
    })

    ElNotification.success('Register success')
    setTimeout(() => router.push('/login'), 1500)
  } catch (err) {
    const msg = err?.response?.data?.message || 'Register failed'
    ElNotification.error(msg)
  }
}
</script>
