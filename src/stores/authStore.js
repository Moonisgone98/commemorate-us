import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true')

  function login(username, password) {
    if (username === 'moon' && password === '123') {
      isLoggedIn.value = true
      localStorage.setItem('isLoggedIn', 'true')
      return true
    }
    return false
  }

  function logout() {
    isLoggedIn.value = false
    localStorage.removeItem('isLoggedIn')
  }

  return { isLoggedIn, login, logout }
})
