---
title: My reply to ” Progressive enhancement isn’t dead, but it smells funny” by Nolan Lawson
description: 
date: 2016-10-13T17:41:39+00:00
tags:
    - note
layout: layouts/post.njk
---

Here is the [post](https://nolanlawson.com/2016/10/13/progressive-enhancement-isnt-dead-but-it-smells-funny/), you should read first before reading my thoughts,

This is a cross-post, the content I wrote down here is the same as in the [original comment](https://nolanlawson.com/2016/10/13/progressive-enhancement-isnt-dead-but-it-smells-funny/#comment-84645) I left on his site.

First of all, thanks for writing down your thoughts. While I agree with some points I also can’t really agree with some.

> (Spoiler alert: many top websites do not bother to make their core functionality work without JavaScript.)

Yes, many top websites only work with JavaScript, which I don’t think is a practise we should all follow. At least not, if we define JavaScript as client-side JavaScript and don’t involve sever-side JavaScript. Many big sites are also not optimized, eg https://twitter.com/molily/status/783767319470374916 and, I think you agree here, that we shouldn’t build our sites by following that.

> As Jake Archibald pointed out, it’s not really about users who have disabled JavaScript, so who exactly are we helping when we make our websites work without it?

Everyone who uses an ad blocker, which may prevent your JavaScript from running, everyone on a poor connection where the JavaScript takes to long on the first load and many more. It is not about “no JavaScript”, it is about, what happens when the JavaScript doesn’t work for the user.

> Offline-first is a form of progressive enhancement that directly targets the baseline experience that a high-quality progressive web app ought to support, rather than focusing on the more reductionist mindset of “first HTML, then CSS, then JavaScript.”

I am all for offline-first (although I don’t really like the term, as it is only true for second visit) but this doesn’t mean we shouldn’t focus on the the core principles of PE anymore. I really like Service Worker for example, one of the reasons why I really like it is that this is a perfect example of PE for me. If a browser supports Service Worker you get a performance boost if done right, if the browser doesn’t support it they will get the same experience as before. Nobody harmed, but some (many more in the future) get an enhanced experience.

> My question to Jeremy, however, is: why? Why is it considered an unqualified good to make a website that works without JavaScript? Is it possible that this mindset – “start with HTML, add CSS, sprinkle on JavaScript” – is only a best practice in a world of incapable browsers (such as IE6) hooked up to stable desktop connections, and now that we’re in a world of smart, JavaScript-enabled browsers with unreliable connections, we need to re-evaluate our thinking?

From what I understand, Jeremy doesn’t mean “works without JavaScript”, but rather “render the core content if JavaScript fails”. For me this means, that on first load you should always render the core content server-side (be it static HTML, via PHP or via Node.js). A smart, JavaScript-enabled browser is only smart if the JavaScript works perfectly fine, otherwise the browser is rather dump.

I am all for optimizing for unreliable connections, and rendering the core content server-side on first load will always be faster so why not use this instead of rendering it client-side with JavaScript.

> We as a community need to realize that the question of “JavaScript – yes or no?” is less about access and ubiquity, and more about performance and robustness.

Yes, it is about performance and robustness but more important about accessibility and being prepared for failures. And JavaScript often fails and all optimizations won’t help the user in that case as they simple can’t use the site anymore if you are not prepared for that scenario.

To sum up my thoughts:  
1) Render the core part of the site server-side (and of course this can also be done with JavaScript, eg. Node.js) on first view. From there on you can render additional content with JavaScript. And, of course you can enhance the regular links on your site and can use JavaScript to transitions between pages.  
2) Never try to imitate native HTML with JavaScript.  
3) Accessility should always be more important than performance or other constraints.  
4) Use JavaScript, but use it wisely and don’t assume it will always work.  
5) Be nice!

Thanks again for writing this and keep up this nice conversation between different mindsets.