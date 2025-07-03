<template>
  <div>
    <h2>Post List</h2>
    <el-card v-for="post in posts" :key="post.id" shadow="hover" class="post-card">
        <template #header>{{ post.title }}</template>
        <p>{{ post.content }}</p>
        <template #footer>{{ post.author }}</template>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

async function getPostList() {
    try {
        const res = axios.get('api/posts')
    } catch(err) {

    }
}
const posts = ref([
  { title: 'Vue 入门实践', author: 'Alice', createdAt: '2025-07-03' },
  { title: '深入 Element Plus', author: 'Bob', createdAt: '2025-07-02' },
  { title: '使用 Vite 构建项目', author: 'Charlie', createdAt: '2025-07-01' },
])
</script>

<style scoped>
h2 {
  margin-top: -20px;
  margin-bottom: 10px;
}
.post-card {
    margin-top: 20px;
}
</style>
