<script setup>
import { reactive } from 'vue'
const state = reactive({
  navListItems: [
    {
      title: 'Text-to-Speech (TTS)',
      icon: 'mdi-microphone-message',
      value: 'tts',
      to: '/',
    },
    {
      title: 'App Promotion Editor',
      icon: 'mdi-shopping',
      value: 'app-editor',
      to: '/app-promotion-editor',
    },
    {
      title: 'User List Management',
      icon: 'mdi-account-multiple',
      value: 'user-list-management',
      to: '/user-list-management',
    },
  ],
})
</script>

<template>
  <v-app>
    <v-navigation-drawer theme="dark" permanent width="300">
      <v-list-item
        prepend-avatar="https://avatars.githubusercontent.com/u/225190133?v=4"
        title="My past projects portfolio"
        subtitle="huabin.zhang91@gmail.com"
      ></v-list-item>
      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item
          v-for="item in state.navListItems"
          :key="item.value"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.value"
          :to="item.to"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="ma-2">
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped></style>
