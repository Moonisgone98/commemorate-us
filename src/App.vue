<template>
  <div class="app" :class="store.settings.theme">
    <router-view />
  </div>
  <van-tabbar v-model="active" route fixed placeholder>
    <van-tabbar-item icon="like" to="/">纪念日</van-tabbar-item>
    <van-tabbar-item icon="birthday-cake-o" to="/birthday">生日</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/profile">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref } from 'vue'
import { useDateStore } from '@/stores/dateStore'

const store = useDateStore()
const active = ref(0)
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.pink {
  background: linear-gradient(135deg, #ff6b9d 0%, #ff8a80 50%, #ff6b9d 100%);
  color: #fff;
  min-height: 100vh;
}
.purple {
  background: linear-gradient(135deg, #a855f7 0%, #9333ea 50%, #7c3aed 100%);
  color: #fff;
  min-height: 100vh;
}
.blue {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%);
  color: #fff;
  min-height: 100vh;
}
</style>
