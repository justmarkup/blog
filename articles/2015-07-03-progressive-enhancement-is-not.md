---
title: Progressive enhancement is not…
description: 
date: 2015-07-03T10:50:33+00:00
oldUrl: https://justmarkup.com/log/2015/07/progressive-enhancement-is-not/
tags:
    - article
layout: layouts/post.njk
---

… an add-on.  
… adding a fallback for every feature you want to use.  
… about thinking in browser versions.  
… about making it work without JavaScript.  
… the answer to the universe life and everything – that’s 42.  
…

I couldn’t attend [EdgeConf](https://edgeconf.com/2015-london) last weekend as I was on holiday but reading through my twitter stream it looks like there was a lot of great discussions about [Progressive Enhancement](https://decadecity.net/blog/2015/06/27/edge-conf-progressive-enhancement) – [Baseline](https://adactio.com/journal/9206), [Assumptions](https://remysharp.com/2015/07/02/assumptions), [Unpredictability](http://timkadlec.com/2015/06/thriving-in-unpredictability/), [Availability](http://www.kryogenix.org/days/2015/06/28/availability/).

I, for myself, like to define Progressive Enhancement as use-case oriented programming™.

What does that mean? Let’s start with a sample used by many sites – showing a video. For me, this means first of all I would add plain old HTML with the transcript of the video making it accessible to as many people as possible – that’s our baseline. Next, I would a link in HTML to the video source (preferable different formats/qualities if you have them), so every device, browser, whatever able to render HTML will show the link and give the user the possibility to download it. Next I would add the [download attribute](http://justmarkup.com/log/2015/01/13/the-download-attribute/) to the link so browsers supporting this attribute will directly open the “Save as…” dialog on click. As the next step, I would then add the HTML video element, with sources to all available formats I have for the video, so users surfing with a newer browser will be able to watch the video right away. As a final step, I could add some JavaScript (only loaded if the browser [Cuts the mustard](https://justmarkup.com/log/2015/02/26/cut-the-mustard-revisited/) for the features I want to use), to enhance the player functionality.

Note, that I don’t add any fallback (Flash, Silverlight…) here as this would mean loading Polyfills or most likely using a library which adds a fallback for flash for older browsers. There is absolutely no need here for spending time in development to fully support all the browsers with a video player. We already have a “fallback”, it’s just not a fallback it’s our baseline – a transcript of the video in HTML. Do web sites need to look the same in every browser – [NO](http://dowebsitesneedtolookexactlythesameineverybrowser.com/). Do web sites need to have the same non-core functionalities in every browser – NO.

This is Progressive Enhancement for me, start with thinking about the use-case – in this example, “User should be able to consume the content of the video”. If this baseline is in place you can enhance to whatever level you think is right.

I would like to know your opinion, let’s talk [@justmarkup](https://twitter.com/justmarkup).