---
title: What we can’t test
description: 
date: 2012-03-02T17:53:22+00:00
tags:
    - article
layout: layouts/post.njk
---

We all do our best to test our sites in lots of different browsers, screen resolutions and input/output devices. But to be honest we just can’t test everything.

### Screen resolution

Unless you have the opportunity and money to sit in front of a 42″ or even bigger screen you are not able to test your design on big screens. Scaling down your browser window is easy, but increasing it over your max. resolution available is just impossible.  

### Browsers

I really don’t know how many browsers exists and how many of them are actually used but I just checked some stats and there were over 100 different browser versions listed. And as this [svg on wikipedia](http://upload.wikimedia.org/wikipedia/commons/7/74/Timeline_of_web_browsers.svg "Timeline of web browers") shows there are actually a lot more, especially as I know at least of two (Chrome for Android and Dolphin Browser) not listed there.

Who has ever tested his site in SeaMonkey (which is in some of my stats much more popular then IE6) or on [Opera TV](http://www.opera.com/business/tv/)?

With the fast release circles nowadays and as [Paul Irish](http://paulirish.com/2011/browser-market-pollution-iex-is-the-new-ie6/) said growing numbers of Browser versions this task is simple impossible. Nobody can test in 100’s of different browsers/versions and continue to test all his sites with every new browser/version coming out.

### Connection Speed

I guess you all know that at the moment of writing this, there is no way to test the connection speed the user are running on. And even if there would be a test, the only way to make users happy is to serve your page as fast as possible, as [every millisecond is important.](http://www.nytimes.com/2012/03/01/technology/impatient-web-users-flee-slow-loading-sites.html)

### External influences

Another thing you can’t test reliable is for example “light irradiation”. If you ever used your laptop while sitting outside in the sun you know what I mean. It gets really hard to read a website unless the contrast is very high. That’s just an example but many people will get pissed of, if they can’t read your great news, that’s why we always should design with high contrasts and big enough font sizes.

Another example of external influence is, that we don’t know if the user is just sitting on his couch with lots of time or if he/she is just running to a meeting while trying to read the latest gossip. Once again we can’t test all this situations.

### And many more…

You know there are many other things we can’t really test like all the input/output devices, all the different Screenreaders and so on…

That’s why we all should develop [futurefriend.ly](http://futurefriend.ly/), so we don’t have to worry that much if Microsoft is going to release “mIE5” for Android tomorrow.