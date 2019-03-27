---
title: Audio - The preload attribute
description: 
date: 2015-08-11T12:18:46+00:00
tags:
    - article
layout: layouts/post.njk
---

I recently worked on a site where the audio element is used to provide extra information. After testing some article pages with many audio elements I noticed that browsers download the audio source without interacting with it. In some cases, this summed up to 10MB of downloaded data. Visiting such a site with a data plan can be very [expensive](http://whatdoesmysitecost.com/). After visiting [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) and reading more about the audio element I found out about the preload attribute and started testing it.  

### Preload attribute

If we look at the description defined in the [W3C specification](http://www.w3.org/TR/html5/embedded-content-0.html#attr-media-preload) we can see that there are three keywords defined for the preload attribute:

*   preload=”none”: hints that either the author thinks that the user won’t need to consult that audio or that the server wants to minimize its traffic; in others terms this hint indicates that the audio should not be cached;
*   preload=”metadata”: hints that though the author thinks that the user won’t need to consult that audio, fetching the metadata (e.g. length) is reasonable;
*   preload=”auto”: hints that the user needs have priority; in others terms this hint indicated that, if needed, the whole audio could be downloaded, even if the user is not expected to use it;
*   the empty string: which is a synonym of the auto value.

Note: I [tested](https://justmarkup.com/lab/audio/preload/) in IE9, IE10, IE11, Edge, Chrome, Firefox, Opera, Safari, iOS Safari 8, Opera Mobile and Android 5 on real devices as Device Emulation and BrowserStack both showed the wrong results for mobile browsers. I used mp3 and Ogg sources for the tests, as every browser supporting the audio element supports at least one of them. To check for differences between using mp3 or Ogg first in the source, I tested this as well.

### preload=”none”

    <audio controls preload="none">
      <source src="mp3.mp3" type="audio/mpeg">
      <source src="ogg.ogg" type="audio/ogg">
    </audio>
    

I tested with various browsers and combination of source order (ogg first, mp3 first) and no browser downloaded a file. There is however one major issue: **IE9 doesn’t show the audio player at all when using preload=”none”**. It will only show the player after a right click on the invisible audio player and a click on play.

![Audio element not visible when using preload=none in Internet Explorer 9](https://justmarkup.com/log/wp-content/uploads/2015/08/preload-none-ie9.png)

### preload=”metadata”

    <audio controls preload="metadata">
      <source src="mp3.mp3" type="audio/mpeg">
      <source src="ogg.ogg" type="audio/ogg">
    </audio>
    

Here it gets more interesting. On desktop browsers between 50kb and ~800kb of data gets downloaded from a 40MB file. Mobile browsers only download some kilobytes, only the metadata gets downloaded.

### preload=”auto”

    <audio controls preload="auto">
      <source src="mp3.mp3" type="audio/mpeg">
      <source src="ogg.ogg" type="audio/ogg">
    </audio>
    

On desktop browsers 2MB up to 40MB gets downloaded from a 40MB file. For mobile browsers it’s the same as for preload=”metadata” – only some kilobytes gets downloaded.

### No preload attribute or preload=”foo”

    <audio controls>
      <source src="mp3.mp3" type="audio/mpeg"> 
      <source src="ogg.ogg" type="audio/ogg">
    </audio>
    

According to the specification no preload attribute is a synonym for preload=”auto”. The same goes for invalid keywords like preload=”foo”. My tests shows that all browsers requests the same amount of data for preload=”foo”, no preload attribute or preload=”auto”.

### What preload attribute should I use?

Before discovering the issue with IE9 and preload=”none” I would have said preload=”none” is the best solution. No unnecessary data gets downloaded beforehand and the users can decide if they want to hear the audio and download the data. There is also another issue with preload=”none” – you won’t get the information of the audio duration before the audio gets played. You may get this information via server side but it may still be a dealbreaker from some.

As there is no way (at least none I found) to fix the issue with IE9 and preload=”none” I would go with preload=”metadata”. By doing so less data gets downloaded beforehand and you still can get all the meta information of the audio. Mobile browsers already manage this quite well by not downloading much data (regardless of the preload attribute). But, I also tested using a desktop browser connected to a mobile hotspot and there was no difference between 3G or Wifi.

Do sum it up – Don’t waste data of users, the web is already too bloated and we should respect that connections can be slow and data expensive.

### Resources

[Test page](https://justmarkup.com/lab/audio/preload/)  
[Specification](http://www.w3.org/TR/html5/embedded-content-0.html#the-audio-element)  
[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)