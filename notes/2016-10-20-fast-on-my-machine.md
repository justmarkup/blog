---
title: Fast on my machine
description: 
date: 2016-10-20T09:07:57+00:00
tags:
    - note
layout: layouts/post.njk
---

Yesterday at Polymer Summit, [Alex Russell](https://twitter.com/slightlylate) gave a fantastic [talk about adapting to the Mobile Web](https://www.youtube.com/watch?v=K1SFnrf4jZo); You should watch it!

> “You need to be interactive in about 3 seconds, on 3G, on a $200 phone. Then, in less than 1 second on next visit”

He talked about that we are not succeeding on the mobile web at the moment mostly because our sites are too slow. After watching the video I thought a lot about the past, present and future of the web.

Let’s have a look at the last couple of years in web development.

Responsive Design
-----------------

in 2010, [Ethan Marcotte](https://twitter.com/beep) wrote about [Responsive Web Design](http://alistapart.com/article/responsive-web-design). We were \*all\* excited about it, but also a little bit afraid because we realized that there is more than “Desktop”. We realized that we have to adapt to lots of different situations – browser, screen sizes, input…

More importantly, we realized that [websites doesn’t need to look the same in every browser](http://dowebsitesneedtolookexactlythesameineverybrowser.com/) and most importantly, many also thought a lot more about accessibility. We wrongly assumed that \*all\* users use a keyboard and a mouse. After realizing that, we not only made our sites better usable for touch devices, but also for all other including keyboard and screen readers. As a really nice side-effect, we improved the accessibility of our sites.

In short, Responsive Design brought us better usability and accessibility. Great!

Mobile First – Content First
----------------------------

In 2009, [Luke Wroblewski](https://twitter.com/lukew) talked about [Mobile First](http://www.lukew.com/ff/entry.asp?933). The core part of Mobile First is that we should focus only on the most important data and actions.

We realized that we should focus on the core part of our site. We realized that we should not bloat our sites with unnecessary content and actions they don’t care about.

In short, Mobile First brought us better content. Great!

Progressive Web Apps
--------------------

In 2015, [Alex Russell](https://twitter.com/slightlylate) wrote about a new concept, called [Progressive Web Apps](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/).

A Progressive Web App should be Responsive, Connectivity independent, Fresh, Safe, Discoverable, Re-engageable, Installable, Linkable and should have App-like-interactions. As you can see, Performance, is not part of the definition, but many techniques behind it will improve the performance of your site.

Some days ago, [Jason Grigsby](https://twitter.com/grigs) wrote about why [The Washington Post’s Progressive Web App increased engagement on iOS?](https://cloudfour.com/thinks/why-does-the-washington-posts-progressive-web-app-increase-engagement-on-ios/). The short answer is, the Progressive Web App is much faster than the old mobile site. I wouldn’t say that transforming your site into a Progressive Web App automatically makes it faster, but I think many will realize that the performance of their current site is bad and that they should improve it.

In short, Progressive Web Apps brings us better performance. I hope so.

Conclusion
----------

We are consistently improving and we often have to realize that our assumptions are wrong. The history showed that new approaches often came with positive side-effects. They brought us better accessibility, better content and now hopefully also better performance.

If you want an interactive site in 3 seconds on 3G on an average phone on first visit you probably have to rethink, you have to realize that the phone and computer you own are not representative. We have to realize that most people use \*slow\* devices on \*slow\* connections. While we realized that “works on my machine” was wrong, we also have to realize that “fast on my machine” is wrong as well.

We can argue about progressive enhancement forever or we can realize that many parts (server-side rendering on first visit, using appropriate HTML…) give us also the benefit of being fast.

PS: I tried to find the earliest mentions of the different concepts, but may have missed something, so please let me know if it is not correct. Thanks!