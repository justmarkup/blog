---
title: Introducing 🚀 iss-observer.com
description: 
date: 2017-02-02T15:14:17+00:00
tags:
    - article
layout: layouts/post.njk
---

Since last year I watched the ISS (International Space Station) fly over various time since reading a tweet about [Spot the Station](https://spotthestation.nasa.gov/) from the NASA. There, you can enter your location and find out when you can see the ISS. You can also set alerts, to get notified via Email/SMS when the ISS flies over your location. Mostly this works fine, but I found that they are also sending notifications if the weather is really bad and you actually can’t see it and also if you can see it only for a very short time period.

Later that year, I learned more about [Push Notifications](https://developers.google.com/web/updates/2015/03/push-notifications-on-the-open-web) and started building a web app where you can search for your location, get data about ISS sightings combined with weather information and being able to receive push notifications.

![Screenshot showing iss-observer open in Chrome Desktop](https://justmarkup.com/log/wp-content/uploads/2017/02/screen-big.jpg)

I had a first version ready pretty quick, but hesitated to launch the site as I knew it is not perfect. I had to remind myself that [a website is never done](https://adactio.com/journal/11757), there are always possible improvements and if I would wait for all the enhancements I have in my mind the site would probably never go public.

So, without further ado, let me introduce you to [iss-observer.com](https://iss-observer.com).

Push notifications
------------------

![Screenshot of the notification from iss-observer.com](https://justmarkup.com/log/wp-content/uploads/2017/02/notification-chrome-mobile.png)

The main feature why I build the site is to be able to receive push notifications on my phone. On the technical site, I used the [Web Push library for Node.js](https://github.com/web-push-libs/web-push) on the Back-end. This helped me a lot in implementing it. However, I also had some issues along the way, which I will write more about in a separate article.

You can choose if you want to get notifications in the morning or/and evening and I tried to make clear that you will only receive a notification if the sky is clear enough to see it and if the time period is long enough.

Performance
-----------

I tried my best to get a great performance and on the front-end I am doing pretty well. On [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) the site gets 100 out of 100 on mobile and desktop.

![Screenshot from the PageSpeed Insights websites showing 100 from 100 for mobile and desktop](https://justmarkup.com/log/wp-content/uploads/2017/02/PageSpeed-Insights.png)

Running the [Lighthouse audit tool](https://github.com/GoogleChrome/lighthouse) shows me 91 out of 100 possible points.

![Screenshot of the Lighthouse tool showing 91 from 100](https://justmarkup.com/log/wp-content/uploads/2017/02/Bildschirmfoto-vom-2017-02-02-095004.png)

The main reason why I don’t get 100 points is that the server-side can be pretty slow. When you search for a location I need to get the live data from the NASA as well as the weather information and unfortunately this can take some time until I get all the data. I am still looking for a way to improve this though.

If you find any issues or want a new feature or enhancement added please write me an [Email](mailto:hallo@justmarkup.com), send me a [tweet](https://twitter.com/justmarkup) or file an issue on [Github](https://github.com/justmarkup/iss-observer.com/issues). Thanks!

I have already various enhancements planned and I am currently working on something which may or may not involve Augmented Reality. Stay tuned.