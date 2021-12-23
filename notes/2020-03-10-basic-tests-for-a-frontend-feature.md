---
title: Basic tests for a frontend feature
description: A list of tests you should perform for every frontend feature you ship
ogImage: https://justmarkup.com/img/icons/icon-512x512.png
ogImageAlt: justmarkup
date: 2020-03-10T20:24:10+00:00
tags:
    - note
layout: layouts/post.njk
---

If you ever worked in an agile team and used SCRUM you probably heard of Definition of Done. While I am still skeptical that SCRUM is the best way to build a product, I find having a Definition of Done to be really helpful.

Here are some things I find to be valuable to have in there when it comes to testing.

## 1) Tests on devices/browsers listed in the project assumptions passed

What devices and browsers you should test depends on your product, your market and many other factors. You should, however, have a least one low-end Android device in there, like the Moto G4 or the Alacatel 1X. Testing there gives you a good idea how efficient a feature really is.

## 2) Can be used with keyboard only

That's self-explanatory – all actions of the feature can be done by using only your keyboard.

## 3) Automated accessibility tests passed

While you can't automatically test any accessibility issue, it is a good start. There are various tools available, like [WAVE](https://wave.webaim.org/about), [axe](https://www.deque.com/axe/), [Pa11y](https://pa11y.org/) and many others. Most tools show you contrast failures, missing alt attributes, missing labels and much more.

## 4) Test with screen reader passed

You should at least test with one screen reader. You can use a free screen reader like VoiceOver (macOS, iOS), TalkBAck (Android), NVDA (Windows) to test. Note, there are differences between screen reader, how they support web features. 

## 5) Core actions are usable without JavaScript

No matter what happens, one thing will always be true - JavaScript can and will fail at some point. Therefore, make sure all the core features are usable without JavaScript, and more importantly, when JavaScript is available, but fails for whatever reason.

## Conclusion

This list is by no means complete. Nothing will ever be perfect, but if all these tests pass you are most probably ready to ship.