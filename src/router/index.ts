import { createRouter, createWebHistory } from 'vue-router'

import RandomUser from '@/views/random-user.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'random-user',
      component: RandomUser,
    },
  ],
})

export default router
