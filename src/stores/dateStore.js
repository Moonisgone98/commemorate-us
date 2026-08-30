import { defineStore } from 'pinia'
import { ref } from 'vue'

const STORAGE_KEY = 'lovedays_data'
const DATA_VERSION = 3

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed._version !== DATA_VERSION) return null
    return parsed
  } catch { return null }
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, _version: DATA_VERSION }))
}

const defaults = {
  couple: { nickname1: '沈云飞', nickname2: '马嘉爽' },
  anniversaries: { meet: '2023-03-01', love: '2023-05-21', marry: '2026-06-11' },
  birthdays: [
    { id: 1, name: '沈云飞', date: '1998-07-20' },
    { id: 2, name: '马嘉爽', date: '1998-03-14' }
  ],
  settings: { theme: 'pink' }
}

export const useDateStore = defineStore('date', () => {
  const saved = load()
  const data = saved ? { ...defaults, ...saved } : { ...defaults }

  const couple = ref(data.couple)
  const anniversaries = ref(data.anniversaries)
  const birthdays = ref(data.birthdays)
  const settings = ref(data.settings)

  function persist() {
    save({ couple: couple.value, anniversaries: anniversaries.value, birthdays: birthdays.value, settings: settings.value })
  }

  function updateCouple(val) { couple.value = { ...couple.value, ...val }; persist() }
  function updateAnniversary(key, val) { anniversaries.value[key] = val; persist() }
  function addBirthday(b) { birthdays.value.push({ id: Date.now(), ...b }); persist() }
  function removeBirthday(id) { birthdays.value = birthdays.value.filter(b => b.id !== id); persist() }
  function updateBirthday(id, val) { const b = birthdays.value.find(x => x.id === id); if (b) Object.assign(b, val); persist() }
  function setTheme(t) { settings.value.theme = t; persist() }

  return { couple, anniversaries, birthdays, settings, updateCouple, updateAnniversary, addBirthday, removeBirthday, updateBirthday, setTheme }
})
