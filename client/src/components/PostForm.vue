<template>
  <el-form :model="form" :rules="rules" ref="postForm" label-position="top">
    <el-form-item label="Title" prop="title">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="">
        <el-upload action="api/upload" :on-success="handleCoverSuccess"
        list-type="picture-card">
            <i class="icon-plus">+</i>
        </el-upload>
    </el-form-item>
    <el-form-item label="Content" prop="content">
      <el-input type="textarea" v-model="form.content" rows="10"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="reset">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

const form = reactive({
  title: '',
  content: '',
})

const rules = {
  title: [{ required: true, message: 'Required', trigger: 'blur' }],
  content: [{ required: true, message: 'Required', trigger: 'blur' }],
}

const postForm = ref()

const submit = () => {
  postForm.value.validate((valid) => {
    if (valid) {
      ElMessage.success('表单验证通过')
      // 提交逻辑...
    } else {
      ElMessage.error('请完整填写表单')
    }
  })
}
</script>
