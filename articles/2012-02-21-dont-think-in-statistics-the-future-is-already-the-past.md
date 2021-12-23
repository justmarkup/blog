---
title: Don’t think in statistics – the future is already the past.
description: 
date: 2012-02-21T12:40:40+00:00
oldUrl: https://justmarkup.com/log/2012/02/dont-think-in-statistics-the-future-is-already-the-past/
tags:
    - article
layout: layouts/post.njk
---

Let’s say you are thinking about a relaunch of your site. One of the first things you may do is checking your Analytics Data to get a feeling what Browser, OS, Screen resolutions, Plugins, … your users actually use.

After finishing your evaluation you may define which browsers you have to support definitely and on the other hand which browsers you may just ignore as they only count for ~ 1% of your visits.

### Don’t trust them

Let me explain why checking statistics is a good addition but not the ideal solution for your new project. First of all you can’t really trust your statistics, as the tracking may fail in some cases, you can’t really ensure tracking on all devices and you don’t get all data from users without JavaScript (unless you use [server-side tracking](http://code.google.com/intl/de-DE/apis/analytics/docs/mobile/mobileWebsites.html)).

Furthermore statistics only shows you the data from the time being, but you still don’t have no clue what the statistics will look like in one month, one year or the next day?. They may be already completely different at the time you are ready to relaunch your new site. This is also the point where you have to realise that statistic data are a great way to give you a feeling of what’s going on now, however they are not carved in stone, can change fast and often lies.

### Prototyping like a BOSS

So after realising that statistics data are not reliable and should be just a small part of your browser evaluation, we have to rethink the concept. So lets bring in the terms “future-friendly” and “progressive enhancement” as these are not just buzz words, but the way you should start your new project.

As the browser is (at least for me) now the new photoshop/fireworks, we should go even one step further and force ourself to build the first protoype of our webpage without using any CSS3, HTML5 and JavaScript.

I know its hard to forget for a moment about all the fancy CSS3 and the cool HTML5/JavaScript Technics but this is, in my opinion, the perfect start to ensure that your page will be usable, readable and accessible in all browser/device combination you may not even imagine they (will) exist. Developing for the future by using technics from the past may sound weird, but thinking like the old old IE6 really helps to set up your first prototype.

Don’t get me wrong, I love to use all the new technics and properties available, but you should never ever use them without a fallback solution, because there is nothing more annoying then a website not usable/readable or even completely broken in older browsers. And by starting with the “fallback” solution, as explained above, you will be absolutely sure the site works and even more important will work in whatever browser/device will come.