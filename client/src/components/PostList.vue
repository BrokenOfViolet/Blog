<template>
  <div>
    <h2>Post List</h2>
    <el-card v-for="post in posts" :key="post._id" shadow="hover" class="post-card">
        <template #header>{{ post.title }}</template>
        <p>{{ post.content }}</p>
        <template #footer>{{ post.author.username }}-{{ post.createdAt }}</template>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const posts = ref([])

async function fetchPosts() {
    try {
        const res = await axios.get('api/post/show')
        posts.value = res.data || []
    } catch(err) {
      console.log('[ERROR] can not get posts', err)
    }
}

onMounted(fetchPosts)
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
