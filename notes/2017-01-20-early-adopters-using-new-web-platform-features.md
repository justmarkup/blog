---
title: Early adopters – Using new web platform features
description: 
date: 2017-01-20T16:05:28+00:00
oldUrl: https://justmarkup.com/log/2017/01/early-adopters-using-new-web-platform-features/
tags:
    - note
layout: layouts/post.njk
---

In this article I would like to go through the why and when of using new features, ways to use features early and the responsibility of early adopters.

What are the benefits?
----------------------

Before using a new web platform feature, you should always ask: What are the benefits? Will this increase the experience for your users? Will your company benefit from it by saving money, development time…?

You should also have a look at your statistics, to see how many users will benefit from the new feature now, in 6 months, in 2 years. Furthermore, you should find out if the new feature is a Draft or Recommendation? Also, how many browsers show interest in the new feature, how many browsers have already implemented it and how many browsers have it on their [road map](https://www.chromestatus.com/feature/5668769141620736) to implement it in the near future?

Finally, you should find out it the feature, can be used as an enhancement, or with [a fallback](https://justmarkup.com/log/2016/03/on-browser-support/).

If a feature is a Draft, one browser has implemented it (about 20% of your users), no other browser shows real interest, you could also implement a solution without using the feature and the time to implement it would be 40 hours it probably makes no sense to use the new feature.

If a feature is a Recommendation, two browsers have implemented it, one is working on it and one shows interest, you couldn’t achieve it with existing technologies and the time to implement it will be 20 hours it probably makes sense – but only if you answered the questions above and see a benefit for your users/your company.

Using a new feature just because it is “cool” is not really smart. Find out the cost vs. benefit ratio and based on that decide for every feature if you should implement it now, later or never.

After talking about why and when to use new features, let’s have a look how to use new features.

\-prefix
--------

CSS Vendor Prefixes have been proposed by Mike Wexler from Adobe in September 1998. While it seemed like a good idea to ship experimental features with prefixes, in the end they [didn’t work out so well](http://www.glazman.org/weblog/dotclear/index.php?post/2015/07/30/CSS-Vendor-Prefixes) .

Because of developers using prefix-only CSS, some browsers even had to add support for [prefixes from other browsers](https://hacks.mozilla.org/2016/09/firefox-49-fixes-sites-designed-with-webkit-in-mind-and-more/) because web sites look broken in these browsers.

Nowadays, there are tools like [autoprefixer](https://github.com/postcss/autoprefixer) to automatically add all needed prefixes based on a defined browser matrix. Even if these features would have existed from the beginning of prefixes, there would always be developers not using such a tool and there will always be sites not updating their CSS and we would still have sites using wrong prefixes or even worse prefix-only CSS.

While we still have to deal with prefixes for some time, I think there won’t be any (at least none I am aware of) new features shipped with a prefix. So, moving away from prefixes, let’s have a look what our options are to try out experimental/new features and ways to use them in production early on.

Flags
-----

After learning from the negative impact of prefixes, many browsers like [Firefox](about:config), [Chrome](chrome://flags) and [Opera](opera://flags) are now adding experimental features behind user-controlled flags.

With flags, developers can test new features and learn about them so they can use the feature as soon as browsers start to ship to all users. Using feature detection they can also implement a feature now, although it isn’t shipped without a flag in any user and once available without flag users can benefit from it. So, when using features shipped behind flags always be sure to test with flags disabled as this is what the majority of your users get.

Testing features behind flags gives developers also time to find bugs and report them early in the process (more on that later), and browsers and spec writers time to fix these before shipping it to all users.

Origin Trials
-------------

[Origin Trials](https://github.com/jpchase/OriginTrials/blob/gh-pages/explainer.md) is an approach to enable safe experimentation with web platform features.

At the moment (January 2017), Chrome is the only browsers using Origin Trials for some [experimental features](https://github.com/jpchase/OriginTrials/blob/gh-pages/available-trials.md), but I hope more browsers will start using them in the future.

Before you are able to use a feature shipped with Origin Trials, you have to [request a Token](https://docs.google.com/forms/d/e/1FAIpQLSfO0_ptFl8r8G0UFhT0xhV17eabG-erUWBDiKSRDTqEZ_9ULQ/viewform) for your site (origin). You can only participate if your site is available over HTTPS.

After some time (up to 24hours) you will get an email with the Token. For example, the meta tag for using the Web Share API looks like this:

``` html
<meta http-equiv="origin-trial" data-feature="Web Share" data-expires="2017-02-15" content="YOURTOKEN">
```

Once you have implemented the meta tag on your site you will be able to use the new feature and ship it to all users with a supporting browser. Every 2 months you have to renew your Token and also answer some questions about what you like/dislike about the feature. This information is very important for browsers, so they can change the implementation early on, based on findings from early adopters.

What I like about Origin Trials is that developers have to use them careful, have to update their Token and most important have to give feedback to the browsers with the benefit of being able to ship new features to all supported browsers early on.

Sharing and Caring
------------------

Developers using new web platform features from the beginning have the responsibility to challenge the features and report bugs and issues to the browsers and specification authors. While specification authors and browser developers try to think about every use case and edge case there are often cases they didn’t take into account and this is where we as developers can help.

\*Every\* browser has a page to [report bugs](https://bugspencer.com/) and you can also open an [issue](https://github.com/w3c/) on the Github pages from the W3C for many new features.

Conclusion
----------

When using new platform features, keep in mind that you are an Alpha/Beta user. Be aware that things may change or even break in the future. When using new features from the beginning, be sure to report bugs and issues.

And always keep in mind that you don’t have to use/know about every new feature and that it often makes no sense to implement a new feature only because you can. Use featurs wisely!

As always, these information may be out of date by the time you are reading this. Futhermore there may be more usable information I am/was not aware of. In both cases it would be great if you could let me know via [Email](mailto:hallo@justmarkup.com) or on [twitter.](https://twitter.com/justmarkup); Thanks.