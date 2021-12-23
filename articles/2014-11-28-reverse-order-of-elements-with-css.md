---
title: Reverse order of elements with CSS
description: 
date: 2014-11-28T12:41:11+00:00
oldUrl: https://justmarkup.com/log/2014/11/reverse-order-of-elements-with-css/
tags:
    - article
layout: layouts/post.njk
---

### Reverse with transform

This is done by setting transform: rotate(180deg); for the ol, and transform: rotate(-180deg); for every li element.

Transform was certainly not build for this task, but it is animatable and browser support is very good.

Specification: [W3C Working Draft](http://www.w3.org/TR/css3-transforms/)
Browsersupport: [Can I use](http://caniuse.com/#feat=transforms2d)
Animatable: yes
Example (hover over list to reverse order): [http://jsbin.com/diqata/1](http://jsbin.com/diqata/1/edit?output)

### Reverse with flex-direction

After posting my example with transform on twitter, [Sven Wolfermann](http://www.twitter.com/maddesigns) suggested using flexbox, more specific flex-direction: column-reverse; for this task.

I haven’t used flexbox very often and obviously not thought about it. If you look it up on MDN it says » Behaves the same as row but the main-start and main-end points are permuted. « . Exactly what we want, no hack involved and thus perfect for our use case.

But it also has some disadvantages: It isn’t animatable and browser support is currently not as good (IE10+) as for transforms.

Specification: [W3C Working Draft](http://www.w3.org/TR/css3-flexbox/#propdef-flex-direction)
Browsersupport: [Can I use](http://caniuse.com/#feat=flexbox)
Animatable: no
Example (hover over list to reverse order): [http://jsbin.com/diqata/1](http://jsbin.com/girape/1/edit?output)

### Conclusion

If you are already using flexbox, flex-direction is probably the right choice. Though, if you want transitions or broader browser support the transform trick is a good alternative.

Know any other ways to reverse order with CSS, please let me know.