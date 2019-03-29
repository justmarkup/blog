---
title: Using text-shadow instead of font-weight bold to avoid jumping
description: 
date: 2015-11-02T07:55:32+00:00
oldUrl: https://justmarkup.com/log/2015/11/quick-tip-using-text-shadow-instead-of-font-weight-bold-to-avoid-jumping/
tags:
    - article
layout: layouts/post.njk
---

When using font-weight: bold for :hover states on links the width of the element changes as the character width gets increased. This can result in a jump effect as shown in this [example](http://jsbin.com/toxija/latest/edit?html,css,output).  
  
[![Screencast showing hovering of a link with font-weight set to bold and the workaround using text-shadow](https://justmarkup.com/log/wp-content/uploads/2015/11/font-weight-bold-jump.gif)](https://justmarkup.com/log/wp-content/uploads/2015/11/font-weight-bold-jump.gif)

### Workaround

``` css
a:hover {
  text-shadow: 1px 0 0 currentColor;
}
```

To prevent the jump effect we can use text-shadow to fake font-weight: bold. Browser support for [text-shadow](http://caniuse.com/#feat=css-textshadow) is good for most browsers, except in Internet Explorer where it isn’t supported prior to Version 10. As you want to define :hover states for older IE versions as well you may use conditional comments:

### Conditional comments

``` html
<!--[if lt IE 9]> <html class="old-ie" lang="en"> <![endif]-->
<!--[if IE 9]> <html class="old-ie" lang="en"> <![endif]-->
<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->
```
``` css
a:hover {
  text-shadow: 1px 0 0 currentColor;
}

.old-ie a:hover {
  font-weight: bold;
}
```

[Example](http://jsbin.com/tocize/latest/edit?html,css,output) using conditional comments.

### CSS Feature Queries

Or you could use @supports to target only browsers which support CSS Feature Queries and text-shadow:

``` css
a:hover {
  font-weight: bold;
}

@supports (text-shadow: 1px 0 0 #000) {
  a:hover {
    font-weight: normal;
    text-shadow: 1px 0 0 currentColor;
  }
}
```

[Example](http://jsbin.com/cipiha/latest/edit?html,css,output) using @supports.

I prefer using [@supports](http://caniuse.com/#feat=css-featurequeries) as it is future-friendly and although it is not supported in IE11 it is supported in Edge and every other modern browser.