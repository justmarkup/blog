---
title: Let’s start with the basics.
description:
date: 2012-02-08T14:08:56+00:00
oldUrl: https://justmarkup.com/log/2012/02/lets-start-with-the-basics/
tags:
    - article
layout: layouts/post.njk
---

At the moment the whole world (ok maybe only we frontend people) speaks about responsive design. If we divide the opinions we come up with three approaches.

1) People who don’t care at all about responsive design and just continue coding like the years before.  
2) Frenetic elation – people trying to convince everybody to use it now.  
3) People who remark criticism about responsive design.

### IE will never be dead

Starring at your statistics with the hope old IE’s won’t appear anymore will not happen in the near future. Of course every frontend developer will have a giant party if the world of browsers would only consist of up to date browsers providing the same experience.

Waking up from the dream we have to realise that there are not only different browsers, but also different screen sizes, people using all sort of input and output devices and so on.  

### Avoid known mistakes

Lot of failures were made in the past, just think about the browser war in the 90’s were most developers either optimised for Internet Explorer or Netscape. Later on we tried to optimise for every single browser available, which was and is a pain in the ass, because it costs a lot of time, money and nerves until a page looks pixelperfect in every browser. This is just not acceptable, but more important, it’s also not to drop support for older browsers. Now, while you may think I am completely insane, saying that either option A nor option B is the way to go, let me talk about option C.

### Start with the basics

The key “feature” from option C is the solid basement. Starting with the basics of web design helps to avoid lots of problems in the next steps. The idea is to kickoff with a fundamental fluid layout, using no css3 or html5 fanciness. This will be our basic layout shown to older browsers and mobile phones. You may also define this as the fallback solution, but it’s a solid, fast, accessible (hope you haven’t forgot about this by the way) basement and can be viewed with nearly every device/browser combination available.

### Climb the mountain

Once ready with the basics, leave the base camp and move forward to “camp smartphone”. At this point we can start bringing in some lovely css3 styles. Adjust fonts, elements … for the actual screen size using media queries and after a fast look back in the base camp assuring everything is still fine down there we already reached the next step.

Now in higher atmosphere some problems seems harder to solve, think about the pain with responsive images and videos, but as we trained a lot the years before, I am sure we will find a way to solve it, a [good approach](http://adaptive-images.com/) for responsive images is for example using JavaScript to find out the screen size, and then serve the right image, always providing some fallback if user has Javascript/Cookies disabled of course.

### Enjoy the outlook

Some camps later you will finally reach the peak. Take your time, celebrate the ascent of your private peak and always think about how easily the way back is, that at the very bottom is still a solid base waiting for you and you that can always climb the mountain again using another route if you are not really happy with your current way.

### Let’s discuss

After reading this you may wonder why I mentioned the list of different approaches at the beginning. As I said there are lots of people arguing against responsive design, many mentioning the fear of additional work and expense.

But if we develop with fallback/mobile first this argument doesn’t longer has any effect, since it’s much more work to maintain css files for old browsers than just starting with one basic css file and adding shine for up to date browsers. This way it’s also a lot easier to adjust your css in the feature when even more css3 is availabe.

Happy climbing!