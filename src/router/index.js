import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/login', name: 'Login', component: () => import('@/views/Login.vue'), meta: { hideTabbar: true } },
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/birthday', name: 'Birthday', component: () => import('@/views/Birthday.vue') },
  { path: '/profile', name: 'Profile', component: () => import('@/views/Profile.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  if (to.name !== 'Login' && !isLoggedIn) {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && isLoggedIn) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
