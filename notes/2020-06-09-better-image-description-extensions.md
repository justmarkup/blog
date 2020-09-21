---
title: Better Image Description Browser Extension
description: I sometimes to accessibility audits and one issue I almost always find is missing or insufficient alt text for images. 
ogImage: https://justmarkup.com/img/icons/icon-512x512.png
ogImageAlt: justmarkup
date: 2020-06-09T08:11:08+00:00
tags:
    - note
layout: layouts/post.njk
---

I sometimes run accessibility audits and one issue I almost always find is missing or insufficient alt text for images. Many of these images are from authors publishing the images via some sort of CMS.

To make it easier for them and for everybody else to see if an image has insufficient alt text I created a [browser extension](https://www.better-image-description.com/) which lets you run a check on every website. 

**Note:** This is meant for everybody and not only developers.

![A dialog showing one image from smashing-magazine.com (a cat) which has sufficient alt text "Smashing cat brewing a fresth, tasty capuccino"](/img/better-image-desc1.PNG)

## Firefox

There is a [Firefox extension](https://addons.mozilla.org/de/firefox/addon/better-image-descriptions/) available if you want to give it a try.

## Chrome

There is also a version for [Chrome](https://chrome.google.com/webstore/detail/mmkgjkmlfjhebcfbpehoogdndcbllnlk/) which will also work in most other Chromium-based browsers like the new Edge.

## Current checks

The following checks are currently covered:

* Missing alt attribute (error)
* Name of image is used as value for alt attribute (error)
* Only the word image is used for the alt attribute (error) - looking at you Twitter.
* Empty alt attribute (warning, one should check if only decorative)
* Image uses aria-hidden, aria-role="presentation" or aria-role="none" (warning, one should check if only decorative)
* Alt attribute uses the same text as the nearby headline. (warning)
* Alt attribute starts with "Image of" (warning)
* Alt attribute contains image extension (.jpg, .gif) (warning)
* Alt attribute contains two or fewer characters (warning)
* Image is only child of link (warning, alt should describe the link action)

<img src="/img/better-image-desc2.PNG" style="width: 400px" alt="The extension popup showing that 11 images where found, one error and one warning and a button to reset the check as well as a link to give feedback">

There will be more in the future, but it is a good start I think.

If you have any feedback or checks I should add please let me know via [Email](mailto:hallo@justmarkup.com) or on [Twitter](https://twitter.com/justmarkup)