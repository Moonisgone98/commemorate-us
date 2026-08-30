<template>
  <div class="birthday-page">

    <div class="list" v-if="store.birthdays.length">
      <div v-for="b in sortedList" :key="b.id" class="birthday-card">
        <div class="b-left">
          <div class="b-name">{{ b.name }}</div>
          <div class="b-info">{{ formatDate(b.date) }} · {{ getAge(b.date) }}岁</div>
          <div class="b-lunar">{{ getLunar(b.date) }}</div>
        </div>
        <div class="b-right">
          <div class="b-days">{{ daysUntilBirthday(b.date) }}<span class="b-label">天后生日</span></div>
          <div class="b-md">({{ getMonthsDaysUntil(b.date).months }}个月{{ getMonthsDaysUntil(b.date).days }}天)</div>
        </div>
        <van-icon name="delete-o" class="b-delete" @click="onDelete(b.id)" />
      </div>
    </div>

    <van-empty v-if="!store.birthdays.length && !adding" description="还没有添加生日" />

    <div v-if="adding" class="add-panel fade-in">
      <h3>添加生日</h3>
      <van-field v-model="newName" label="姓名" placeholder="请输入姓名" />
      <van-field v-model="newDate" label="生日" placeholder="格式：1998-05-20" />
      <div class="btn-group">
        <van-button type="primary" block round @click="onAdd" :disabled="!newName || !newDate">添加</van-button>
        <van-button round block @click="adding = false" style="margin-top: 10px">取消</van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDateStore } from '@/stores/dateStore'
import { formatDate, daysUntilBirthday, getAge, getLunar, getMonthsDaysUntil } from '@/utils/dateUtils'
import { showConfirmDialog, showToast } from 'vant'

const store = useDateStore()
const adding = ref(false)
const newName = ref('')
const newDate = ref('')

const sortedList = computed(() =>
  [...store.birthdays].sort((a, b) => daysUntilBirthday(a.date) - daysUntilBirthday(b.date))
)

function onAdd() {
  store.addBirthday({ name: newName.value, date: newDate.value })
  newName.value = ''
  newDate.value = ''
  adding.value = false
  showToast('添加成功')
}

async function onDelete(id) {
  try {
    await showConfirmDialog({ title: '确认删除？' })
    store.removeBirthday(id)
  } catch {}
}
</script>

<style scoped>
.birthday-page {
  min-height: 100vh;
  padding-bottom: 80px;
  color: #333;
}
.list {
  padding: 12px 16px;
}
.birthday-card {
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  position: relative;
  color: #333;
}
.b-left { flex: 1; }
.b-name { font-size: 16px; font-weight: 600; color: #333; }
.b-info { font-size: 12px; color: #999; margin-top: 4px; }
.b-lunar { font-size: 11px; color: #bbb; margin-top: 2px; }
.b-right { text-align: center; margin-right: 24px; }
.b-days { font-size: 28px; font-weight: 700; color: #ff6b9d; display: flex; align-items: baseline; gap: 2px; }
.b-label { font-size: 11px; color: #999; font-weight: 400; }
.b-md { font-size: 12px; color: #999; margin-top: 2px; }
.b-delete { position: absolute; right: 12px; top: 12px; font-size: 18px; color: #ccc; }
.add-panel {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  margin: 12px 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.add-panel h3 { text-align: center; margin-bottom: 16px; font-size: 18px; color: #333; }
.btn-group { margin-top: 16px; padding: 0 16px; }
.fab {
  position: fixed;
  right: 20px;
  bottom: 80px;
  width: 52px;
  height: 52px;
  z-index: 100;
}
</style>
