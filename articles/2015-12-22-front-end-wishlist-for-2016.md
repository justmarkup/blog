---
title: Front-end wishlist for 2016
description: 
date: 2015-12-22T07:59:18+00:00
tags:
    - article
layout: layouts/post.njk
---

The end of the year is around the corner and it’s time to look into the future of Front-end. In this post I will talk about my wishes for 2016 and why I would love to see these three features implemented.

### Container queries

[Jonathan Snook](http://snook.ca/) wrote a great article called [Being responsive to the small things](https://24ways.org/2015/being-responsive-to-the-small-things/) for this year’s 24ways advent calendar about the current state of container queries and JavaScript-based solutions to use them today. Container queries, also known as [element queries](http://www.xanthir.com/b4PR0) comes with a lot of challenges for specification editors, browser vendors and everybody involved in adding new browser features, but it looks like it will be [possible](http://www.xanthir.com/b4VG0) to implement them. While I know it’s challenging to implement it I am optimistic 2016 will be the year where container queries will make it to a browser near you. So, why do I want to use container queries, isn’t media queries enough?

We’re not designing pages, we’re designing systems of components. – Stephen Hay

With media queries for every container our component lives in, we need to specify how to rearrange things in that context. By using container queries we can specify CSS for a component based on the dimensions of the container. This means your components are not dependent on the screen size, but on the container; Fantastic.

### Service Worker ships in Safari and Edge

I am really excited about Service Worker (probably not as excited as [Jake Archibald](https://twitter.com/jaffathecake), but still) and can’t wait until Safari and Microsoft Edge will implement Service Worker. I am pretty sure it will come to Edge in 2016, although they still have it listed as [Under Consideration](https://dev.windows.com/en-us/microsoft-edge/platform/status/serviceworker) at the moment. You should [vote](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6263630-service-worker) for it.

To be honest, I am not so enthusiastic about Safari – Service Worker is on the [5-year plan](http://trac.webkit.org/wiki/FiveYearPlanFall2015) of WebKit – but even if it will ship to WebKit next year it doesn’t mean it will be shipped in Safari.

Nevertheless, why I really like Service Worker is that it plays along nicely with progressive enhancement, offers not only an offline experience – but improves performance and all the [other](http://deanhume.com/home/blogpost/service-workers--dynamic-responsive-images-using-webp-images/10132) [exciting](https://developers.google.com/web/updates/2015/12/background-sync?hl=en) [things](https://developers.google.com/web/updates/2015/03/push-notifications-on-the-open-web?hl=en) you can use it for.

If you want to see Service Worker in every major browser next year the best is to make a lot of noise about it, by using Service Worker today in as many sites as possible and by writing about it again and again.

### Parent and previous sibling selector

[Parent selectors](https://css-tricks.com/parent-selectors-in-css/) and [previous sibling selector](https://lists.w3.org/Archives/Public/www-style/2009Jul/0041.html) have been on the wish list of Front-end developers for years. The main points they are not implemented yet is that they are too expensive to implement and that they are pretty inefficient.

While this may still be the case I think now is the time to implement them as an experimental feature and see what developers will make of it and how inefficient it really is. If the performance is not acceptable either some clever browser developers can change that or it will be removed again. If it turns of to be more efficient than expected it can be shipped without using an experimental flag; This would make many [developers](https://remysharp.com/2010/10/11/css-parent-selector) very happy.

### What features do you want to see in browsers in 2016?

What HTML, CSS or JavaScript features do you want to see shipped in 2016? Whatever it is, the best way to get a feature implemented is to make noise; Write about it, tell everyone why you need the feature, write about it again.