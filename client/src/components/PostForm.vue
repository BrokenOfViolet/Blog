<template>
  <el-form :model="form" :rules="rules" ref="postForm" label-position="top">
    <el-form-item label="Title" prop="title">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="">
        <el-upload action="api/upload" :on-success="handleCoverSuccess"
        name="file" list-type="picture-card" :limit="1" :file-list="fileList"
        :on-exceed="handleExceed"> 
            <i class="icon-plus">+</i>
        </el-upload>
    </el-form-item>
    <el-form-item label="Content" prop="content">
      <el-input type="textarea" v-model="form.content" rows="10"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Submit</el-button>
      <el-button @click="reset">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
import axios from 'axios'

const form = reactive({ 
  title: '',
  content: '',
  cover: '', // image address
})

const rules = {
  title: [{ required: true, message: 'Required', trigger: 'blur' }], // 当表单项 title 失去焦点（blur）时，执行一次校验，如果为空就提示 “Required”。
  content: [{ required: true, message: 'Required', trigger: 'blur' }],
}

const handleCoverSuccess = (res) => {
  form.cover = res.url || res.path || res.data?.url || ''
}

const handleExceed = (files) => {
  fileList.value = []
  FileSystemWritableFileStream.value.push({
    name: files[0].name,
    url: URL.createObjectURL(files[0])
  })
}

const postForm = ref()  // el-form绑定了rules，所以必须调用validate()

const submit = async () => {
  postForm.value.validate(async (valid) => {
    if (valid) {
      try {
        await axios.post('/api/post/add', form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        ElNotification.success('Create post success!')
        reset()
      } catch(err) {
        console.log(err)
      }
    } else {
      ElNotification.error('Please fill required fields')
    }
  })
}

const reset = () => {
  form.title = '',
  form.content = '',
  form.cover = '',
  postForm.value.clearValidate()
}
</script>
