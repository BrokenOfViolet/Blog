<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        router="true"
        :ellipsis="false"
      >
        <el-menu-item index="0">
          <img
            style="width: 100px"
            src="./assets/element-plus-logo.svg"
            alt="Element logo"
          />
        </el-menu-item>

        <el-menu-item index="/">Blog Center</el-menu-item>

        <el-sub-menu index="/login">
          <template #title>Login</template>
          <el-menu-item index="/login">Login</el-menu-item>
          <el-menu-item index="/register">Register</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-header>

    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

</script>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}

a {
  text-decoration: none;
}
</style>
