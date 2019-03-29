---
title: Showing the alternative text while images are loading
description: 
date: 2016-01-20T07:54:22+00:00
oldUrl: https://justmarkup.com/log/2016/01/showing-the-alternative-text-while-images-are-loading/
tags:
    - note
layout: layouts/post.njk
---

Some days ago Šime Vidas tweeted: [Why don’t Chrome, Safari reserve space for `<img>` with height attribute in responsive layouts?](https://twitter.com/simevidas/status/688419465223077889) As part of the discussion and after some testing in different browsers I found that Firefox is the only browser at the moment who shows the alt attribute while images are loading. I think it would be great if every browser would show the alternative text while images are loading – especially on slow connections this would be very helpful.

Slow connections
----------------

When browsing web sites, especially on slow connections, it takes some time until all images are loaded. In addition to defining [aspect ratio for images](https://justmarkup.com/log/2015/11/definining-aspect-ratio-to-prevent-reflow/) to prevent the jump effect, it would be great if the alternative text would be shown so I could decide more easily if I think it is worth to wait for the image or move on scrolling and reading.

Improve accessibility
---------------------

I think this would also improve accessibility. If authors would see the value of the alt attribute every time they open their site they would more likely add an alternative text for every image. Adding useful alternative text is something many Authors forget and don’t check before publishing an article. Some CMS also pre-fill the alternative text with information they extract from the image, like the name of the camera. My hope is that by making the alternative text more present many authors will think about it and provide useful information for images.

Styling the alternative text
----------------------------

You can also style the alternative text with CSS. Here is an example of an invalid image where I [styled the alternative text](http://jsbin.com/qorowi/edit?html,css,output).

Feature requests
----------------

Because I really want this feature in every browser I opened requests for Chrome (Blink), IE/Edge and Safari (WebKit).

[Chrome](https://code.google.com/p/chromium/issues/detail?id=579402)  
[Internet Explorer / Edge](https://connect.microsoft.com/IE/feedbackdetail/view/2262724/show-alternative-text-while-images-are-loading)  
[WebKit](https://bugs.webkit.org/show_bug.cgi?id=153273)

Let’s see what they think.