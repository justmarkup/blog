---
title: Load module-dependent JavaScript with basket.js
description: 
date: 2015-01-19T15:13:11+00:00
oldUrl: https://justmarkup.com/log/2015/01/load-module-dependent-javascript-with-basket-js/
tags:
    - article
layout: layouts/post.njk
---

I tried different scripts, here is a [spreadsheet](https://spreadsheets.google.com/lv?key=tDdcrv9wNQRCNCRCflWxhYQ) of some of the JavaScript loaders available, but in the end I went with [basket.js](http://addyosmani.github.io/basket.js/). Mostly because it uses local storage, it can order dependencies and supports loading of multiple scripts.

### Code

Here is my approach to load JavaScript for page modules:

``` js
var version = 1,
  isModern = 'querySelector' in document && 'localStorage' in window && 'addEventListener' in window;
if (isModern) {
  /* "HTML5" browsers */
  document.documentElement.className = 'js';
    /* load scripts/libs necessary for all pages */
    basket
      .require({url:"dist/js/base.min.js", unique: version})
        .then(function(){
          /* load fonts, see http://bdadam.com/blog/loading-webfonts-with-high-performance.html */
          basket.require({url:"dist/js/fonts.js", unique: version});

          [].forEach.call(document.querySelectorAll('.js-module'), function(module) {
            /* load js for every module present on the current page
            * example: class="js-module js-module-gallery" data-module-name="module-gallery"
            */
            var src = 'dist/js/modules/' + module.dataset.moduleName + '.js';
            basket.require({url: src, unique: version});
          });
        })
  });
} else {
  /* "HTML4" browsers */
}
```

Here is what the HTML looks like for a module (in this case an embed tweet).

``` html
<div class="js-module js-module-twitter" data-module-name="module-twitter">
  <blockquote class="twitter-tweet" lang="en">
    <p>DevTools Wishlist: emulate (low) RAM, GPU and CPU</p>
    Michael (@justmarkup) 
    <a href="https://twitter.com/justmarkup/status/555801249866854400">January 15, 2015</a>
  </blockquote>
</div>
```

And in the JavaScript file dist/js/modules/module-twitter.js the widgets.js from Twitter will be loaded to change the static blockquote into the interactive tweet version.

### Advantages

*   JavaScript is loaded async
*   On repeated view the scripts are served from local storage (decreases requests)
*   Module-dependent JavaScript only gets loaded if module is visible on the page (Eg. you probably don’t need the twitter embed widget on every site)
*   Progressive enhanced (if a user uses an old browser, JavaScript is not available or fails to load you still get to see the content)

### Further improvements

If you use modules with a lot of extra CSS, you may also want to load this CSS dependent on your module, here is an [example](https://github.com/andrewwakeling/basket-css-example) showing how you can achieve this with basket.js.

### What do you think?

I am really curious what you think about my way of loading JavaScript for page modules. Are there any disadvantages I miss? Let [me](http://www.twitter.com/justmarkup) know!