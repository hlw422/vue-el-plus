<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="title">系统登录</h2>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginFormRef"
        label-position="top"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="User"
          />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="login-btn"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { userLoginStore } from "@/stores/userLogin";
import{ generateUUID}from "@/utils/common";
import router from "@/router";
import { useRouter } from "vue-router";

import {userTest} from "@/api/userController"

userTest({name: "test"}).then(res => {
  console.log(res)
});


const routerJump = useRouter();

const loginForm = ref({
  username: "",
  password: ""
});

const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
};

const loginFormRef = ref(null);
const store = userLoginStore();

const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      console.log("登录信息：", loginForm.value);
      store.setToken(generateUUID());
      routerJump.push("/");
      // 这里可以替换成你的接口请求
      // axios.post("/api/login", loginForm.value).then(...)
    }
  });
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
  overflow: hidden;
}

.login-card {
  width: 400px;
  padding: 20px;
  border-radius: 12px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 22px;
  color: #333;
}

.login-btn {
  width: 100%;
}
</style>