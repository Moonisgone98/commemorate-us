import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/birthday', name: 'Birthday', component: () => import('@/views/Birthday.vue') },
  { path: '/profile', name: 'Profile', component: () => import('@/views/Profile.vue') }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
