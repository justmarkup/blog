---
title: On browser support
description: 
date: 2016-03-22T10:17:52+00:00
tags:
    - note
layout: layouts/post.njk
---

\*Every\* time a new platform feature gets announced/implemented it doesn’t take long until people moan about not being able to use it because of the poor browser support. Shortly after people will blame browsers for not implementing the feature right away. Accompanied by complaints that the web sucks, browsers are stupid, specifications are \*\*\*\* and other useless statements. If you want a feature to be implemented in a browser – write about it, explain why you need it, prepare use cases, help finding bugs – be helpful and not another troll.

> We can’t use feature X because it is not supported in browser Y. “By too many developers”

For me, a web platform feature falls into one of these categories:

*   [Use as an enhancement](#use-as-an-enhancement)
*   [Use with fallback](#use-with-fallback)
*   [Use with polyfill](#use-with-polyfill)
*   [Wait](#wait)

Use as an enhancement
---------------------

A lot of new web platform features can be used straightaway when used as an enhancement. CSS transitions, border-radius, box-shadow, @font-face, form validation, Geolocation, Service Worker, new input types, – to name a few – can all be used as an enhancement. Where enhancement means that you don’t need any fallback or polyfill. If the feature is not available, the site still works, but may not look as fancy, or may not offer the “little helper” other users with other browser will see/get; That’s [totally fine.](http://dowebsitesneedtolookexactlythesameineverybrowser.com/)

Use with fallback
-----------------

Other features can be used with a fallback. Be it new CSS color values, SVG or Gradients.

    p {color: #111; color: hsl(236, 100%, 4%); }

Use with polyfill
-----------------

Most of ES5/ES6 can be used with a polyfill. Same for requestAnimationFrame or Drag and Drop. You should however be aware that polyfills can reduce the performance and therefore should not be used extensively.

For me, this means I rather use a fallback to make it usable and accessible for these users instead of slowing their browsers with massive use of polyfills. For example: For audio or video you could also add a polyfill, although I would recommend using it as an enhancement and provide simple links to the files as a fallback.

Wait
----

Some features get implemented by one browser before there is a \*final\* specification or a consent between browser vendors. Sometimes they are only available behind flags or only usable with prefixes. If you can/want to use it as an enhancement you may still use it, but you should be aware that the syntax will probably change in the future or that the feature will be removed after some time.

Every browser vendor has a [web platform status page](https://bugspencer.com/) nowadays where you can see how likely a browser will implement a feature. If all but one browser are very skeptical about a feature you may better wait before implementing the feature.

Bottom line
-----------

Today, I am [defining browser support](https://justmarkup.com/log/2015/07/browser-support/) for modules and not for the whole page. Just because a browser doesn’t support feature X it doesn’t mean we have to stop people from using our site.

And, yes I know there are cases where this is hard – if you build a game with WebGL and the browser doesn’t support WebGL you can’t really do anything, but you should still show the intro (what is the game about, a video/screencast about the game…) which is probably in HTML anyway and show a hint for users without WebGL so they can decide if they are willing to switch/update the browser. If you show a \*warning” before showing any content users will most probably never come back to your site.