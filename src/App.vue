<template>
  <div class="common-layout">
    <el-container class="home-container" v-if="store.token">
      <el-header>
        <div style="background-color: aqua; width: 100%; height: 60px">
          <div class="header-content">
            <img
              src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
              style="width: 60px; height: 60px; margin-right: 10px"
            />
            <el-row :gutter="20">
              <el-col :span="12">
                <el-button type="primary" @click="logout">注册</el-button>
              </el-col>
              <el-col :span="12">
                <el-button type="primary" @click="logout">登录</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="400px">
          <el-row class="tac">
            <el-col :span="12">
              <h5 class="mb-2">Default colors</h5>
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
              >
                <el-sub-menu index="1">
                  <template #title>
                    <el-icon><location /></el-icon>
                    <span>Navigator One</span>
                  </template>
                  <el-menu-item-group title="Group One">
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title="Group Two">
                    <el-menu-item index="1-3">item three</el-menu-item>
                  </el-menu-item-group>
                  <el-sub-menu index="1-4">
                    <template #title>item four</template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                  </el-sub-menu>
                </el-sub-menu>
                <el-menu-item index="2">
                  <el-icon><icon-menu /></el-icon>
                  <span>Navigator Two</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                  <el-icon><document /></el-icon>
                  <span>Navigator Three</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <el-icon><setting /></el-icon>
                  <span>Navigator Four</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-container>
          <el-main>
            <router-view />
          </el-main>
          <el-footer>
            <div>copyright © 2025</div>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
    <router-view v-else />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { userLoginStore } from "@/stores/userLogin";
import router from "./router";
import { useRouter } from "vue-router";
const routerJump = useRouter();

const store = userLoginStore();

const login = () => {
  routerJump.push("/login");
};

const logout = () => {
  store.logout();
  routerJump.push("/login");
};
</script>
<style scoped>
.home-container {
  position: absolute;
  height: 100%;
  top: 0px;
  left: 0px;
  width: 100%;
  background: #f2f3f5;
}
.el-header {
  padding: 0; /* 去掉内边距 */
}
.el-footer {
  color: #cccccc;
  text-align: center;
  line-height: 60px;
}
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
}
</style>
