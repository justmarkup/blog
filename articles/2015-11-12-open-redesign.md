---
title: Open redesign
description: 
date: 2015-11-12T15:47:34+00:00
tags:
    - article
layout: layouts/post.njk
---

I wanted to update the design for this site for years but whenever I started, other projects came in the way. I have at least 10 unfinished designs which will never go live. That’s why I am starting an open redesign now.  

### Planned improvements (in random order)

*   Make it fast, then make it even faster – [Load JavaScript async](https://github.com/justmarkup/justmarkup.com/commit/066ece4b9894b6b45bdc1e5c3ea2146ed55060bd) – pretty happy with the performance now.
*   Improve Accessibility – Fixed labels for forms, [Made svg logo accessible by adding a title attribute, changed heading structure, fixed bad contrast for code element](https://github.com/justmarkup/justmarkup.com/commit/71c064260f68e2b404f077bd0af5a2b3edb188e2) – marking this as done is probably wrong as I am sure here and there is eg. an alt description not perfect but all the main things are fixed.
*   Add last updated at for technical articles
*   Service Worker integration – 13.11.2015 – Basic implementation is live: [Code](https://github.com/justmarkup/justmarkup.com/blob/master/src/js/sw.js) and [article](https://justmarkup.com/log/2016/01/add-service-worker-for-wordpress/)
*   Push notification integration with WordPress – 18.11.2015 – Initially I thought it might be a great idea to offer notifications every time I post a new article but that’s what RSS is for. You should only show notifications if it’s important and urgent which is not the case for a new post.
*   Responsive Images – [On by default in all newer posts](http://www.smashingmagazine.com/2015/12/responsive-images-in-wordpress-core/)
*   Add to homescreen – 13.11.2015 – [Code](https://github.com/justmarkup/justmarkup.com/blob/master/manifest.json)
*   Use em instead of px – 01.01.2016 – [Commit](https://github.com/justmarkup/justmarkup.com/commit/cce91c0a25c03c3a7e4718c7c5d833952631c577)
*   Add logo animation – 19.11.2015 – [Commit](https://github.com/justmarkup/justmarkup.com/commit/7cd987de6a7b02f3f410a198074299cdd66685ce)
*   Add code highlighter as an enhancement – added prismjs ([commit](https://github.com/justmarkup/justmarkup.com/commit/dd2bf6034c052db21f38503b566ce0e379701df6))
*   …

You can find the code of the WordPress Theme on [Github](https://github.com/justmarkup/justmarkup.com/). If you have any other ideas for improvements or found a bug feel free to open an [issue](https://github.com/justmarkup/justmarkup.com/issues).

I will write about some improvement along the way. If there is anything you would like to see integrated or anything you would like me to write about, let me know on [twitter](https://twitter.com/justmarkup) or write me an [email](mailto:hallo@justmarkup.com).

### Articles about it

[Add Service Worker for WordPress](https://justmarkup.com/log/2016/01/add-service-worker-for-wordpress/)  
[Syntax highlighting as an enhancement](https://justmarkup.com/log/2016/01/add-syntax-highlighting-as-an-enhancement/)