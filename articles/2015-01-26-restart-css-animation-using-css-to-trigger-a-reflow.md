---
title: Restart CSS Animation (using CSS to trigger a reflow)
description: 
date: 2015-01-26T19:13:34+00:00
oldUrl: https://justmarkup.com/log/2015/01/restart-css-animation-using-css-to-trigger-a-reflow/
tags:
    - article
layout: layouts/post.njk
---

Lately, I wanted to run an animation on page load and the same animation again on :hover. After some debugging I figured out this doesn’t work as expected.

Here is the simplified CSS showing my problem:

``` css
/* a simple animation */
@keyframes test {
  0% {background: red;}
  100% {background: blue;}
}

div {
  animation: test 4s ease-out;
}

/* run the animation again on hover, won't work this way */
div:hover {
  animation: test 4s ease-out;
}
```

After a quick search, I came across this [article on css-tricks.com](http://css-tricks.com/restart-css-animation/) where Chris and Oli show techniques to solve this problem. The conclusion is that you can either use JavaScript or as Oli Studholme [researched](http://dabblet.com/gist/1656494), use an identical @keyframes animation with a different name for :hover. As the article and research are quite old (in terms of web development 4 years is actually really old) I started a new jsbin and tried to find a different solution. After some trial and error, I found another way using CSS.

So here it is:

``` css
/* a simple animation */
@keyframes test {
  0% {background: red;}
  100% {background: blue;}
}

/* Trigger reflow */
@-webkit-keyframes test1 {
  to {width: auto;}
}

div {
  animation: test 4s ease-out;
}

/* run the animation again and again on hover, check! */
div:hover {
  animation-name: test1;
}
```

The trick is to add a second animation, which animates the width (can also be auto as you can see, so the width won’t change actually) to trigger reflow, to :hover. Try it out on [jsbin](http://jsbin.com/fafedu/1/edit?html,css,output).

It’s working in Firefox, Opera, Chrome and IE10 upwards.

Any question? Contact [me](https://twitter.com/justmarkup).