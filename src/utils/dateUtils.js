const Gan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const Zhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
const Animals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
const MonthCN = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊']
const DayCN1 = ['初', '初', '初', '初', '初', '初', '初', '初', '初', '初', '十', '十', '十', '十', '十', '十', '十', '十', '十', '二', '廿', '廿', '廿', '廿', '廿', '廿', '廿', '廿', '廿', '三', '三']
const DayCN2 = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

const lunarInfo = [
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0,
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
  0x14b63
]

function lYearDays(y) {
  let i, sum = 348
  for (i = 0x8000; i > 0x8; i >>= 1) {
    sum += (lunarInfo[y - 1900] & i) ? 1 : 0
  }
  return sum + leapDays(y)
}

function leapMonth(y) {
  return lunarInfo[y - 1900] & 0xf
}

function leapDays(y) {
  if (leapMonth(y)) {
    return (lunarInfo[y - 1900] & 0x10000) ? 30 : 29
  }
  return 0
}

function monthDays(y, m) {
  return (lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29
}

function solarToLunar(sy, sm, sd) {
  const baseDate = new Date(1900, 0, 31)
  const objDate = new Date(sy, sm - 1, sd)
  let offset = Math.floor((objDate - baseDate) / 86400000)
  let temp = 0
  let lunarYear

  for (lunarYear = 1900; lunarYear < 2101 && offset > 0; lunarYear++) {
    temp = lYearDays(lunarYear)
    offset -= temp
  }
  if (offset < 0) {
    offset += temp
    lunarYear--
  }

  const leap = leapMonth(lunarYear)
  let isLeap = false
  let lunarMonth

  for (lunarMonth = 1; lunarMonth < 13 && offset > 0; lunarMonth++) {
    if (leap > 0 && lunarMonth === (leap + 1) && !isLeap) {
      --lunarMonth
      isLeap = true
      temp = leapDays(lunarYear)
    } else {
      temp = monthDays(lunarYear, lunarMonth)
    }
    if (isLeap && lunarMonth === (leap + 1)) {
      isLeap = false
    }
    offset -= temp
  }

  if (offset === 0 && leap > 0 && lunarMonth === leap + 1) {
    if (isLeap) {
      isLeap = false
    } else {
      isLeap = true
      --lunarMonth
    }
  }

  if (offset < 0) {
    offset += temp
    --lunarMonth
  }

  const lunarDay = offset + 1
  const ganIdx = (lunarYear - 4) % 60
  const zhiIdx = (lunarYear - 4) % 12
  const ganZhi = Gan[ganIdx] + Zhi[zhiIdx]
  const animal = Animals[zhiIdx]
  const monthStr = (isLeap ? '闰' : '') + MonthCN[lunarMonth - 1] + '月'
  const dayStr = DayCN1[lunarDay] + DayCN2[lunarDay]

  return {
    year: lunarYear,
    month: lunarMonth,
    day: lunarDay,
    ganZhi: ganZhi + '年',
    animal: animal,
    monthStr: monthStr,
    dayStr: dayStr,
    text: `农历${monthStr}${dayStr}`
  }
}

export function getLunar(dateStr) {
  const d = new Date(dateStr)
  const lunar = solarToLunar(d.getFullYear(), d.getMonth() + 1, d.getDate())
  return lunar.text
}

export function getLunarFull(dateStr) {
  const d = new Date(dateStr)
  const lunar = solarToLunar(d.getFullYear(), d.getMonth() + 1, d.getDate())
  return `${lunar.ganZhi} ${lunar.animal}年 ${lunar.monthStr}${lunar.dayStr}`
}

export function daysBetween(dateStr) {
  const start = new Date(dateStr)
  const now = new Date()
  start.setHours(0, 0, 0, 0)
  now.setHours(0, 0, 0, 0)
  return Math.floor((now - start) / (1000 * 60 * 60 * 24))
}

export function daysUntilBirthday(birthDateStr) {
  const birth = new Date(birthDateStr)
  const now = new Date()
  const thisYear = now.getFullYear()
  let next = new Date(thisYear, birth.getMonth(), birth.getDate())
  next.setHours(0, 0, 0, 0)
  now.setHours(0, 0, 0, 0)
  if (next < now) {
    next = new Date(thisYear + 1, birth.getMonth(), birth.getDate())
  }
  return Math.floor((next - now) / (1000 * 60 * 60 * 24))
}

export function formatDate(dateStr) {
  if (!dateStr) return '未设置'
  const d = new Date(dateStr)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

export function getAge(birthDateStr) {
  const birth = new Date(birthDateStr)
  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  const m = now.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    age--
  }
  return age
}

export function getYearsMonths(dateStr) {
  const start = new Date(dateStr)
  const now = new Date()
  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  if (months < 0) {
    years--
    months += 12
  }
  if (now.getDate() < start.getDate()) {
    months--
    if (months < 0) {
      years--
      months += 12
    }
  }
  return { years, months }
}

export function getMonthsDaysUntil(birthDateStr) {
  const birth = new Date(birthDateStr)
  const now = new Date()
  const thisYear = now.getFullYear()
  let next = new Date(thisYear, birth.getMonth(), birth.getDate())
  if (next < now) {
    next = new Date(thisYear + 1, birth.getMonth(), birth.getDate())
  }
  let months = (next.getFullYear() - now.getFullYear()) * 12 + (next.getMonth() - now.getMonth())
  let days = next.getDate() - now.getDate()
  if (days < 0) {
    months--
    const prevMonth = new Date(next.getFullYear(), next.getMonth(), 0)
    days += prevMonth.getDate()
  }
  return { months, days }
}
