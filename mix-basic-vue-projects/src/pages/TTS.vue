<script setup>
import { ref, reactive, computed, onMounted, onUpdated, onBeforeUnmount } from 'vue'
const callMethods = [{ text: 'Web Speech API (speechSynthesis)', value: 'webapi' }]
let selectedCallMethod = ref(callMethods[0].value)
const max = 200
const state = reactive({
  text: '',
  voiceItems: [],
  selectedVoiceIndex: 0,
  rate: 0.6,
  pitch: 1.0,
  volume: 0.7,
  istSpeaking: false,
})
const remaining = computed(() => max - state.text.length)
// stop the current speech if it is speaking
const stop = function () {
  const speechSynthesis = window.speechSynthesis
  if (speechSynthesis && speechSynthesis.speaking) {
    speechSynthesis.cancel()
  }
  state.istSpeaking = false
}
const speak = function () {
  stop() // Stop any ongoing speech before starting a new one
  if (state.text.length > max) {
    alert(`Text exceeds the maximum limit of ${max} characters.`)
    return
  }
  const speechSynthesis = window.speechSynthesis
  const utterance = new SpeechSynthesisUtterance()
  const voice = state.voiceItems[state.selectedVoiceIndex]
  if (voice) utterance.voice = voice
  utterance.text = state.text
  utterance.rate = state.rate
  utterance.pitch = state.pitch
  utterance.volume = state.volume
  utterance.onstart = () => {
    state.istSpeaking = true
  }
  utterance.onend = () => {
    state.istSpeaking = false
  }
  speechSynthesis.speak(utterance)
}
// Load Web Speech API voices
const loadWebSpeechAPI = function () {
  const targetLangs = ['en-US', 'es-ES', 'de-DE', 'zh-CN']
  const voices = window.speechSynthesis.getVoices()
  if (voices.length > 0) {
    const targetVoices = voices.filter(
      (voice) => targetLangs.includes(voice.lang) && voice.localService,
    )
    // sort the voice property default value equal true at the first item
    targetVoices.sort((a, b) => {
      if (a.default && !b.default) return -1
      if (!a.default && b.default) return 1
      return 0
    })
    // sort the voice by lang, the targetLangs order
    targetVoices.sort((a, b) => {
      const langAIndex = targetLangs.indexOf(a.lang)
      const langBIndex = targetLangs.indexOf(b.lang)
      return langAIndex - langBIndex
    })
    // set the voiceItems each item add index property
    targetVoices.forEach((voice, index) => {
      voice.index = index
    })
    state.voiceItems = targetVoices
  }
}
// avoid the voices not loaded when in local development environment automatically update page
onUpdated(() => {})

onMounted(() => {
  loadWebSpeechAPI()
  // get the voices process is asynchronous, at the first time it may be empty. when the voices are loaded, the voiceschanged enent will be triggered.
  window.speechSynthesis.addEventListener('voiceschanged', loadWebSpeechAPI)
  window.addEventListener('beforeunload', stop) // Stop speech when the page is unloaded
})

onBeforeUnmount(() => {
  // remove the event listener to avoid memory leak
  window.speechSynthesis.removeEventListener('voiceschanged', loadWebSpeechAPI)
  // in to the other page, stop the speech
  stop()
})
</script>

<template>
  <v-container class="tts-page">
    <v-card>
      <v-card-title class="text-h5">Text-to-Speech (TTS)</v-card-title>
      <v-card-subtitle class="wrap-text">
        After entering the text to be recited, set the corresponding parameters on the right to
        generate the audio you want.
      </v-card-subtitle>
      <v-card-text>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="8">
                <v-textarea
                  v-model="state.text"
                  label="Enter text to be spoken"
                  rows="10"
                  auto-grow
                  :max-rows="10"
                  :hint="`${remaining} characters left`"
                ></v-textarea>
                <div class="d-flex justify-end">
                  <v-btn :disabled="!state.istSpeaking" @click="stop" class="mr-2">Cancel</v-btn>
                  <v-btn :disabled="state.istSpeaking" color="primary" @click="speak">Speak</v-btn>
                </div>
              </v-col>
              <v-col cols="4">
                <v-select
                  v-model="selectedCallMethod"
                  :items="callMethods"
                  :item-title="(item) => item.text"
                  :item-value="(item) => item.value"
                  label="Select the generation method"
                  outlined
                  density="compact"
                ></v-select>
                <v-select
                  v-model="state.selectedVoiceIndex"
                  :items="state.voiceItems"
                  :item-title="(item) => `${item.lang} (${item.name})`"
                  item-value="index"
                  label="Select a voice"
                  outlined
                  density="compact"
                ></v-select>
                <v-slider
                  v-model="state.rate"
                  label="Rate"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  density="compact"
                  thumb-label
                ></v-slider>
                <v-slider
                  v-model="state.pitch"
                  label="Pitch"
                  min="0.0"
                  max="2.0"
                  step="0.1"
                  density="compact"
                  thumb-label
                ></v-slider>
                <v-slider
                  v-model="state.volume"
                  label="Volume"
                  min="0.0"
                  max="1.0"
                  step="0.1"
                  density="compact"
                  thumb-label
                ></v-slider>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.wrap-text {
  white-space: normal; /* allows text to wrap normally */
  word-break: break-word; /* encounter lang word or url can also break */
}
</style>
