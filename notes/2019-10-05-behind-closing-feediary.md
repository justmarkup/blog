---
title: Closing feediary
description: Last month I announced that I have to close down my RSS reader feediary soon. Here is my personal view about the reasons behind it.
ogImage: https://justmarkup.com/log/wp-content/uploads/2018/07/screenshot_reader.png
ogImageAlt: The reader view of feediary
date: 2019-10-05T14:20:10+00:00
tags:
    - note
layout: layouts/post.njk
---

When I finally launched feediary last summer I was really excited. It was my first side project which I turned into a business. It was the first time I asked users to pay for my project. It was scary. 

### From fun to business

It all started when I was looking for a RSS reader. I wanted to use RSS again and wanted a tool which respects privacy, can be used on the web and is accessible. None of the available options offered all of these, so I started to build my own. Time went by, the project got bigger and bigger, I added more and more features. It was a great time and a lot of fun. I was looking forward to evenings and weekends where I could work on feediary. 

At some point I asked myself – This is really useful for me, so why not make it available for everyone. I had three options at this time. The first was to integrate lots of advertisement to be able to pay the recurring costs. The second one was to open-source it so everybody could install it on their server. The third one was to use a subscription model and offer a Free and a PRO plan. As using advertisement (which I already dislike) also means using tracking (which I hate) this was no option at all. So, I thought about open-sourcing it, which would mean that only people who know how to run a server and install everything would be able to use it. So, I decided to try the subscription model.

This sounds easy at first, add a new user role, make some features only available to PRO users, add payment to the registration and done. It took me a lot of time and swearing to get this all running. One of my goals was to use as less third-party as possible and regarding payment this was a bad idea. As I am based in Europe I have to participate in VAT MOSS (collecting VAT based on country of user), which was/is not supported by stripe (the only third-party I decided to use because nobody wants/can directly integrate payment without a third-party), and which lead to a lot of work for me. I had to check which country the user is from, check if the user has a business (by checking their VAT identification number and if it is valid) and then calculate the correct VAT. I really should have used a service which helps with this, but was too narrow-minded to trust any of these third-party tools.

Anyway, after some time I got it all running and feediary was ready for the public. The day of the launch came and it went really well. Within two hours after announcing it I already had my first PRO user – I was really enthusiastic and was looking forward to the fun again after all the hard work.

### Money, Money, Money

Time went by. Every day new users registered for feediary, I now spend a lot of time with support and at the same time fixing bugs and adding new features – still all in my free time after/before work. It was fun and exciting, besides that only very few (about 0.2% of all all users) decided to actually pay for feediary and upgrade to the PRO plan. From my rough estimates I knew that I need at least 3% PRO users to pay for all the recurring costs, so every month the ratio was below that I lost money. I am not counting all the money I invested by my work and time, but this was real money I had to pay so that others could use feediary. And every month it got a little more, because more users means more data, means more database and server cost.

So, I tried to increase the free-to-pro ratio by adding more features for the PRO plan, by telling everyone how awesome it is to be a feediary PRO user. It didn't really help.

It got frustrating to see a growing list of features and bugs I had to work on, and at the same time the certainty that I loose money every day if I can't find enough users to upgrade.

### The end

Fast forward to early summer of 2019 when I first heard about <a href="https://stripe.com/de/guides/strong-customer-authentication">Strong Customer Authentication (SCA)</a> and that I need to completely change my custom payment methods. I had about two months to finish this, as by 14th of September this had to be done.

At the beginning I was confident to finish it, but every week I worked on and couldn't finish I got more and more frustrated. At this point there was no fun left, it was all boring and frustrating work.

I also felt less and less confident that I will reach the needed free-to-pro ratio any time soon. I thought about spending money on advertisement to make feediary more known, but I personally dislike ads, feediary was all against ads and honoured privacy - so investing in ads was a no-go. I thought about going PRO-only. I thought about many ways to make it work. To make it fun again for me.

In the end I decided to let it go, to close feediary, to make it a fun project for me again and do not worry all the time about it.

### The future

All in all it was a fantastic experience, from the beginning to the end. I really learned a ton and it was fun - most of the time. Ready for my next adventure now.
