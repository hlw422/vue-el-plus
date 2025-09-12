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
        <el-form-item label="用户名" prop="useraccount">
          <el-input
            v-model="loginForm.useraccount"
            placeholder="请输入用户名"
            prefix-icon="User"
          />
        </el-form-item>

        <el-form-item label="密码" prop="userpassword">
          <el-input
            v-model="loginForm.userpassword"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="login-btn" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>

        <el-form-item>
          <span>还没有账号？</span>
          <el-button type="text" @click="toRegister">去注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { encrypt } from "@/utils/encry";
import { userLoginStore } from "@/stores/userLogin";
import { generateUUID } from "@/utils/common";
import { useRouter } from "vue-router";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { userLogin } from "@/api/userController";

const router = useRouter();
const store = userLoginStore();

const loginForm = ref<API.UserLoginRequest>({
  useraccount: "",
  userpassword: "",
});

const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const loginFormRef = ref<FormInstance>();

const handleLogin = () => {
  loginFormRef.value?.validate((valid) => {
    if (valid) {
      const hashedPassword = encrypt(loginForm.value.userpassword);
      //loginForm.value.userpassword = hashedPassword;

      userLogin({
        useraccount: loginForm.value.useraccount,
        userpassword: hashedPassword
      }).then((res) => {
        if (res.data.code == 0) {
          userLoginStore().setToken(res.data.data.token);
          ElMessage.success("登录成功");
          router.push("/");
        } else {
          ElMessage.error(res.data.message);
        }
      });
    }
  });
};

const toRegister = () => {
  router.push("/register");
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
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
