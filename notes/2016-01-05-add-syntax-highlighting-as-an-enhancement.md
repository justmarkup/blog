---
title: Syntax highlighting as an enhancement
description: 
date: 2016-01-05T09:49:08+00:00
tags:
    - note
layout: layouts/post.njk
---

I never had syntax highlighting for my code examples on this site and thought it is finally time to add one. After looking at some solutions I decided to use [Prism](http://prismjs.com/) as it is well tested and maintained and extensible.  

Implementation
--------------

Do use Prism you need to include the CSS and JavaScript files you get from the [Download page](http://prismjs.com/download.html). In my case I saved the CSS I got as [prism.scss](https://github.com/justmarkup/justmarkup.com/blob/master/src/scss/vendor/prism.scss) under the folder vendor and afer running it through Grunt it got compiled with the other SCSS files, compressed and inlined in the head of the site.

After that I added the JavaScript in my footer.php at the very end:

    <script defer src="https://justmarkup.com/log/wp-content/themes/justmarkup.com/dist/js/prism.min.js"></script>

Note: I first tried it with the async attribute but this [doesn’t work](https://github.com/PrismJS/prism/issues/75) with Prism so I used the defer attribute instead.

With this in place I went through my articles and added `class="language-xxx">` to every code element where I want to have syntax highlighting. Finally some pretty code examples on my site. And if the JavaScript doesn’t load for whatever reason, the code blocks are still readable fine, like it was before – in two words – progressive enhancement.

Examples
--------

CSS

    .code {border: 1px solid green;}

JavaScript

    var Prism = true;