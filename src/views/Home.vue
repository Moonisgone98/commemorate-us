<template>
  <div class="home">
    <div class="hearts-bg">
      <span v-for="i in 12" :key="i" class="heart-float" :style="heartStyle(i)">♥</span>
    </div>

    <div class="header">
      <div class="couple-display">
        <div class="avatar-wrap">
          <div class="avatar pulse"><img src="/avatars/female.svg" alt="avatar" /></div>
          <span class="name">{{ store.couple.nickname2 }}</span>
        </div>
        <div class="heart-icon">♥</div>
        <div class="avatar-wrap">
          <div class="avatar pulse"><img src="/avatars/male.svg" alt="avatar" /></div>
          <span class="name">{{ store.couple.nickname1 }}</span>
        </div>
      </div>
    </div>

    <div class="cards" v-if="hasAny">
      <DayCard
        v-for="(card, idx) in cards"
        :key="card.key"
        v-show="card.show"
        :style="{ animationDelay: idx * 0.15 + 's' }"
        :title="card.title"
        :icon="card.icon"
        :date="card.date"
        :color="card.key"
      />
    </div>

    <van-empty v-if="!hasAny" description="请前往「我的」页面设置纪念日" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDateStore } from '@/stores/dateStore'
import DayCard from '@/components/DayCard.vue'

const store = useDateStore()

const hasAny = computed(() =>
  store.anniversaries.meet || store.anniversaries.love || store.anniversaries.getCert || store.anniversaries.marry
)

const cards = computed(() => [
  { key: 'meet', title: '相识', icon: '🤝', date: store.anniversaries.meet, show: !!store.anniversaries.meet },
  { key: 'love', title: '相恋', icon: '💕', date: store.anniversaries.love, show: !!store.anniversaries.love },
  { key: 'getCert', title: '领证', icon: '📕', date: store.anniversaries.getCert, show: !!store.anniversaries.getCert },
  { key: 'marry', title: '结婚', icon: '💍', date: store.anniversaries.marry, show: !!store.anniversaries.marry }
])

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
.home {
  min-height: 100vh;
  padding: 0 16px 80px;
  overflow: hidden;
  position: relative;
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
.header {
  padding: 30px 0 20px;
  text-align: center;
  position: relative;
  z-index: 1;
}
.couple-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.avatar-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.avatar.pulse {
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
  50% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.6); }
}
.name {
  font-size: 14px;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}
.heart-icon {
  font-size: 28px;
  animation: heartbeat 1.5s ease-in-out infinite;
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.5));
}
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  15% { transform: scale(1.3); }
  30% { transform: scale(1); }
  45% { transform: scale(1.2); }
  60% { transform: scale(1); }
}
.cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
  position: relative;
  z-index: 1;
}
</style>
