---
title: Prioritize loading of background images
description: 
date: 2015-02-02T17:37:47+00:00
tags:
    - article
layout: layouts/post.njk
---

Last Update: 12.05.2015

Initially, I wanted to find a way to lazy-load background images, but all my tests confused me completely and I thought I should better move on with my daily tasks. Some days later, however, I was reading an article on medium.com and while the page was loading I recognized that the big background image was not appearing until the page has loaded completely. And there it hits me, is there a way to prioritize the loading of a background image so it will be shown earlier? So, I set up some more test and found out there is indeed a solution for it.

### Tests, Tests, Tests

I made all in all 9 [tests](https://justmarkup.com/testtest/prio-bg-img/results.html) and ran each one against 5 different browser/bandwidth combinations on Webpagetest (Chrome on Cable, Chrome on 3G, IE10 on DSL, Firefox on Cable and Chrome Mobile on 3G). I put together a site with all the [results](https://justmarkup.com/testtest/prio-bg-img/results.html) and details about every test.

![Filmstrip of test](https://justmarkup.com/log/wp-content/uploads/2015/02/filmstrip-chrome-cable.png)

### How it works

Let’s have a look at some code to see how prioritizing the loading of background images works.

Here is the HTML for the header image:

<div class="header-img"><img style="display: none;" src="images/header-img.jpg" alt=""></div>

And here is the CSS:

    .header-img {
        width: 100%;
        height: 500px;
        background-size: cover;
        background-image: url(images/header-img.jpg);
    }
    

First of all we insert an image element and set the src attribute to the same image file as the background image we want to use. We also hide the image with display: none;. This avoids that the image gets shown visually while still ensuring that the image gets requested by the browser. This means that the image is already available before any other background image gets loaded. Thanks to the browser preloader!

### Video comparison

Here is one of the video comparison from my tests, the one in the middle (test2) uses the »preload background image via img« approach and as you can see the image is visually completed before the others.

.embed-container { position: relative; padding-bottom: 33%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }

### Conclusion

What I like most about this approach is that no JavaScript is needed. You can like or hate the trend of showing big background images on websites but if you use it and want to make it visible as fast as possible this technique may be the solution. Furthermore, it seems that this technique also improves overall performance of page load – have to test this in more detail though.

I hope this technique is reasonably and that I haven’t missed anything. Otherwise, please let [me](https://twitter.com/justmarkup) know.

### Update 12.05.2015 – adding responsive image example

As [@clmnsk](https://twitter.com/clmnsk/status/598114917590401024) mentioned on twitter, this technique can also be used in combination with responsive images, more accurately by using srcset and media queries. Here is the example from above using three different images for three different screen sizes:

Here is the HTML for the header image:

<img src="images/header-img\_small.jpg" srcset="images/header-img\_small.jpg 600w, images/header-img\_medium.jpg 900w, images/header-img\_large.jpg 1200w" alt=""&g

And here is the CSS:

    .header-img {
        width: 100%;
        height: 500px;
        background-size: cover;
        background-image: url(images/header-img_small.jpg);
    }
    @media all and (min-width: 600px) {
      .header-img {background-image: url(images/header-img_medium.jpg);}
    }
    @media all and (min-width: 900px) {
      .header-img {background-image: url(images/header-img_large.jpg);}
    }