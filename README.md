# My-Old-Projects
This repository includes models from a previous project I was involved in. 

[Live Demo](https://huabin-zhang-jcy.github.io/my-old-projects/)

## Version 1.0.0
In this version, create TTS Page. That main function is to use Chrome Web API to automatically generate audio data and play.

1.0.1

Bug1: when user reload the page, the audio is still playing, at the first time i think i can in the vue lifecycle hook `onbeforeunmount` to stop the speech, but it is not working. after i konw the reason is that **whenn the page is reloaded, the vue instance is destroyed**, so the `onbeforeunmount` hook is not called. so i add a event listener to the **window object** to stop the speech when the page is unloaded.

Bug2: during get the voices process, i set the voices data to the selecter component, but the voices may not be loaded when the page is loaded. after i know the reason is that **the voices are loaded asynchronously**, so i add an event listener to the window object to listen the voiceschanged event to update the voices data when the voices are loaded.
