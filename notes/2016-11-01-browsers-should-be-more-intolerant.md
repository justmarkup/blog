---
title: Browsers should be more  intolerant and punish bad practice
description: 
date: 2016-11-01T13:51:53+00:00
oldUrl: https://justmarkup.com/log/2016/11/browsers-should-be-more-intolerant/
tags:
    - note
layout: layouts/post.njk
---

As of October 15, 2016 the average web page is about 2.5MB. The size is increasing and [increasing](http://httparchive.org/trends.php?s=All&minlabel=Oct+15+2011&maxlabel=Oct+15+2016#bytesTotal&reqTotal). Five years ago it was [830kb](http://httparchive.org/interesting.php?a=All&l=Oct%2015%202011) and I don’t want to think of how big it will be in five years from now. In the past five years browsers changed a lot, among other things they also got a lot fast. So, on hand hand browsers get faster on the other we build heavier sites; It is a cat-and-mouse game.

It’s pretty crazy when you think about it. Browsers get faster, we have new technologies (responsive images, new image formats, Service Worker, HTTP/2…) and still surfing the web often feels as slow or even slower as five years ago. The main reason is that we build sites that are bloated and not optimized.

There are many reasons why slow and inaccessible web sites are launched day by day: Time, Budget, uninformed developers, false assumptions …

And there is another reason, I think has an impact: Browsers, browsers being tolerant and letting you load a 5MB background image, browsers being tolerant and letting you listen to events on inaccessible elements. You can throw a lot of \*bad\* things at browsers and they will not complain. Instead, they will do everything they can to clean up the mess.

Security
--------

In some way browsers are already pushing developers in the right direction. [Powerful features](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins) will be has been deprecated on Insecure Origins. Furthermore, browsers started/will start to indicate/warn about insecure sites and also search engines will punish sites not using SSL by giving them a worse ranking. This is fantastic for security and privacy.

So, when browsers can convince developers/site owners to secure their sites wouldn’t it also be great if they can convince them to build faster and more accessible sites.

Warn and punish
---------------

I know it can be hard for browsers do decide what is bad and what is still okay? Is a web site loading one 2MB image bad or is that okay? What about a web site loading 50 images with 800kB? And, it will be even harder if not all browsers will agree on being more strict. You surely don’t want to be the browser where things will not work anymore because you started to be more strict and the others are not following.

Regardless the concerns, I think it would be really great if browsers would start to log errors for bad things: Huge images, accessibility issues, performance issues…

Here is an example of what this could look like in the console:

![Optimize the image https://example.com/uploads/bg.png. Images bigger than 1MB will not be loaded as of 15.10.2018. See https://goo.gl/MStTGz for more details.](https://justmarkup.com/log/wp-content/uploads/2016/11/Bildschirmfoto-vom-2016-11-01-142557.png)

This way, it will be a lot harder for developers to ignore these issues. Also, clients and site owners may then realize that not everything is possible with the time and budget they considered. That they may not build yet another useless feature, but instead focus on speed and accessibility.

After some time of warning they could put this into practise and refuse to load big images or ignore events on inaccessible elements.

Conclusion
----------

Many people do a great job and build fast and accessible sites and many people blame slow and inaccessible sites and try to educate others to do better, but I have the feeling this is not enough. For one or another reason there will always be slow and inaccessible sites.

I know it will be a huge step for browsers, but I think it is about time browsers start to be more strict and prevent this.

What do you think? Should browsers start to be more strict and intolerant?