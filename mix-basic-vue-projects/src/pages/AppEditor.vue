<template>
  <v-container class="app-promotion-editor">
    <v-row>
      <!-- Left: Form Panel -->
      <v-col cols="8">
        <v-card class="pa-4">
          <div class="d-flex justify-space-between align-center">
            <h2 class="">App Promotion Editor</h2>
            <v-chip color="primary" variant="flat" size="small">Live Preview →</v-chip>
          </div>

          <v-form ref="formRef" @submit.prevent>
            <v-text-field
              v-model="state.appName"
              label="App Name"
              placeholder="Enter your app name"
              maxlength="25"
              outlined
              counter
              prepend-inner-icon="mdi-application"
              width="40%"
              density="compact"
              class="mt-2"
            ></v-text-field>
            <v-textarea
              v-model="state.appDescription"
              label="Short Description"
              placeholder="One-line pitch (max 21 chars)"
              prepend-inner-icon="mdi-text"
              maxlength="30"
              counter
              outlined
              density="compact"
              rows="2"
              class="mt-2"
            ></v-textarea>
            <v-textarea
              v-model="state.appLongDescription"
              label="Full Description"
              placeholder="Describe key features and benefits"
              prepend-inner-icon="mdi-text"
              outlined
              density="compact"
              rows="5"
              class="mt-2"
            ></v-textarea>
            <v-file-input
              v-model="state.prompAppBgFile"
              label="Promotional background image"
              placeholder="Select an app icon"
              prepend-inner-icon="mdi-image"
              accept="image/*"
              density="compact"
              prepend-icon=""
              outlined
              class="mt-2"
              @update:modelValue="prompAppBgImgChanged"
            ></v-file-input>
            <v-file-input
              v-model="state.prompSlidesFile"
              label="Promotional images"
              placeholder="Select the image to promote"
              prepend-inner-icon="mdi-image"
              accept="image/*"
              density="compact"
              prepend-icon=""
              outlined
              multiple
              class="mt-2"
              @update:modelValue="prompSlidesChanged"
            ></v-file-input>
            <v-btn color="primary" class="mt-4"> Save Changes </v-btn>
          </v-form>
        </v-card>
      </v-col>

      <!-- Right: Live Preview Panel -->
      <v-col cols="4">
        <!-- Phone mockup -->
        <v-card class="pa-4" style="height: 100%">
          <h2 class="ml-2">Phone Preview</h2>
          <div class="d-flex justify-center align-center mb-10" style="height: 100%">
            <div class="phone-frame">
              <div class="phone-notch"></div>
              <div class="phone-screen" style="overflow-y: auto">
                <!-- app background img -->
                <v-img class="w-100" cover height="100px" :src="state.prompAppBgUrl || appBg" />
                <!-- app base info -->
                <v-card class="pa-3 d-flex align-center" rounded="lg" elevation="0" border>
                  <!-- 左边 App 图标 -->
                  <v-avatar size="72" rounded="lg" class="mr-3">
                    <v-img alt="App icon" cover :src="logo" />
                  </v-avatar>

                  <!-- 中间文字信息 -->
                  <div class="flex-grow-1">
                    <div class="text-subtitle-2 font-weight-bold">
                      {{ state.appName || 'App Name' }}
                    </div>
                    <div class="text-caption text-medium-emphasis">
                      {{ state.appDescription || 'Short description of the app.' }}
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <v-btn color="primary" size="small" rounded> Laden </v-btn>
                      <v-btn icon="mdi-share-variant" variant="text" size="small"></v-btn>
                    </div>
                  </div>
                </v-card>

                <!-- Promotion Cards -->
                <v-sheet class="mx-auto" max-width="100%">
                  <v-slide-group
                    v-if="state.prompSlides.length === 0"
                    v-model="state.selectedPrompAppImgIndex"
                    class="mt-3 pc-hide-arrows"
                    center-active
                  >
                    <v-slide-group-item
                      v-for="(promp, index) in state.defaultPromSlides"
                      :key="index"
                      :value="index"
                    >
                      <v-card
                        class="mx-1"
                        width="100px"
                        height="200px"
                        variant="tonal"
                        @click="state.selectedPrompAppImgIndex = index"
                      >
                        <v-img cover class="h-100" :src="promp"></v-img>
                      </v-card>
                    </v-slide-group-item>
                  </v-slide-group>
                  <v-slide-group
                    v-else
                    v-model="state.selectedPrompAppImgIndex"
                    class="mt-3 pc-hide-arrows"
                    center-active
                  >
                    <v-slide-group-item
                      v-for="(promp, index) in state.prompSlides"
                      :key="index"
                      :value="index"
                    >
                      <v-card
                        class="mx-1"
                        width="100px"
                        height="200px"
                        variant="tonal"
                        @click="state.selectedPrompAppImgIndex = index"
                      >
                        <v-img cover class="h-100" :src="promp"></v-img>
                      </v-card>
                    </v-slide-group-item>
                  </v-slide-group>
                </v-sheet>

                <v-divider class="my-2 mx-2" />

                <div class="text-caption text-medium-emphasis px-2 text-justify1">
                  {{ state.appLongDescription || 'Describe key features and benefits.' }}
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive } from 'vue'
import logo from '@/assets/icons/default-app-avatar.png'
import appBg from '@/assets/icons/default-app-bg.png'
import defaultPromSlides1 from '@/assets/icons/default-prom-slides-1.png'
import defaultPromSlides2 from '@/assets/icons/default-prom-slides-2.png'
import defaultPromSlides3 from '@/assets/icons/default-prom-slides-3.png'
import defaultPromSlides4 from '@/assets/icons/default-prom-slides-4.png'

const state = reactive({
  appName: 'Duolingo',
  appDescription: 'Lerne Sprachen spielerisch',
  appLongDescription:
    'Learn a new language with the world’s most-downloaded education app! Duolingo is the fun, free app for learning 40+ languages through quick, bite-sized lessons.',
  selectedPrompAppImgIndex: 0,
  prompAppBgFile: null,
  prompAppBgUrl: '',
  prompSlides: [],
  prompSlidesFile: [],
  defaultPromSlides: [
    defaultPromSlides1,
    defaultPromSlides2,
    defaultPromSlides3,
    defaultPromSlides4,
  ],
})

const prompAppBgImgChanged = (file) => {
  if (file) {
    state.prompAppBgUrl = URL.createObjectURL(file)
  }
}

const prompSlidesChanged = (files) => {
  if (!files) return
  let urls = []
  for (const file of files) {
    urls.push(URL.createObjectURL(file))
  }
  state.prompSlides = urls
}
</script>

<style scoped>
/* Simple phone mockup */
.phone-frame {
  width: 280px;
  height: 560px;
  border: 12px solid #111;
  border-bottom-width: 18px;
  border-top-width: 18px;
  border-radius: 36px;
  background: #000;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}
.phone-notch {
  width: 120px;
  height: 18px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  background: #111;
  margin: 0 auto;
}
.phone-screen {
  width: 100%;
  height: calc(100% - 18px);
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
}
:deep(.v-slide-group__next),
:deep(.v-slide-group__prev) {
  display: none !important;
}
.text-justify {
  text-align: justify;
}
</style>
