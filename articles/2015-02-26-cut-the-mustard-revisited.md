---
title: Cut the mustard revisited
description: 
date: 2015-02-26T10:49:02+00:00
oldUrl: https://justmarkup.com/log/2015/02/cut-the-mustard-revisited/
tags:
    - article
layout: layouts/post.njk
---

Cutting the mustard is a term coined by the BBC team ([post](http://responsivenews.co.uk/post/18948466399/cutting-the-mustard)) to group browsers into »modern« browsers and »old« browsers. This is not done by sniffing the User Agent but by using [Browser Feature Detection](https://developer.mozilla.org/en-US/docs/Browser_Feature_Detection). Here is the JavaScript that decides whether the browser is modern or old.

``` js
if('querySelector' in document && 'localStorage' in window && 'addEventListener' in window) {
     // Modern browser. Let's add JavaScript functionality
}
```

With this in place, we have two groups of browsers, modern (IE9+, Fx, Safari, Opera, Chrome, iOS, Android 2.1+, …) and old (IE8-, Blackberry, …). I used the same check in the last years. I don’t have to care about JavaScript implementation and errors in old browsers as I only serve JavaScript to modern browsers and I know which JavaScript features I can use safely. It works out great most of the time.

However, this morning I saw a [tweet from Jake Archibald](https://twitter.com/jaffathecake/status/570872103227953153) which made me think about my current CTM check.

> if (!('visibilityState' in document)) return; A nice way to prevent your JS running in IE<10 and Android WebKit [http://t.co/yjbUnyaobV](http://t.co/yjbUnyaobV)
> 
> — Jake Archibald (@jaffathecake) [February 26, 2015](https://twitter.com/jaffathecake/status/570872103227953153)

Looking at the browser support of [Page Visibility](http://caniuse.com/#feat=pagevisibility) and some statistics in recent projects I can say that only adding JavaScript for this group of browsers makes more sense nowadays than the old check. Android-4, IE9, and others lack support for many features we want and can use today and if you start a project now the percentage of users using such a browser will be even lower than they are already.

While the check mentioned by Jake is great, I immediately thought about extending it and adding a check for ServiceWorker to improve performance for browsers supporting it and for adding offline support. So here is my new check I will use in most of my projects from now on:

``` js
if ('visibilityState' in document) { 
    // Modern browser. Let's load JavaScript
    if ('serviceWorker' in navigator) {
        // Let's add offline support
        navigator.serviceWorker.register('sw.js', {
            scope: './'
        });
    }
}
```

If you are unfamiliar with ServiceWorker, I recommend this [interactive introduction](https://github.com/jakearchibald/simple-serviceworker-tutorial) and if you are searching for a way to generate service worker code, I can recommend this [node module](https://github.com/jeffposnick/sw-precache) that will precache specific resources.

### Conclusion

So, can or should I also use this CTM check? Often, well probably most of the time, it depends! It depends on your audience (study your statistics), it depends on the functionality used on your website or application – it depends on many things. However, using Cut the Mustard (in this way or another) is a perfect example of Progressive Enhancement. Web sites doesn’t need to look exactly the same in [every browser](http://dowebsitesneedtolookexactlythesameineverybrowser.com/) and old browsers don’t need all the functionality modern browsers offer as long as the same content is available for all. Don’t bloat old browsers with tons of polyfills to get modern JavaScript features working there and make your life as a web developer unnecessary hard by trying to learn an old car flying.

[Follow me on twitter](https://twitter.com/justmarkup)

[Share via Twitter](https://twitter.com/intent/tweet?text=Cut the mustard revisited%20https://justmarkup.com/log/2015/02/cut-the-mustard-revisited/)