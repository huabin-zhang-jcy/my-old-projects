import { createRouter, createWebHistory } from 'vue-router'

import TTS from '@/pages/TTS.vue'

const routes = [{ path: '/', name: 'tts', component: TTS }]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
