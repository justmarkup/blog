---
title: Progressive web apps – let’s not repeat the errors from the beginning of responsive web design
description: 
date: 2016-06-07T05:51:41+00:00
oldUrl: https://justmarkup.com/log/2016/06/progressive-web-apps-lets-not-repeat-the-errors-from-the-beginning-of-responsive-web-design/
tags:
    - note
layout: layouts/post.njk
---

6 years ago, [Ethan Marcotte](https://twitter.com/beep) published the article [Responsive Web Design](http://alistapart.com/article/responsive-web-design). It was a new concept, it was exciting, we all needed to learn how to adapt responsive design for our sites, we all made a lot of mistakes by doing so and are still learning.

Now, in 2016, there is a new term – [Progressive Web Apps (PWA)](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/) – a “umbrella” term for responsive, connectivity independent, fresh, safe, discoverable, re-engageable, installable, linkable Apps/web sites with app-like interactions. Once again, we all need to learn how to integrate the concept of PWA’s, we need to find out what makes sense for our sites and we need to [discuss](https://trib.tv/2016/06/05/progressively-less-progressive/) and [exchange](https://infrequently.org/2016/06/pwa-discovery-you-aint-seen-nothin-yet/) a lot – we need to avoid the errors we made at the beginning of responsive web design.

### iphone.css

When people learned about responsive design, there were many wrong assumptions. The iPhone and early Android phones \*all\* had the same screen size (320x480px) and people thought it is a good idea to change the design based on these device-specific sizes. Some even named the css iphone.css :-(.

``` css
@media only screen 
and (min-device-width : 320px) 
and (max-device-width : 480px) 
and (orientation : portrait) { /* Styles for iPhone in portrait mode */ }
```

I never want to see that again. Device specific CSS, for i\*-only. A nightmare nobody should wake up to anymore.

### Beyond Responsive

After my first experience with responsive design, I realized that designing and programming for specific devices is a No-Go. None of my first attempts made it into a production-ready site, but many others did. Nowadays, most people use mobile-first and add a media query if the design “breaks”. Great.

If I think about responsive now, it means much more than media queries and flexible content. While working on responsive sites my awareness for accessibility, performance, content and people increased more and more. I realized that a responsive web site is useless if you forget about accessibility and performance. I prefer a fast and accessible site which doesn’t adapt the design to screen sizes over an overloaded, inaccessible, responsive web site every time.

The same goes for Service Worker, while I first thought it is only about offline, I realized it is a lot more about performance and a way to make sites more accessible and better usable.

### Be progressive – not only name it progressive

A progressive web app – being responsive, connectivity independent, fresh, safe, discoverable, re-engageable, installable, linkable Apps (basically web sites) with app-like interactions is fantastic, but there is one word in there we should never forget; Progressive.

I understand that it is hard to sell progressive enhancement, so I think naming them Progressive Web Apps is great. My hope is that many more people will make progressive web sites. That clients will say: “Can you please make our site progressive”. That progressive enhancement is not only a term anymore, but the way everybody wants their site to be.

### Progressive web apps are an opportunity

We are still at the beginning of learning about the best ways to build Progressive Web Apps. I hope it will make many more people aware of progressive enhancement. I hope that nobody makes the error again and concentrates on the device part. Responsive design changed my way of building sites, I now think a lot more about the content, a lot more about accessibility, a lot more about performance and a lot more about people. I hope building PWAs will make a lot more people aware of the “basics” of the web.

Let’s not make the same errors again. A PWA which only works for specific devices is wrong. Let’s build Progressive Web Apps where we concentrate on the progressive part and not on the app part.

### Further reading

[Progressive apps escaping tags without losing our soul](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/) by [Alex Russell](https://twitter.com/slightlylate)

[Progressively less progressive](https://trib.tv/2016/06/05/progressively-less-progressive/) by [Andrew Betts](https://twitter.com/triblondon)

[Regressive Web Apps](https://adactio.com/journal/10708) and the follow-up [Regression toward being mean](https://adactio.com/journal/10736) by [Jeremy Keith](https://twitter.com/adactio)

[Programmatic progressiveness](http://www.kryogenix.org/days/2016/06/02/programmatic-progressiveness/) by [Stuart Langridge](https://twitter.com/sil)

[The P-word](https://soledadpenades.com/2016/06/06/the-p-word/) by [Soledad Penadés](https://twitter.com/supersole)

[PWA Discovery: You Ain’t Seen Nothin Yet](https://infrequently.org/2016/06/pwa-discovery-you-aint-seen-nothin-yet/) by [Alex Russell](https://twitter.com/slightlylate)