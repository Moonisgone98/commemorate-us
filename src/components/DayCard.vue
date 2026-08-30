<template>
  <div class="day-card" :class="color">
    <div class="card-icon">{{ icon }}</div>
    <div class="card-body">
      <div class="card-title">{{ title }}</div>
      <div class="card-days">
        <span class="number">{{ displayDays }}</span>
        <span class="unit">天</span>
      </div>
      <div class="card-ym">{{ ym.years }}年{{ ym.months }}个月</div>
      <div class="card-date">{{ formatDate(date) }}</div>
      <div class="card-lunar">{{ getLunar(date) }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { daysBetween, formatDate, getLunar, getYearsMonths } from '@/utils/dateUtils'

const props = defineProps({
  title: String,
  icon: String,
  date: String,
  color: String
})

const targetDays = computed(() => daysBetween(props.date))
const displayDays = ref(0)
const ym = computed(() => getYearsMonths(props.date))

onMounted(() => {
  const target = targetDays.value
  const duration = 1200
  const step = Math.max(1, Math.floor(target / (duration / 16)))
  let current = 0
  const timer = setInterval(() => {
    current += step
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    displayDays.value = current
  }, 16)
})
</script>

<style scoped>
.day-card {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: transform 0.3s;
  animation: cardIn 0.5s ease-out backwards;
}
.day-card:active {
  transform: scale(0.97);
}
@keyframes cardIn {
  from { opacity: 0; transform: translateY(30px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.card-icon {
  font-size: 36px;
  margin-right: 16px;
  animation: iconBounce 2s ease-in-out infinite;
}
@keyframes iconBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
.card-body {
  flex: 1;
}
.card-title {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 4px;
}
.card-days {
  display: flex;
  align-items: baseline;
  gap: 4px;
}
.number {
  font-size: 42px;
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(135deg, #fff 0%, #ffe4ec 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.unit {
  font-size: 16px;
  opacity: 0.8;
}
.card-ym {
  font-size: 13px;
  opacity: 0.85;
  margin-top: 4px;
}
.card-date {
  font-size: 12px;
  opacity: 0.7;
  margin-top: 2px;
}
.card-lunar {
  font-size: 11px;
  opacity: 0.6;
  margin-top: 2px;
}
</style>
