import { createRouter, createWebHistory } from 'vue-router'

import TTS from '@/pages/TTS.vue'
import AppEditor from '@/pages/AppEditor.vue'
import UserListManagement from '@/pages/UserListManagement.vue'

const routes = [
  { path: '/', name: 'tts', component: TTS },
  { path: '/app-promotion-editor', name: 'app-editor', component: AppEditor },
  { path: '/user-list-management', name: 'user-list-management', component: UserListManagement },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
