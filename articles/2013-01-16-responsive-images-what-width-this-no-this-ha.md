---
title: Responsive Images – what? width! this? no, this! hä?
description: 
date: 2013-01-16T21:37:22+00:00
oldUrl: https://justmarkup.com/log/2013/01/responsive-images-what-width-this-no-this-ha/
tags:
    - article
layout: layouts/post.njk
---

2012, the year where reponsive Images got mainstream and became the rockstar of many dramas just ended some time ago and I am sure you are looking forward to 2013 for the next “responsive Image affair”. I have never planned to attend this show, but just today, while walking through Berlin, I couldn’t think of anything else.

Why do we deliver images based on the maximal window width and NOT on the actual available container width?  
  
Do make this more clear, have a look at an [example](http://jsbin.com/urivab/1), showing a simple layout on different resolutions.

[![Example Website 500px width](http://justmarkup.com/log/wp-content/uploads/2013/01/480w-300x219.png "480w")](http://justmarkup.com/log/wp-content/uploads/2013/01/480w.png)  
[![Example Site 660 width](http://justmarkup.com/log/wp-content/uploads/2013/01/640w-300x260.png "640w")](http://justmarkup.com/log/wp-content/uploads/2013/01/640w.png)  
[![Example Site 1000px width](http://justmarkup.com/log/wp-content/uploads/2013/01/1000w-300x169.png "1000w")](http://justmarkup.com/log/wp-content/uploads/2013/01/1000w.png)

The first one shows a site on a 480x320px screen, the second is 645x415px and the last 1001x514px. Ok, so lets have a look at an example using picturefill:

``` html
<div data-picture data-alt="A giant stone face at The Bayon temple in Angkor Thom, Cambodia">  
    <div data-src="small.jpg"></div>  
    <div data-src="medium.jpg"     data-media="(min-width: 400px)"></div>  
    <div data-src="large.jpg"      data-media="(min-width: 640px)"></div>  
    <div data-src="extralarge.jpg" data-media="(min-width: 1000px)"></div>  

    <!-- Fallback content for non-JS browsers. Same img src as the initial, unqualified source element. -->  
    <noscript>  
        <img src="external/imgs/small.jpg" alt="A giant stone face at The Bayon temple in Angkor Thom, Cambodia">  
    </noscript>  
</div>
```

Using this, our first screen will get the medium img, the second the large.jpg and the last one the extralarge.jpg. And here is the problem, because the site with 645x415px has only room to show an image which is 386px width, while the smallest resolution (480x320px) can show an 405px width image. Understand my concerns? In a perfect world we should have shown the small.jpg for the 645x415px screen, instead of delivering an way too big image, shouldn’t we?

I couldn’t find any reference sharing my concerns, there is nothing about it in the [W3C draft](https://dvcs.w3.org/hg/html-proposals/raw-file/9443de7ff65f/responsive-images/responsive-images.html) nor could I find any post in the [Respimg Group](http://www.w3.org/community/respimg/). I couldn’t be the first one thinking about this problem, and I am sure many people shared there thoughts – so please tell me where I can find references, discussions, … as I would like to know the advantages and disadvantages of checking for window/container width. Thanks.