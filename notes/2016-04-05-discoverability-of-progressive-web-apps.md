---
title: Discoverability of progressive web apps
description: 
date: 2016-04-05T15:27:52+00:00
oldUrl: https://justmarkup.com/log/2016/04/discoverability-of-progressive-web-apps/
tags:
    - note
layout: layouts/post.njk
---

[Today](https://twitter.com/justmarkup/status/717350691078029312) I was curious to find out if there is a photo editor I could use in my browser. My requirements are that it should work offline, be responsive and progressive – so basically a [progressive web app (pwa)](https://developers.google.com/web/progressive-web-apps?hl=en).  

404 – not found
---------------

My first try was to google for “photo editor web app” but none of the “apps” shown there met my requirements. Next, I tried to change the keywords to get a result, but after 372332 a lot of attempts I figured out that either there is no such web app or I miss anything. At that point I wanted to give up when I discovered the “Apps tab” hidden under “More” – I had hope for a moment to have found a way until I saw that there are only “native apps” listed.

Next, I remembered that there are [sites](https://operasoftware.github.io/pwa-list/) which list [web apps](http://mobilewebappsftw.tumblr.com/). While I like to surf on these sites and see what great web apps are available it doesn’t really help if you search for an app for something specific. Also, at the moment there are only a few progressive web apps, but what if there are millions of them next year – nobody will be able to keep such a site up-to-date.

![cat covered in wrapping paper](https://http.cat/404)

Search engines, please!
-----------------------

I don’t know a lot about how search engines index web pages, but it shouldn’t be that hard to check if the web page has a [manifest](https://www.w3.org/TR/appmanifest/), runs over HTTPS, uses a [service worker](https://serviceworke.rs/) (checking for offline may be harder) and tag the page as “progressive web app”.

![Screenshot of google.com searching for photo editor](https://justmarkup.com/log/wp-content/uploads/2016/04/Bildschirmfoto-vom-2016-04-05-164857.png)

This image shows a screenshot of the google search, after searching for “photo editor” and switching to the “Apps” tab. Now, imagine if a web page was tagged as “pwa” it would be shown there – this would solve the discoverability. Furthermore, there is already a filter to search for OS, Google could easily add Web here to filter only progressive web apps.

I talked about the Google search engine here the whole time, but this could be the same for every search engine, be it Bing, DuckDuckGo or Yahoo!. This way we don’t need a centralized site/store but the user can decide which way they prefer to search.