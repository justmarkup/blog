---
title: Add Service Worker for WordPress
description: 
date: 2016-01-01T16:17:54+00:00
tags:
    - note
layout: layouts/post.njk
---

As part of the [open redesign](https://justmarkup.com/log/2015/11/open-redesign/) of this WordPress site I also added a Service Worker – to improve performance and to offer an offline experience. I encountered some problems along the way so I thought it is a good idea to write about my findings. As a starting point I used this [basic implementation](https://brandonrozek.com/2015/11/limiting-cache-service-workers-revisited/) by [Brandon Rozek](https://brandonrozek.com/).

Register the Service Worker
---------------------------

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/log/sw.min.js', {scope: '/log/'});
    }
    

First of all you have to register the Service Worker, at WordPress themes you normally have a [footer.php](https://github.com/justmarkup/justmarkup.com/blob/master/footer.php#L20-L29) where you can add this.

My blog is running on [justmarkup.com/log/](https://justmarkup.com/log/), that’s why I use `scope: '/log/'` here as the scope as I only want to use this Service Worker for my blog and not for every part (for example: Piwik, hosted on /piwik/) running on the domain. If your WordPress installation is on the root, you should use `scope: './'`.

Usually, you have your theme files under /wp-content/themes/YOURTHEME/ and also have all your JavaScript files (and therefore also the Service Worker file) in this directory. The problem is that the Service Worker file has to be in the root directory of WordPress (in my case this is /log/) to be able to control and work with every part of your WordPress site. So, the Service Worker can only control everything in the directory it is served from and every directory beneath it. I was rather confused about it the first time, but it makes sense now, as otherwise you would be able to control every site on a shared hosting (think of Github pages).

To get around the issue on my WordPress site, I created a [symbolic link (symlink)](https://en.wikipedia.org/wiki/Symbolic_link) – where I link the Service Worker file in my theme folder to the root folder. This way I can work on the Service Worker file in my themes folder and have it automatically linked to the root folder.

    ln -s /var/www/log/wp-content/themes/justmarkup.com/dist/js/sw.min.js /var/www/log/sw.min.js

Another way to handle this would be a .htaccess redirect rule, but I personally prefer using a symlink.

Handle admin and preview pages
------------------------------

With this in place my Service Worker was working fine until I was working on a new article and finding out that changes where sometimes not saved correctly and the preview was not accurate anymore. So, I added a [conditional statement](https://github.com/justmarkup/justmarkup.com/blob/master/src/js/sw.js#L131-L134) to not intercept the fetch when the URL contains wp-admin (the admin area of WordPress) or if the URL contains preview=true (the preview page).

    self.addEventListener("fetch", function(event) {
      //This service worker won't touch the admin area and preview pages
      if (event.request.url.match(/wp-admin/) || event.request.url.match(/preview=true/)) {
        return;
      }
    });
    

Bottom line
-----------

Service Worker are great and an enhancement for every site. While I first thought it is mainly about adding an offline experience I am far more excited about the performance impact and all the [other](http://deanhume.com/home/blogpost/service-workers--dynamic-responsive-images-using-webp-images/10132) [exciting](https://developers.google.com/web/updates/2015/12/background-sync?hl=en) [things](https://developers.google.com/web/updates/2015/03/push-notifications-on-the-open-web?hl=en) you can use it for.

The [Service Worker file](https://github.com/justmarkup/justmarkup.com/blob/master/src/js/sw.js) currently in use on this site.

If you want to use Service Worker on your WordPress site, I hope this article helps you to implement it without making the errors I made. If you use Service Worker in your WordPress site and found other solutions for the mentioned problems or other ways to improve it, please let me know.