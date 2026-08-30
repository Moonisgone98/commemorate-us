<template>
  <div class="app-wrapper">
    <div class="app" :class="store.settings.theme">
      <router-view />
    </div>
  </div>
  <van-tabbar v-if="showTabbar" v-model="active" route fixed placeholder>
    <van-tabbar-item icon="like" to="/">纪念日</van-tabbar-item>
    <van-tabbar-item icon="birthday-cake-o" to="/birthday">生日</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/profile">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDateStore } from '@/stores/dateStore'

const store = useDateStore()
const route = useRoute()
const active = ref(0)
const showTabbar = computed(() => !route.meta.hideTabbar)
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.app-wrapper {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background: #f5f5f5;
}
@media (max-width: 480px) {
  .app-wrapper {
    background: transparent;
  }
  .app {
    width: 100%;
  }
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
@media (min-width: 481px) {
  .app {
    max-width: 480px;
    width: 100%;
    min-height: 100vh;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);
    position: relative;
  }
  .pink, .purple, .blue {
    border-radius: 0;
  }
  .van-tabbar {
    max-width: 480px;
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>
