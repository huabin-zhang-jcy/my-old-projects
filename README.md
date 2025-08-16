# My-Old-Projects
This repository includes models from a previous project I was involved in. 

[Live Demo](https://huabin-zhang-jcy.github.io/my-old-projects/)

## Version 1.0.0
In this version, create TTS Page. That main function is to use Chrome Web API to automatically generate audio data and play.

### 1.0.1

#### Bug1-Audio can not Stop
When user reload the page, the audio is still playing, at the first time i think i can in the vue lifecycle hook `onbeforeunmount` to stop the speech, but it is not working. Note that in the current project I am using the **Web Speech API**, which is a **native API** for background playback, so it will not stop playing immediately. If the <audio> element plays audio, this situation will not occur.

**Whenn the page is reloaded, the vue instance is destroyed**, so the `onbeforeunmount` hook is not called. so i add a event listener to the **window object** to stop the speech when the page is unloaded. 

```js
onMounted(() => {
  // ...
  window.addEventListener('beforeunload', stop) 
})
```

When the page is mounted, the `beforeunload` event of the window is registered. When the page is refreshed, the **window object** will listen and execute the stop playback operation.

#### Bug2 Voices get Null
During get the voices process, i set the voices data to the selecter component, but the voices may not be loaded when the page is loaded. after i know the reason is that **the voices are loaded asynchronously**, so i add an event listener to the window object to listen the voiceschanged event to update the voices data when the voices are loaded.

```js
onMounted(() => {
  loadWebSpeechAPI()
  // get the voices process is asynchronous, at the first time it may be empty. when the voices are loaded, the voiceschanged enent will be triggered.
  window.speechSynthesis.addEventListener('voiceschanged', loadWebSpeechAPI)
})
```

When page onmounted, loads the voices, and register `voiceschanged` Event, in order to update voices once voices load state changed.
