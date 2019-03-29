---
title: Indicating offline
description: 
date: 2016-08-18T07:25:25+00:00
oldUrl: https://justmarkup.com/log/2016/08/indicating-offline/
tags:
    - article
layout: layouts/post.njk
---

Developers have been able to make a site available for offline usage for some years using [Application Cache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache), but it has some [downsides](http://alistapart.com/article/application-cache-is-a-douchebag) and hasn’t been really popular.

With the raise of [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/), and more and more sites using, and browser implementing [Service Workers](https://www.w3.org/TR/service-workers/) we will see a lot of sites being “ready for offline” in the upcoming months and years.

Many users don’t know that websites can also work offline like native Apps. If a user doesn’t have an internet connection they assume a website won’t work and that’s why I think it is important to indicate that the site/app will work offline and also which parts are only usable when online.

Tell the user that the site works offline
-----------------------------------------------------------------------------------------

When a user visits your site for the first time, and you have implemented a Service Worker to make it “offline-ready” we can show the user a message saying that “The site is ready to work offline”.

![Ready to work offline message](https://justmarkup.com/log/wp-content/uploads/2016/08/Bildschirmfoto-vom-2016-08-16-182733.png)

Ready to work offline message (Screenshot from [SVGOMG](https://jakearchibald.github.io/svgomg/))

To do this, we listen to the [statechange](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker/onstatechange) event and if the [ServiceWorker.state](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker/state) is `activated` show the message. This way the message will only be shown on first registration and we don’t annoy users with showing it on every page load.

``` js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function(registration) {
    // Registration was successful
    
    var newWorker = registration.installing;
    
    // statechange fires every time the ServiceWorker.state changes
    newWorker.onstatechange = function() {
      // show the message on activation
      if (newWorker.state == 'activated' && !navigator.serviceWorker.controller) {
        document.querySelector('.offline-ready').classList.add('active');
      }
    };
  }).catch(function(err) {
    // registration failed :(
  });
}
```


In the future users may expect a site to work offline after visiting again, but until this happens, I think it is a good idea to let the users know about this feature.

Tell users that they are offline/online
----------------------------------------------------------------------------------

Some things, like every network request for new stuff, will never work when offline.

We can use [online and offline events](https://developer.mozilla.org/en/docs/Online_and_offline_events) to indicate to a user that they are currently offline or online again.

``` js
window.addEventListener('load', function() {
  function updateOnlineStatus(event) {
    var condition = navigator.onLine ? "Live" : "Currently offline";

    document.querySelector('.connection').innerHTML = condition;
  }

  window.addEventListener('online',  updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
});
```


Let’s say we have a live ticker which gets updated automatically when new content arrives. If the user is online, we can show “Live” to indicate that new content will be shown automatically. If the user is offline on the other hand we can show the message “Currently offline” to point out that the live ticker won’t update until the user is online again.

Grey-out things not available offline
---------------------------------------------------------------------------------

Some areas of a site/app won’t work when a user is offline because we don’t have a cached version yet. To find out which parts are already cached we can use the [Cache API](https://davidwalsh.name/cache), which is available in Web Workers, Window and Service Workers in [supported Browers](https://nolanlawson.github.io/html5workertest/).

![Screenshot showing a list of latest articles whil offline where all expect for the first two already cached links are greyed-out](https://justmarkup.com/log/wp-content/uploads/2016/08/Grey-out-non-cached-elements.png)

First, we register a Service Worker if it is supported.

``` js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
```

Next, we switch to our [service-worker.js](https://github.com/justmarkup/demos/blob/gh-pages/indicating-offline/service-worker.js). I am using the [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox) here. If the request contains “article-” we store the response in the cache with the name “articles” which we later can use in our window.

``` js
// match every request ending with download
global.toolbox.router.get(/article-/, global.toolbox.cacheFirst, {
  // Use a dedicated cache for the responses, separate from the default cache.
  cache: {
    name: 'articles',
    // Store up to 10 articles in that cache.
    maxEntries: 30
  }
});
```


Back to our main site, where we first check if the cache API is supported. If it does, we loop over each link on our site and if the value of the href is present in the cache with the name “articles” we add the class “available-offline” to the link.

``` js
// check if the cache API is supported
if('caches' in window) {

  // forEach for NodeList
  NodeList.prototype.forEach = Array.prototype.forEach;

  // loop over each link and add class "available-offline" if src is already in cache
  var downloadLinks = document.querySelectorAll('a').forEach(function(el) {
    caches.open('articles').then(function(cache) { 
      cache.match(el.getAttribute('href')).then(function(matchedResponse) {
        if (matchedResponse) {
          el.classList.add('available-offline');
        }
      });	
    });
  });
}
```


Next, we add EventListener for the online/offline events to add/remove the class “is-offline” to our `html` element and also add the hint Offline/Online for our users.

``` js
// add "is-offline" class to the html element if user is offline and remove when online again
window.addEventListener('load', function() {
  function updateOnlineStatus(event) {
    if (navigator.onLine) {
      document.documentElement.classList.remove('is-offline');
      document.querySelector('.connection-status').innerHTML = 'Online';
    } else {
      document.documentElement.classList.add('is-offline');
      document.querySelector('.connection-status').innerHTML = 'Offline';
    }
  }

  window.addEventListener('online',  updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
});
```

Next, we add some styles. If the user if offline and the class “is-offline” is present at the `html` element we grey-out all links expect for the links we already have cached and which we gave the class “available-offline” in the code part above. We will also remove the pointer cursor and add a default one for all links not working offline to give users one more hint that these links will not load as expected.

``` css
.is-offline a {
  color: grey;
  cursor: default;
}

.is-offline .available-offline {
  color: black;
  cursor: pointer;
}
```


If you want to try it yourself, here is a [demo](https://justmarkup.github.io/demos/indicating-offline/) and the code is on [Github](https://github.com/justmarkup/demos/tree/gh-pages/indicating-offline).

Conclusion
---------------------------

I think we still have a long way to go until “offline-ready” won’t be a feature, but the standard way of serving websites. And it will take time to educate users that websites can work offline like native Apps. Someday, users may assume that a website works offline on repeated visits and you don’t want to have one of the websites not ready, so it is a good idea get yourself comfortable with Service Workers and the cache API.