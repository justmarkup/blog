---
title: Read out loud - Text to speech with the Web Speech API.
description: I recently added Text to speech for Writerie and here is what I learned about using the Web Speech API. 
ogImage: https://justmarkup.com/img/icons/icon-512x512.png
ogImageAlt: justmarkup
date: 2020-05-19T06:31:10+00:00
tags:
    - article
layout: layouts/post.njk
---

I recently added Text to speech for [Writerie](https://app.writerie.com "https://app.writerie.com") and here is what I learned about using the Web Speech API.

## Check for support

Before using it we have to check if the browser [supports](https://caniuse.com/#feat=speech-synthesis "https://caniuse.com/#feat=speech-synthesis") the Web Speech API. We can do this by using a feature test.

```js
if ('speechSynthesis' in window) {
    // Great, browser supports the Web Speech API - let's use it
}
```

## Voices

With that in place, we can now start using it. First, let's see how to get all available voices.
```js
window.speechSynthesis.getVoices();
```

The available voices differ quite a lot between browser and OS. On Microsoft and also on the new Edge on Mac you will get specific Microsoft voices, on all Google browsers you get Google voices and in some like the Yandex browser you will only get one native voice. For me personally the Microsoft voices sound much less robotic as others.

One thing to note here is that on Chrome you will get an empty list if you call ```getVoices()``` directly. This is because when a page is loaded, it takes some amount of time to populate the voices array as it does so, asynchronously. If you need to get the voices on page load you can work around this by calling getVoices() after a timeout of some milliseconds (50 seems safe) or by using a Promise. If you call it after a user interaction you should be fine, as at this point it should already be populated.

## Utterance

Next, let's have a look at ```SpeechSynthesisUtterance```, which represents a speech request.

```js
const utterance = new SpeechSynthesisUtterance();
const voice = window.speechSynthesis.getVoices()[0];

// Utterance properties
utterance.text = 'My text';
utterance.voice = voice;
utterance.pitch = 1;
utterance.rate = 1;
utterance.volume = 1;
```

You can define what text should be spoken, what voice should be used, and the pitch, rate and volume.

If you don't define a voice it will use the first voice in the ```getVoices()``` array. For pitch, rate and volume the default values are 1.

Text is empty by default, and can either be set via ```new SpeechSynthesisUtterance().text``` or directly by using ```new SpeechSynthesisUtterance('My text');```

Note that the maximum length of the text that can be spoken in each utterance is 32,767 characters.

## Speak, pause, resume, cancel

Now, let's see how to speak out our defined text. This can be done by calling ```.speak()``` and passing our defined utterance.

```js
window.speechSynthesis.speak(utterance);
```

The text will now be spoken with all the settings you defined for the utterance.

To pause the text use ```window.speechSynthesis.pause();``` to resume from there ```window.speechSynthesis.resume();``` and to cancel it completely use ```window.speechSynthesis.cancel();```.

## Breaks

If you pass a text it will be spoken one sentence after another. While it makes a small break after every dot, line breaks are ignored, to force a break you can however use a comma (,). Here is a simple example to replace all line breaks with a comma for a break.

```js
text = text.replace(/nn/g, ', ');
```

## Chrome bug

I initially tested in Firefox, where everything worked perfect. When I tried it in Chrome though, it always stopped after some seconds and it took me some time to realize it is a browser bug and not a bug in my code.

In [Chrome on Windows and Ubuntu](https://bugs.chromium.org/p/chromium/issues/detail?id=679437 "https://bugs.chromium.org/p/chromium/issues/detail?id=679437"), it always stops after about 15 seconds. To work around this, one have to create an interval which runs every 14 seconds and checks if it is still active.

```js
const synthesis = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance('Hello');
let isPlaying = false;

this.synthesis.speak(utterance);
isPlaying = true;

// somehow chrome stops after 14seconds, so resume from there
var synthesisInterval = setInterval(() => {
    if (!isPlaying) {
        clearInterval(synthesisInterval);
    } else {
        synthesis.resume();
    } 
}, 14000);

utterance.onend = () => {
    isPlaying = false;
}
```

## Demo

I put the code for the demo on [Github](https://github.com/justmarkup/demos/blob/gh-pages/text-to-speech/index.html "https://github.com/justmarkup/demos/blob/gh-pages/text-to-speech/index.html") and you can also directly try the [demo](https://justmarkup.com/demos/text-to-speech/ "https://justmarkup.com/demos/text-to-speech/") here.

You should also try it out in [Writerie](https://app.writerie.com "https://app.writerie.com").

## Conclusion

Text to speech is a great enhancement. People often prefer to listen instead of reading and by using the Web Speech API we can offer that with little effort.