---
title: Version Eight
description: I just released a new version of justmarkup.com. 🎉 This is now the 8th version of this site and while it is still far from perfect, I decided it is about time to release it anyway.
ogImage: https://justmarkup.com/img/version-eight.png
ogImageAlt: The eight version of justmarkup.com
date: 2019-05-06T14:50:10+00:00
tags:
    - note
layout: layouts/post.njk
---

I just released a new version of justmarkup.com. 🎉 This is now the 8th version of this site and while it is still far from perfect, I decided it is about time to release it anyway.

![The eight version of justmarkup.com](/img/version-eight.png)

In terms of layout there isn't much of a change since the last version, but I tried to make it more readable and also improved the design of the code examples and the embed data. I certainly will tweak the design more in the next weeks and also plan to make extra design for some pages - Whenever I find the time for that.

I also decided to not use web fonts for now - mostly because I couldn't decide which one to use, but I definitely plan to use one for recurring visitors in the future.

The biggest change in this version is that it is no longer using WordPress. Instead I now use [Eleventy](https://www.11ty.io/) and I am pretty happy about it so far. As I first step I transformed all my WordPress posts to Markdown using [puppeteer](https://justmarkup.com/articles/2019-01-04-using-puppeteer-to-crawl-pages-and-save-them-as-markdown-files/), and from there I used the [Eleventy Base Blog](https://github.com/11ty/eleventy-base-blog/) as a starting point. 

The main benefits of the switch are that I now can use Markdown for writing (I already did this in the past, but now I don't need to convert to WordPress Posts anymore), and that the performance improved quite a bit.

![Lighthouse report for justmarkup.com showing 100 points for all sections](/img/lighthouse-justmarkup-com.png).

Some may miss the possibility to comment on an article. While I won't bring back regular comments I will implement [Webmentions](https://indieweb.org/Webmention) soon and will also show all old comments underneath the article.

You can find the code on [Github](https://github.com/justmarkup/blog/) and if you find anything you want me to change, please open an issue there or let me know on [Twitter](https://twitter.com/justmarkup) or via [Email](mailto:hallo@justmarkup.com).

Enjoy!