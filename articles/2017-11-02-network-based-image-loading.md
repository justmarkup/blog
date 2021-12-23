---
title: Network based image loading using the Network Information API in Service Worker
description: 
date: 2017-11-02T11:15:30+00:00
oldUrl: https://justmarkup.com/log/2017/11/network-based-image-loading/
tags:
    - article
layout: layouts/post.njk
---

[Recently](https://developers.google.com/web/updates/2017/10/nic62#network-info), Chromium improved their implementation of `navigator.connection` by adding three new attributes: `effectiveType`, `downlink` and `rtt`.

Before that, the available attributes were `downLinkMax` and `type`. With these two attributes you couldn’t really tell if the connection was fast or slow. The `navigator.connection.type` may tell us a user is using WiFi, but this doesn’t say anything about the real connection speed, as they may be using a hot spot and the connection is in fact 2G.

With the addition of [effectiveType](http://wicg.github.io/netinfo/#dfn-effective-connection-type) we are finally able to get the real connection type. There are four different types (slow-2g, 2g, 3g and 4g) and they are described this way by the [Web Incubator Community Group](https://wicg.io/):

slow-2g: The network is suited for small transfers only such as text-only pages.  
2g: The network is suited for transfers of small images.  
3g: The network is suited for transfers of large assets such as high resolution images, audio, and SD video.  
4g: The network is suited for HD video, real-time video, etc.

Let’s see how we can improve user experience by delivering images based on available connection speed.

Demo
----

In this demo we will use the Network Information API in our Service Worker to handle image requests based on connection.

First, we register the Service Worker in our HTML file:

``` js
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', {
        scope: './'
    });
}
```

Now, let’s have a look at our Service Worker file (sw.js) we registered.

``` js
const connectionEffectiveType = 'connection' in navigator;

self.addEventListener('fetch', function(event) {
    // check if the request is an image
    if (/\.jpg$|.png$|.webp$/.test(event.request.url)) {
        // check if navigator.connection is supported
        if (navigatorConnectionSupported) {
            const connectionEffectiveType = navigator.connection.effectiveType;

            // check if effectiveType is supported
            if (connectionEffectiveType) {
                const req = event.request.clone();
                let imageResolution = '';

                switch (connectionEffectiveType) {
                    case "slow-2g":
                    case "2g":
                        imageResolution = '_low';
                        break;
                    case "4g":
                        imageResolution = '_high';
                        break;
                    default:
                        imageResolution = '';
                }

                // Build the image we want to return based on connection
                const returnUrl = req.url.substr(0, req.url.lastIndexOf(".")) + imageResolution + "." + req.url.split('.').pop();

                event.respondWith(
                    fetch(returnUrl, {
                        mode: 'no-cors'
                    })
                );

            }

        }
    }
});
```

Let’s go through the code step-by-step.

First we define a feature test for Network Information API. Next, we define an EventListener for the FetchEvent. Therein the first check ensures we only intercept requests for images (every file ending with .jpg, .png or .webp). Next we have check if the Network Information API is supported and another test to check if also the `effectiveType` attribute is defined.

If both checks are successful we use a switch statement to decide when to use which image. In this case, we want to show low-resolution images for slow-2g and 2g connections, the default one for 3g and the high-resolution for 4g connections. At the end we build our new image url and respond with it instead of the original request. In our case this means if the connection is 4g and the file name is image.jpg we will instead request our high-resolution image that is available as image\_high.jpg, for 2g on the other hand we deliver the low-resolution image which we have saved as image\_low.jpg.

![Screenshot of the demo in Chrome, showing the high-resolution image and that the user is using 4g](https://justmarkup.com/log/wp-content/uploads/2017/11/nia.png)

You can find the code on [Github](https://github.com/justmarkup/demos/tree/gh-pages/network-based-img-loading) and a Demo is also available on [Github pages](http://justmarkup.github.io/demos/network-based-img-loading/).

We could enhance this even further, for example adding a download link for the high-resolution image underneath each image and only loading a tiny placeholder image for slow-2g. This way the images won’t be loaded on very slow connections and thus save a lot of data, but users would still be able to see/download the image if they want to.

Note: You may have noticed that you always get the default image when opening the demo for the first time. This is because on first visit the Service Worker is not yet registered and we can’t intercept the fetch request. The enhancement happens once the Service Worker is installed. At this point we can intercept the image requests and deliver the appropriate image.

Devtools
--------

While testing `navigator.connection.effectiveType`, I thought I could use the network throttle option in Chrome to imitate other connection types, but even when I used “Slow 3G”, `navigator.connection.effectiveType` still told me I am on 4g. After searching on [crbug.com](https://crbug.com), I found the following [issue](https://bugs.chromium.org/p/chromium/issues/detail?id=758464). I hope this will be fixed soon, so we can test this via the network throttle tool.

The saveData attribute
----------------------

There is one more attribute defined in the [Network Information API](http://wicg.github.io/netinfo), which is `saveData`. If defined, it returns true when the user has requested a reduced data usage mode and otherwise false.

This isn’t available in any browser at the moment (November 2017), but may be available soon in [Chromium](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/IrIwAdMWhAE).

Once available we can extend our code and not only check for `effectiveType`, but also check for `saveData` and only return high-resolution images if the connection is 4g and the user hasn’t requested a reduced data usage.

Browser support
---------------

[Browser support](https://developer.mozilla.org/de/docs/Web/API/Navigator/connection#Browser_compatibility) for `navigator.connection` is pretty bad as of now (November 2017). But, by using the API as shown in the examples above, no user will get a worse experience; On the other hand, some users using a supported browser on slow connections will benefit.

I hope that more browsers will support the Network Information API in the future. In combination with Service Worker this is a great way to enhance user experiences and decrease load times for users on slow connections.

Bottom line
-----------

The Network Information API and especially `effectiveType` is great to deliver content based on network connection.

Although the API isn’t widely supported at the moment we can still use it to improve the loading experience for some users; Progressive enhancement is never a bad thing.

In the example above we handle image requests, but we can also use this for video, audio or other heavy assets. Looking forward to seeing more examples using the Network Information API. If you build something with it, please share it with me via [twitter](https://twitter.com/justmarkup) or [email](mailto:hallo@justmarkup.com).

**Update 4.11.2017:** Moved future test for the Network Information API outside the fetch handler as suggested by [Thomas Steiner](https://twitter.com/tomayac)