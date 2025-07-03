<template>
  <div class="auth-container">
    <h2>User Login</h2>

    <!-- el-form 不支持 @submit，需要用 native form 或配合按键事件处理 -->
    <el-form :model="form" label-position="top">
      <el-form-item label="username">
        <el-input v-model="form.username" placeholder="Input the username" />
      </el-form-item>

      <el-form-item label="password">
        <el-input v-model="form.password" placeholder="Input the password" type="password" />
      </el-form-item>

      <el-form-item>
        <!-- 推荐使用 type="submit" 并绑定表单处理函数 -->
        <el-button type="primary" @click="handleLogin">Login</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
// 导入响应式工具、路由、axios、Element 提示框
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ElNotification } from 'element-plus'

import './auth.css'

// 创建路由实例，用于跳转
const router = useRouter()

// 定义登录表单数据（响应式对象）
const form = reactive({
  username: '',
  password: ''
})

// 登录逻辑函数
async function handleLogin() {
  if (!form.username || !form.password) {
    ElNotification.warning({
      title: '提示',
      message: '请输入用户名和密码',
      position: 'top-right'
    })
    return
  }

  try {
    const res = await axios.post('http://localhost:3000/api/user/login', {
      username: form.username,
      password: form.password
    })

    const user = res.data.user

    ElNotification.success({
      title: '登录成功',
      message: res.data.message || '欢迎回来',
      position: 'top-right'
    })

    // 存储登录信息
    localStorage.setItem('username', user.username)
    localStorage.setItem('userId', user._id)

    // 跳转主页
    router.push('/')
  } catch (err) {
    ElNotification.error({
      title: '登录失败',
      message: err.response?.data?.message || '用户名或密码错误',
      position: 'top-right'
    })
  }
}
</script>
