---
title: Loading… and how css can help
description: 
date: 2012-02-05T16:27:05+00:00
oldUrl: https://justmarkup.com/log/2012/02/loading-and-how-css-can-help/
tags:
    - article
layout: layouts/post.njk
---

The simplest form of showing an animated Loading… has been around since the early days of Internet Explorer. The [marquee element](http://en.wikipedia.org/wiki/Marquee_element) and his counterpart the even worse [blink element](http://en.wikipedia.org/wiki/Blink_element) has never been part of the w3c specifications because of their terrible usability and accessibility.  
  
Nevertheless at least the marquee still works in most browsers nowadays.

Loading...

Please have a look (don’t try it at home):

Loading…

### Loading… the right way?

After playing around a bit with css3 animations and pseudo elements here is my solution. Have a look at the [dabblet](http://dabblet.com/gist/1712390) if you wanna play around with it.

Loading, please wait

``` css
@keyframes load {
	0% {left: 0; background-color: #ddd}
	50% {left: 80px; opacity: 0.8; width: 70px}
	100% {left: 200px; width: 20px; opacity: 1; background-color: #ddd}
}

@keyframes hideload {
	0% {background-color: #fff}
	100% {background-color: #fff}
}

#progress:before {
	position: absolute;
	z-index: 1;
	content: "";
	width: 300px;
	height: 20px;
	animation: hideload 2400ms infinite alternate
}

#progress:after {
	content: "";
	z-index: 2;
	position: absolute;
	left: 0;
	border-radius: 4px;
	width: 20px;
	height: 20px;
	animation: load 2400ms infinite alternate
}
```

You probably have seen much more fancy loading bars but I wanted a solution which is also compatible with older browsers and more accessible. If you remove the animations from the pseudo elements you will see how it looks like in older browsers and although not tested how screen readers will read it.

Just the phrase “Loading, please wait”.

To achieve that I used the simple trick to hide the text via the animation on :after immediately. This way all browsers with no support for animation simple see the phrase while browsers with support see the loading animation.

What’s your solution?