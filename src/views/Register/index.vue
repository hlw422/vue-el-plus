<template>
  <div class="register-container">
    <el-card class="register-card">
      <h2 class="title">用户注册</h2>
      <el-form
        :model="registerForm"
        :rules="registerRules"
        ref="registerFormRef"
        label-position="top"
      >
        <el-form-item label="用户名" prop="userAccount">
          <el-input
            v-model="registerForm.userAccount"
            placeholder="请输入用户名"
            prefix-icon="User"
          />
        </el-form-item>

        <el-form-item label="密码" prop="userPassword">
          <el-input
            v-model="registerForm.userPassword"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPassword">
          <el-input
            v-model="registerForm.checkPassword"
            type="password"
            placeholder="请确认密码"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="success"
            class="register-btn"
            @click="handleRegister"
          >
            注册
          </el-button>
        </el-form-item>

        <el-form-item>
          <span>已有账号？</span>
          <el-button type="text" @click="toLogin">去登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { encrypt } from "@/utils/encry";
import { useRouter } from "vue-router";
import { userRegister } from "@/api/userController";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { es } from "element-plus/es/locales.mjs";
const router = useRouter();

const registerForm = ref<API.UserRegisterRequest>({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
});

// 表单校验规则，字段名要和 prop 对应
const registerRules: FormRules = {
  userAccount: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  userPassword: [{ required: true, message: "请输入密码", trigger: "blur" }],
  checkPassword: [
    { required: true, message: "请确认密码", trigger: "blur" },
    {
      validator: (_rule, value, callback) => {
        if (value !== registerForm.value.userPassword) {
          callback(new Error("两次密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
};

// 表单引用类型应该是 FormInstance
const registerFormRef = ref<FormInstance>();

const handleRegister = () => {
  registerFormRef.value?.validate((valid) => {
    if (valid) {
      const hashedPassword = encrypt(registerForm.value.userPassword);

      userRegister({
        userAccount: registerForm.value.userAccount,
        userPassword: hashedPassword,
        checkPassword: hashedPassword,
      }).then((res) => {
        if (res.data.code == 0) {
          ElMessage.success("注册成功，请登录");
          router.push("/login");
        } else {
          ElMessage.error(res.data.message);
        }
      });
    }
  });
};

const toLogin = () => {
  router.push("/login");
};
</script>




<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
}
.register-card {
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
.register-btn {
  width: 100%;
}
</style>
