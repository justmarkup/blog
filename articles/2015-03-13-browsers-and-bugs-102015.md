---
title: Browsers and Bugs 10/2015
description: 
date: 2015-03-13T14:19:56+00:00
oldUrl: https://justmarkup.com/log/2015/03/browsers-and-bugs-102015/
tags:
    - article
layout: layouts/post.njk
---

It’s Friday and thus time for a new issue of Browsers and Bugs. Hello and Welcome to number 10. Happy debugging!

Browsers, Bugs and Workarounds
------------------------------

### [Chrome 42 Beta](http://blog.chromium.org/2015/03/chrome-42-beta-push-notifications_12.html)

Among other new features and bugfixes it ships with [Push Notifications](http://updates.html5rocks.com/2015/03/push-notificatons-on-the-open-web) and an enhanced [Add to homescreen](http://updates.html5rocks.com/2015/03/increasing-engagement-with-app-install-banners-in-chrome-for-android) function.

### [Opera 28](https://dev.opera.com/blog/opera-28/)

What’s new in Opera 28 (based on Chromium 41) for Mac, Windows, Linux and Android.

### [Break Up Width IE8](http://breakupwithie8.com/)

IE8 is already 6 years old and I agree that it’s time to stop supporting it.

### [Null-check the responsive selector in images](https://bugzilla.mozilla.org/show_bug.cgi?id=1141260)

This crashed some sites using img srcset. Aleady fixed in Firefox 38.

Debugging, Testing and more
---------------------------

### [Dev Consoles Considered Harmful (…for learning) by Kyle Simpson](http://blog.getify.com/dev-consoles-considered-harmful/)

The dev console in browsers is great, but it’s particularly harmful to the purposes of accurately learning JS. We need a new real-JavaScript-REPL tool, and it needs to land in a browser soon.

### [Animation Timeline \[Video\]](https://www.youtube.com/watch?v=U9xfYbKxosI)

Will be available soon in Chrome DevTools.

### [Firefox DevTools](https://twitter.com/patrickbrosset/status/576027485684539393/photo/1)

Developers can now inspect/debug any Firefox Popup.

### Chrome Devtools Experiments

To try out the experiments open chrome://flags -> Enable Developer Tools experiments and click “Relaunch Now” at the bottom. After restart, open Devtools, go to settings and have a look at the Experiments Tab. If you want to see all experiments, press Shift 6 times (yes 6, not 7 to activate Developer Options on Android :-)) while the experiments tab is open.

### [DOMListener](https://chrome.google.com/webstore/detail/domlistener/jlfdgnlpibogjanomigieemaembjeolj)

A Chrome DevTools Extension to monitor, browse and filter all DOM changes.