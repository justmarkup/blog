---
title: Dynamic responsive background images
description: 
date: 2015-03-12T09:57:39+00:00
oldUrl: https://justmarkup.com/log/2015/03/dynamic-responsive-background-images/
tags:
    - article
layout: layouts/post.njk
---

This morning I saw a [Tweet from Anselm Hannemann](https://twitter.com/helloanselm/status/575933371693592576) asking »What’s the best way to add dynamic responsive background images?« and after some quick tests I came up with the following solution.

Here is the HTML:

``` html
<div class="bg-image">
  <h1>Dynamic Background</h1>
</div>
```

Then we add some general CSS:

``` css
.bg-image {
  position: relative;
  background-size: cover;
  height: 20em;
}
```

And now comes the interesting part, let’s assume we use PHP and have access to the following dynamic background images and sizes we then can use in our HTML:

``` php
$image['small'] // contains the value for the small image for a post, eg. '/postid/small.jpg'
$image['big'] // contains the value for the big image for a post, eg. '/postid/big.jpg'
```

Now we can add an &lt;style&gt; element to the &lt;head&gt; of our site defining the different background images for different sizes:

``` css
@media all and (min-width: 501px) {
  .bg-image {
    background: url(<?php echo $image['big'] ?>) no-repeat 0 0;
  }
}
@media all and (max-width: 500px) {
  .bg-image {
    background: url(<?php echo $image['small'] ?>) no-repeat 0 0;
  }
}
```

By using min-width and max-width media queries we ensure that only the appropriate image is loaded. For more info see this [test by Tim Kadlec](http://timkadlec.com/2012/04/media-query-asset-downloading-results/#test5).

In this example, I used PHP (yes old style, but simplest for me to set up the tests), but you can use this technique also with other languages and also on static sites (eg. Jekyll).

I also put together a [demo](http://jsbin.com/qekepoceyo/1/edit?html,css,output) on jsbin to demonstrate it. If you find any disadvantages or improvements of this technique please let me know on [twitter](https://twitter.com/justmarkup).