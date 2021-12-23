---
title: Using the Web Share API to enhance a static share link
description: 
date: 2016-10-21T07:56:26+00:00
oldUrl: https://justmarkup.com/log/2016/10/using-the-web-share-api/
tags:
    - article
layout: layouts/post.njk
---

The Web Share API is an experiment in Chrome and the origin trial will end in April 2017. Although I try to keep my articles up-to-date, the information here will likely be outdated at some point. For more info please visit [developers.google.com](https://developers.google.com/web/updates/2016/10/navigator-share)

Since Chrome 55 (Beta as of October 2016) you can use the Web Share API as an [Origin Trail](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md) on Android. In this article, I would like to show, how to enhance your current share button with the Web Share API.

Requirements
------------

As I said, the Web Share API is an origin trail until April 2017. So, you first need to [sign up](https://docs.google.com/forms/d/e/1FAIpQLSfO0_ptFl8r8G0UFhT0xhV17eabG-erUWBDiKSRDTqEZ_9ULQ/viewform) to get a trail token. After about 1 day (it took ~4hours in my case) you will get an email with the Origin Trial Token for your site.

Next you have to include the token on your site:

``` html
<meta http-equiv="origin-trial" data-feature="Web Share" data-expires="2016-12-01" content="TOKEN">
``` 

Further requirements are:

*   Your site needs to be served via https
*   You can call `navigator.share()` only on user gesture, eg. click.
*   All property values must be strings

With that in place we can now use the Web Share API.

Demo time
---------

![Screenshot showing the open share dialog in Chrome for Android](https://justmarkup.com/log/wp-content/uploads/2016/10/Screenshot_20161021-093847-169x300.png)

First, we will include a static share link for twitter:

``` html
<a class="share" href="https://twitter.com/intent/tweet?text=Using%20the%20Web%20Share%20API%20https%3A//justmarkup.com/log/2016/10/using-the-web-share-api/">Share via Twitter</a>
```

This way everybody using a browser not supporting the API will get a link (which may or may not look like a button) to share the site on twitter.

Next, we add a script at the bottom of our site to enhance the link using the Share API:

``` js
if (navigator.share !== undefined) {
	const SHARE_BTN = document.querySelector('.share');

	SHARE_BTN.textContent = 'Share';

	SHARE_BTN.addEventListener('click', function (ev) {

		navigator.share({
			title: document.title,
			url: document.querySelector('link[rel=canonical]') ? document.querySelector('link[rel=canonical]').href : window.location.href
		}).then(() => console.log('Successful share'))
		.catch((error) => console.log('Error sharing:', error));

		ev.preventDefault();
	});
}
```

Let’s go through the code one by one. First, we add a feature test to check if `navigator.share` is supported. If this is the case, we change the text of our share link from “Share via Twitter” to “Share” to show that you can share with various services.

Next, we add an `EventListener` for our share link, to call `navigator.share` on click. There we define properties for title and url. You can also add a text property here. For the url we first check if there is a canonical link and use that, otherwise we use the current url.

Last, we call `ev.preventDefault();` to prevent the default action of the link.

Everyone using a browser supporting the Share API can now easily share the site via all services/apps they have installed on their device and all others still get the twitter link or can copy the URL and share with their favorite service.

Here is a [demo](https://justmarkup.com/web-share-api/using-the-web-share-api.html) and you can also find the code on [Github](https://github.com/justmarkup/demos/blob/gh-pages/web-share-api/using-the-web-share-api.html).

Note: To enhance the sharing for browsers not supporting the Web Share API you can also use [responsible social share links](https://jonsuh.com/blog/social-share-links/) and load the share dialog in a pop-up.

Conclusion
----------

It takes some preparation to use the Share API, but once you have completed them you can use it with some lines of JavaScript.

The Web Share API will be a trail at least until April 2017, after that there may be another trail or it may be implemented by default. It also only works on Android for now. Still, I like the idea – it is a great example of browsers implementing features many sites already use. This gives users an enhanced experience without the overhead of loading lots of JavaScript as it currently the case on many sites.

Happy sharing!