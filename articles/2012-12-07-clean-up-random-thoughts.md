---
title: Clean up – random thoughts
description: 
date: 2012-12-07T14:04:40+00:00
oldUrl: https://justmarkup.com/log/2012/12/clean-up-random-thoughts/
tags:
    - article
layout: layouts/post.njk
---

To be honest I never really liked my old design but at that time I just wanted to push it live, so I can start blogging and show something off. After several month of doing nothing I finally had the time to rebuild everything from scratch. This year I learned a lot about building websites, how to test, optimize and build for different devices. This site is not at all perfect and probably, like in my opinion every other page, will never be, but right now I am totally happy delivering it, as it is. If you have feedback, good or bad, I would be very pleased if you yould either [Tweet me](http://www.twitter.com/justmarkup) or write me an [Email](mailto:hallo@justmarkup.com).

Webdesign
---------

This site uses a really elementary layout and no fancy JavaScript, it’s simple and clean. If you build such a site nowadays and don’t build it responsive, you may better look for another job, seriously. Don’t get me wrong, I know that it is really hard work to get a sophisticated site using a complex layouts and tons of JavaScript responsive, but for simple sites it has to be the standard way, no the only way. And as a side note, if an user zooms your site and the design breaks, your site is not responsive, or in other words, avoid fixed units, please try to avoid it.  

Optimize
--------

On of the best giveaways of responsive design is that people more and more become aware of, that websites should not only look great, but which is in my opinion much more important, should be lightweight and accessible. So, when talking about optimization, the first thing everyone should do, is compressing all images. This is such an easy step, with tools like jpegoptim or tinypng, you can reduce the overall size, in most cases, dramatically. You may argue now, that everybody is aware of this, but it can’t be repeated too often until everybody really does it.

An even easier step is to use a proper .htaccess. I mostly go with the one from the [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate/blob/master/.htaccess) and it works like a charm. With this simple steps in place, head over to [Google Pagespeed](https://developers.google.com/speed/pagespeed/insights), if your score is above 90, well done, otherwise follow the advises until you are at this level.

Testing is fun, fun, fun
------------------------

I love testing, man I really love testing. Firing up a website on dozens of different browsers and platforms to see if your code actually works as expected, is fantastic. At the start of every project I usually define one device as “The old man standing”, a device which still has quite a big user base, but has lots of limitations according to CSS, Html and JavaScript and comes with quite a small screen (like 280 x 400 for example).

I normally test my code concurrently while coding in “The old man standing”, Firefox with responsive View enabled, one average Android and iOS phone/tablet. By checking your site all the time on different platforms, while working on it, wrong decisions can be detected right away and therefore rebuild for the better. If you go the other way and test your site only at the end of the build process you most probably end up, with a lot of time consuming debugging, with a bunch of ugly bugfixes and all together with messier code, as if you would have by testing from the first day.

Performance is the key
----------------------

Tim Kadlec wrote exactly whats in my mind since month in his article [Responsive Responsive Design](http://24ways.org/2012/responsive-responsive-design/). Your site may be the best looking site ever, but if it takes ages to load, it may also be the worst site ever. As already said above, optimization is in many ways really easy to achieve, and there is no excuse to load unoptimized content.

Random thoughts at the end
--------------------------

After one year reading, writing, learning about responsive Design I personally more and more get the feeling, that many people don’t get the idea of responsive Design. Every time I see a iphone.css I really have to force myself not flipping out and telling the developer really bad words. There are so many smart people telling us that we shouldn’t develop for devices but for content, that responsive design doesn’t work without optimization, and still there are so many “Webdevelopers”, which seems like, never heard of all this.

I often get upset when seeing “crimes”, like the iphone.css and in the future I often shouted at them and telling them “Your are doing everything wrong!!!”, but I realized that this doesn’t help anybody. Therefore I have a new tactic now, every time I see a bad developed site, I simple write them an email, addressing my concerns, pointing out errors made and most important telling them how they can fix it. So the next time you shake your head after seeing some sourcecode, write them an email and say them what they did wrong and how this can be changed, thanks.

Want to be the first hearing about new posts here, you may [follow me](http://www.twitter.com/justmarkup) or grab the [Rss feed](http://justmarkup.com/log/feed/).