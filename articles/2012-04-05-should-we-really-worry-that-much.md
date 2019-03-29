---
title: Should we really worry that much.
description: 
date: 2012-04-05T13:58:42+00:00
oldUrl: https://justmarkup.com/log/2012/04/should-we-really-worry-that-much/
tags:
    - article
layout: layouts/post.njk
---

As soon as the new Ipad was released, many people started thinking about the best way to serve high-resolution images to it.

Apple itself implemented this [technique](http://blog.cloudfour.com/how-apple-com-will-serve-retina-images-to-new-ipads/), which has not been thought through, mainly because of the increased total size. When surfing apple.com with your shiny new Ipad you have to download 2.13MB instead of 502.90K, or in other words 4x the size. This may be fine if you are using WIFI or LTE (which is not usable at all in many countries), but not for people surfing on low bandwidth.  

### Speed me up

So is it really worth to worry about serving high-resolution images until we can reliable get the connections details. I definitely say no, just think about the following case.

” Someone surfs apple.com with the new Ipad, but has to rely on EDGE. It will take up to 10 seconds just to download the images. I guess lots of people will already cancel way before the 10 seconds, and before even seeing a glimpse of your high-resolution images. ”

And this will not just happen to 1% of your Ipad users, but probably for many, many more. While travelling through Germany, you see many people surfing on their Ipad, and if you count in the low bandwidth they are relying on, it gets clear why speed should be one of your highest priorities in all your web projects.

### Is there a solution

In my opinion Apple has failed in this case. What they did, can be compared to shipping a new “resolutinary” television screen, without thinking about that their will be no films available at this point, which can take advantage of the new screen. What I want to say is, they should have spend time in developing a bandwidth detection API way before the new Ipad was released.

Let’s say they were clever and presented a reliable solution, integrated in mobile safari 6-8 month before the release. This would have been a huge effect. I am pretty sure, if the solution would have been acceptable and usable for developers and browser manufacturer, Google, Firefox, Opera and even Windows (the know they will ship tablets with windows 8 and a high resolution display later this year) would have implemented (or at least would do now) a bandwidth detection API in their browsers. At some point it would have been a de facto “standard”, so W3C would even have standardised the API.

I don’t want to blame Apple, but it really annoys me, that we as developers now have to think about a way to serve high-resolution images to people surfing on low bandwidth, which is just not possible.

So please [stop solving problems you don’t yet have](http://www.rachelandrew.co.uk/archives/2012/03/21/stop-solving-problems-you-dont-yet-have/) and enjoy easter.