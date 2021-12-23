---
title: Add to homescreen and the app banner
description: 
date: 2016-04-09T13:44:42+00:00
oldUrl: https://justmarkup.com/log/2016/04/add-to-homescreen-and-the-app-banner/
tags:
    - article
layout: layouts/post.njk
---

**Note:** Some of the information in this article is outdated, for latest info see this article on [developers.google.com](https://developers.google.com/web/fundamentals/engage-and-retain/app-install-banners/?hl=en)

Last week I wrote about [discoverability of progressive web apps](https://justmarkup.com/log/2016/04/discoverability-or-progressive-web-apps/) and as part of this I also thought about current ways a site gets promoted as an app by browsers.

In Chrome for Android there will be shown an app banner for your site to engage users to add the site to the homescreen. The app banner will only be shown if the site meets certain requirements and if a user visits the site regularly, where regularly (at the moment) means at least two visits with five minutes apart. (Note: The time frame already changed over time and may change again)

![Add to homescreen app banner on Chrome for Android](https://justmarkup.com/log/wp-content/uploads/2016/04/Screenshot_20160409-141309.png)

Requirements
------------

To get the app banner with the “Add to homescreen” dialog for your site it needs to meet some criteria. The site needs a valid manifest, a service worker and the site has to be served over https.

### Manifest

First you need a valid manifest for your site. To integrate the manifest you need to link to it via a meta tag with the attribute manifest:

``` html
<link rel="manifest" href="/manifest.json" />
```

Here is an example of a manifest:

``` json
{
  "short_name": "Short Name",
  "name": "The long name of the app",
  "start_url": "./",
  "icons": [
    {
      "src": "/images/icon-128x128.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/images/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {  
      "src": "/images/icon-256x256.png",  
      "sizes": "256x256",  
      "type": "image/png"  
    }, 
    {
      "src": "/images/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/images/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "background_color": "#FFFFFF",
  "theme_color": "#AA0F0F",
  "display": "standalone",
  "orientation": "portrait"
}
```

From some testing it seems you need at least an icon with 192×192 to get the app banner, but I would suggest to also add at least the 384×384 and 512×512 icons.

128dp at 1x (160dpi) = 128px  
128dp at 1.5x (240dpi) = 192px  
128dp at 2x (320dpi) = 256px  
128dp at 3x (480dpi) = 384px  
128dp at 4x (640dpi) = 512px

\* dp = density-independent pixels and dpi = pixels per inch

Read more about the ideal sizes on [developers.google.com/](https://developers.google.com/web/updates/2015/10/splashscreen).

### Service Worker

You also need a [Service Worker](https://github.com/slightlyoff/ServiceWorker) to get the app banner. As Service Worker also requires TLS your site also needs to be served over https, which it should anyway.

Testing
-------

To test “Add to homescreen” open Chrome and Devtools. Next activate the Device Mode (Ctrl + Shift + M) and open the menu on the top right of the screen. Click “Request app banner…” and you will get a dialog to add the site to the shelf (Desktop). If you don’t get the prompt have a look in the console. For example, if the icon is not suited you will get the following message: “App banner not shown: manifest does not contain a suitable icon – PNG format of at least 144x144px is required, and the sizes attribute must be set”.

![Chrome Devtools Device Mode with settings menu open](https://justmarkup.com/log/wp-content/uploads/2016/04/Bildschirmfoto-vom-2016-04-09-142551.png)

If you don’t see the “Request app banner…” entry, try the following:

\* Update Chrome to the latest version  
\* Enable the flag for “Devtools Experiments” chrome://flags/#enable-devtools-experiments and restart Chrome  
\* Enable the option “App banner support” in Devtools -> Settings -> Experiments (If you don’t see it, press Shift six times there to get all experiments)  
\* Enable the flag for “Add to shelf” chrome://flags/#enable-add-to-shelf

There is also a [Manifest Validator](https://manifest-validator.appspot.com/) to test your Manifest and find potential errors.

Show app banner
---------------

One of the most asked question is if it is possible to show the app banner on user interaction. In short, NO. The long answer is that it is and will probably never be possible, mainly because of the fear of abuse. You may all remember the pop-ups we saw on iOS and also Android to show users how to add the site to the home screen. This can be really annoying and therefore browser vendors try their best to only show the app banner if a user is likely to visit the site again and therefore has the need for an extra icon on the homescreen.

I also would like to have the option to trigger the app banner on user interaction, but I fully understand that this would lead to every site doing it. After some time, most users will be annoyed by all the prompts and will think only negatively about app banner. That’s why we better leave it to the browser when to show the app banner.

![Add to homescreen pop-up on iPhone](https://justmarkup.com/log/wp-content/uploads/2016/04/add2home-screen.jpeg)

Bottom line
-----------

If your site meets all the requirements and a user visits your site regularly you will get the automatically shown app banner. As far as I know the app banner is only shown on Chrome for Android at the moment (April 2016) but I am sure other browsers will add something similar in the future. If you build a progressive web app be sure to test if you meet all the criteria.