<template>
  <el-container>
    <!-- 左侧菜单栏 -->
    <el-aside width="220px">
      <el-menu
        class="side-menu"
        :default-active="activeComponent"
        @select="handleSelect"
      >
        <el-menu-item index="PostList">
            <el-icon><Location /></el-icon>
            <span>Discover</span>
        </el-menu-item>

        <el-menu-item index="PostForm">
            <el-icon><Edit /></el-icon>
            <span>Write Post</span>
        </el-menu-item>

        <el-menu-item index="MessageBox">
            <el-icon><Message /></el-icon>
            <span>Message</span>
        </el-menu-item>

        <el-sub-menu index="WorkBench">
            <template #title>
                <el-icon><Tools /></el-icon>
                <span>WorkBench</span>
            </template>
            <el-menu-item>
                Function-1
            </el-menu-item>
            <el-menu-item>
                Function-2
            </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="UserProfile">
          <el-icon><User /></el-icon>
          <span>User</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右侧内容 -->
    <el-main>
      <!-- 动态组件渲染 -->
      <component :is="currentComponent" />
    </el-main>
  </el-container>
</template>

<script setup>
import {
  Location,
  Edit,
  User,
  Message,
  Tools,
} from '@element-plus/icons-vue'
import { ref, computed, defineAsyncComponent } from 'vue'

// 绑定当前激活的组件 key
const activeComponent = ref('PostList')

// 映射菜单 index 到组件
const componentMap = {  // 懒加载，返回值是Promise
    PostList: defineAsyncComponent(() => import('@/components/PostList.vue')),
    PostForm: defineAsyncComponent(() => import('@/components/PostForm.vue')),
//   Analytics: () => import('@/components/Analytics.vue'),
//   Settings: () => import('@/components/Settings.vue'),
}

// 当前显示的组件
const currentComponent = computed(() => componentMap[activeComponent.value] ?? null)

// 选择菜单时改变组件
const handleSelect = (index) => {
  activeComponent.value = index
}
</script>
