<template>
  <div class="login-page">
    <div class="hearts-bg">
      <span v-for="i in 8" :key="i" class="heart-float" :style="heartStyle(i)">♥</span>
    </div>
    <div class="login-container">
      <div class="logo">
        <div class="logo-icon">♥</div>
        <h1>LoveDays</h1>
      </div>
      <van-form @submit="onSubmit" class="login-form">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="username"
            label="账号"
            placeholder="请输入账号"
            :rules="[{ required: true, message: '请输入账号' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请输入密码' }]"
          />
        </van-cell-group>
        <div class="btn-wrap">
          <van-button round block type="primary" native-type="submit" color="linear-gradient(135deg, #ff6b9d, #ff8a80)">
            登录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { showToast } from 'vant'

const router = useRouter()
const authStore = useAuthStore()
const username = ref('')
const password = ref('')

function onSubmit() {
  if (authStore.login(username.value, password.value)) {
    router.push('/')
  } else {
    showToast('账号或密码错误')
  }
}

function heartStyle(i) {
  const left = Math.random() * 100
  const delay = Math.random() * 8
  const duration = 6 + Math.random() * 6
  const size = 12 + Math.random() * 14
  return {
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    fontSize: `${size}px`
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #ff6b9d 0%, #ff8a80 50%, #ff6b9d 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.hearts-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}
.heart-float {
  position: absolute;
  top: -30px;
  opacity: 0.15;
  animation: floatDown linear infinite;
}
@keyframes floatDown {
  0% { transform: translateY(0) rotate(0deg); opacity: 0.15; }
  50% { opacity: 0.25; }
  100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
}
.login-container {
  width: 90%;
  max-width: 360px;
  position: relative;
  z-index: 1;
}
.logo {
  text-align: center;
  margin-bottom: 32px;
}
.logo-icon {
  font-size: 48px;
  color: #fff;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
  animation: heartbeat 1.5s ease-in-out infinite;
}
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  15% { transform: scale(1.3); }
  30% { transform: scale(1); }
  45% { transform: scale(1.2); }
  60% { transform: scale(1); }
}
.logo h1 {
  color: #fff;
  font-size: 24px;
  margin: 8px 0 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.login-form {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 8px 0;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
.btn-wrap {
  padding: 16px 16px 8px;
}
</style>
