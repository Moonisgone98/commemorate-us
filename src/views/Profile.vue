<template>
  <div class="profile-page">
    <van-nav-bar title="个人中心" style="--van-nav-bar-title-color: #333;" />

    <div class="section">
      <h4>情侣信息</h4>
      <van-cell-group inset>
        <van-field v-model="store.couple.nickname1" label="他的昵称" placeholder="输入昵称" @blur="onSave" />
        <van-field v-model="store.couple.nickname2" label="她的昵称" placeholder="输入昵称" @blur="onSave" />
      </van-cell-group>
    </div>

    <div class="section">
      <h4>主题颜色</h4>
      <div class="theme-box">
        <div
          v-for="t in themes"
          :key="t.key"
          class="theme-btn"
          :class="{ active: store.settings.theme === t.key }"
          @click="store.setTheme(t.key)"
        >
          <span class="theme-dot" :style="{ background: t.color }" />
          <span class="theme-label">{{ t.label }}</span>
        </div>
      </div>
    </div>

    <div class="section">
      <h4>数据管理</h4>
      <van-cell-group inset>
        <van-cell title="清除所有数据" is-link @click="onClear" value="" />
      </van-cell-group>
    </div>

    <div class="section">
      <van-cell-group inset>
        <van-cell title="退出登录" is-link @click="onLogout" center />
      </van-cell-group>
    </div>

    <div class="footer">
      <p>LoveDays v1.0</p>
      <p>用心记录每一天 ❤</p>
    </div>
  </div>
</template>

<script setup>
import { useDateStore } from '@/stores/dateStore'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { showConfirmDialog, showToast } from 'vant'

const store = useDateStore()
const authStore = useAuthStore()
const router = useRouter()
const themes = [
  { key: 'pink', label: '粉色', color: '#ff6b9d' },
  { key: 'purple', label: '紫色', color: '#a855f7' },
  { key: 'blue', label: '蓝色', color: '#3b82f6' }
]

function onSave() {
  store.updateCouple({ nickname1: store.couple.nickname1, nickname2: store.couple.nickname2 })
  showToast('已保存')
}

async function onClear() {
  try {
    await showConfirmDialog({ title: '确认清除所有数据？', message: '此操作不可恢复' })
    localStorage.removeItem('lovedays_data')
    location.reload()
  } catch {}
}

async function onLogout() {
  try {
    await showConfirmDialog({ title: '确认退出登录？' })
    authStore.logout()
    router.push('/login')
  } catch {}
}
</script>

<style>
.profile-page {
  min-height: 100vh;
  padding-bottom: 80px;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.section {
  margin-top: 16px;
}
.section h4 {
  padding: 0 20px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
}
.theme-box {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.theme-btn {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 16px;
  gap: 10px;
  background: #f5f5f5;
  border-radius: 12px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}
.theme-btn.active {
  font-weight: 600;
}
.theme-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}
.theme-label {
  font-size: 14px;
  color: #333;
}
.footer {
  text-align: center;
  margin-top: 40px;
  color: #ccc;
  font-size: 12px;
}
.footer p { margin: 4px 0; }
</style>
