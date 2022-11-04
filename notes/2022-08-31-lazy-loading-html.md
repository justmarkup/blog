---
title: Lazy loading HTML includes
description: Browser supports :has() and container queries. So, why shouldn't they be able to support lazy loading HTML?
ogImage: https://justmarkup.com/img/icons/icon-512x512.png
ogImageAlt: justmarkup
date: 2022-08-31T15:12:08+00:00
tags:
    - note
layout: layouts/post.njk
---

Browser supports :has() and container queries. So, why shouldn't they be able to support lazy loading HTML?

## HTML includes

In PHP (Hypertext Preprocessor), it's done like this:

```html
<?php include 'component.php';?>
```

In HTML, it may look like this:

```html
<div include="component.html"></div>
```

or

```html
<include src="component.html">
```

### How would this work?

Instead of preprocessing the final HTML before the browser parses it, as it's done in PHP, with HTML includes, the browser will include the HTML while parsing it.

The HTML parser starts parsing, detects an include, makes an HTTP request, parses the HTML and inserts it into the DOM tree. Like streaming the HTML.

## Lazy loading

Browser supports the lazy loading attribute, loading="lazy". This could be reused for the HTML includes.

```html
<include src="component.html" loading="lazy">
```

You have a component at the very bottom of a long page. Lazy load it. The browser only includes the HTML if the user scrolls down far enough.

This will make this feature even more interesting. We have JavaScript to do the same, you say? Yes, but I could say the same for container queries or :has().

## Make it happen

There are probably hundreds of issues I haven't thought of, and many would even say it's impossible. Okay, but browsers gets better and better, hardware gets better and better. Browser vendors will figure this out.

One day we will have HTML includes and HTML lazy loading includes. Looking forward to it.

Of course I am not the only one thinking about HTML includes, see this long [thread](https://github.com/whatwg/html/issues/2791) which started in 2017 and people still discuss.