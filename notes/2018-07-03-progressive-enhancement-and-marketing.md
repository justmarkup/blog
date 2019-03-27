---
title: Progressive Enhancement and Marketing
description: 
date: 2018-07-03T14:30:24+00:00
tags:
    - note
layout: layouts/post.njk
---

I am currently building a RSS reader ([intro blog article about feediary](https://blog.feediary.com/posts/hellofeediary/)) and like always it is progressive enhanced. In short this means the main features of the site will all work in older browsers, but there are several enhancements only available for supported browsers. This strategy worked great until I started working on a new feature – Themes. It is a feature only available for paid subscriptions and I wanted to make the feature available to as many different browsers and users as possible.

This got me thinking. I could build this using CSS Custom Properties, [browser support is ~88% at the moment (July 2018)](https://caniuse.com/#feat=css-variables). Still, ~10% of potential users may not be able to use the feature. I could build a fallback version for them, but this would take quite some time I have to spend on top of building it with Custom Properties. So, in the end I decided to not use Custom Properties for themes. In this article I will explain why I decided against using a new web platform feature in this case and options to list a feature not available in all browsers.

Using new web platform features
-------------------------------

More than two years ago I wrote about building a [theme switcher using Custom Properties](https://justmarkup.com/log/2016/02/theme-switcher-using-css-custom-properties/). Back then I finished the article by saying that you can use Custom Properties as an enhancement today. The today is now two years ago and browser support got far better and I still decided to build the theme feature without Custom Properties in this case.

As said, I wanted to offer themes to as many users as possible. To achieve this there are two ways. Build it using Custom Properties and build a fallback version for non-supported browsers. Build only the fallback version and use it for all users. The second version is faster to build. So, I went with the fallback-only version. Custom Properties are awesome and I already used them in production for themes, but there it was not a main feature – there it was an enhancement. As always – It depends.

List progressive enhanced features
----------------------------------

Some features can only be build using modern platform features. One example is push notifications. [Support for push notifications](https://caniuse.com/#feat=push-api) is getting better and better, but there are still many users using a non-supported browsers. They can still use the website, but won’t get this extra feature. Others can be build using new features, but could also be build using widely supported HTML, CSS and JavaScript.

I often said and still believe that websites not only don’t have to look the same in all browsers, but that also some non-essential features don’t have to work in every browser. When I started building feediary and thought about listing the features, there was one problem with this approach – should I list features only available to some browsers, not list them at all, only list them in supported browsers or add a remark about browser support.

### Don’t list the feature

From a marketing point of view this is less than ideal. Your website offers a great feature, which may be available to most of your audience, but not for all. To not confuse users using non-supported users the best approach may be to not promote the feature at all. It is still available in supported browsers, but you don’t advertise it.

### List the feature only in supported browsers

Another approach might be to make a feature test and if the feature is supported, list the feature. If the feature is not supported you don’t list it in your features list. This way a user knows about all the features they can use in the browser they are using right now. There is one problem. If a user starts using your service in a supported browser and later switches to a non-supported browsers, they may be really confused. Even more so if they regularly switch between different browsers.

### List feature with explanation to browser support

There is another way to list a feature in all browsers. List the feature, but add an explanation next to it. A link named “in supported browsers only” which links to a page where all supported browsers are listed. This way all users know about the feature, and also know if it is supported in their browsers. The main disadvantage of this is that you have to keep the list of supported browsers up-to-date as non-supported browsers could become supported browsers any time.

I am still not sure about the best way to handle marketing for progressive enhanced features. Is it again – It depends? How are you handling this? Please let me know, you can contact me on [Twitter (DM open)](https://twitter.com/justmarkup) or by writing me an [email](mailto:hallo@justmarkup.com).