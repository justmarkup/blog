---
title: Every web site has to start with server-side rendered HTML – no exceptions.
description: 
date: 2016-01-07T13:22:25+00:00
oldUrl: https://justmarkup.com/log/2016/01/every-web-site-has-to-starts-with-html/
tags:
    - note
layout: layouts/post.njk
---

If I open an URL and all I get is a blank page – be it because I turned JavaScript off, use an Adblocker, use an outdated browser or anything else – the developer building the site failed – no excuses. This is the case for every type of web site/app/whateveryoucallit – be it a WebGL game, a single-page application, an article or a cat gallery.

Don’t get me wrong, you shouldn’t and often couldn’t build features without using modern web technologies relying on JavaScript, a modern browser or a fast device. However, this doesn’t stop you to start with well-structured HTML in the first place.

No content
----------

![ROME](https://justmarkup.com/log/wp-content/uploads/2016/01/ROME-1024x530.png)

When you open [ROME (3 Dreams of Black )](http://www.ro.me/), a great semi-interactive film, without JavaScript you will see a black page and nothing else. This could also happen under different circumstances – it’s not about people surfing the web without JavaScript. If you view the source of the site you won’t see any content (apart from some meta tags like Title, Description and Open Graph) – it contains of a link to a CSS file, a script linking to a JavaScript file and Google Analytics.

When viewing the site with JavaScript turned on you will see an animated background (using canvas), an image (containing also text), Links and Share Buttons (Facebook and Twitter). To render that it loads 696 KB, which results in a [Speedindex of 6568](http://www.webpagetest.org/result/160107_F5_MQ9/) and takes [7sec (on 3G)](http://www.webpagetest.org/video/compare.php?tests=160107_F5_MQ9-r:1-c:0) to show the first visible content.

The basics
----------

It’s not terrible bad, but still way to much KB and load time to show static content – the only element where JavaScript is needed is the animated background. I took the generated HTML from DevTools, changed the base href and tested the site again on [WebPagetest](http://www.webpagetest.org/video/compare.php?tests=160107_KJ_NZ6-r:1-c:0) and the full content (minus the animated background) was visible after ~4s – to be fair the web font failed to load in this test but if you would improve the HTML structure and load the CSS inline you would reach a similar result.

Apart from the animated background the site looks and works the same without using JavaScript. There is no need to render the initial content on the client-side and also no need to exclude anyone from viewing it. After the first view loads you could enter the “main” site which requires modern web technologies not everybody has. If a users browser doesn’t have all the needed features integrated you could show a notice, list what’s missing to have a perfect experience and suggest browsers the user could switch to.

Start every site you build with well-structured HTML and everybody wins.

Note: I don’t want to blame the developers of ROME here, but if you are reading this maybe you can change the site and start with server-rendered HTML. Please.