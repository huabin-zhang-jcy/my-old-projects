<script setup></script>

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
          prepend-icon="mdi-microphone-message"
          title="Text-to-Speech (TTS)"
          value="myfiles"
          to="/"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="ma-2">
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped></style>
