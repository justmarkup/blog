---
title: Scale an element without changing the size of its child elements
description: 
date: 2015-11-27T11:55:43+00:00
oldUrl: https://justmarkup.com/log/2015/11/scale-an-element-without-changing-the-size-of-its-child-elements/
tags:
    - article
layout: layouts/post.njk
---

This morning I asked on [twitter](https://twitter.com/justmarkup/status/670170551000965120) for help with using `transform: scale();` The first problem was that I wanted to animate the box the same way with `scale();` as with changing the width/height of the element. The problem here was I wrongly set `transform-origin: 0 0;` only on :hover but not for the inital state; Thanks to [Sven Wolfermann](https://twitter.com/maddesigns) for the hint.

### Don’t scale the children

The second problem was that I wanted to change the size of the element but not the size of its children (text). My first attempt was using `transform: scale(2);` for the box (div) and `transform: scale(0.5);` for the child element (p). This way the text had the same size before and after the transition but slightly changed the size during the animation and also looked very blur and ugly along the way as you can see in this [example](http://jsbin.com/dekaci/edit?html,css,output).

After some different approaches I thought about using `::before` to achive the same effect. I first thought it doesn’t work (was confused regarding box model and layers – see below) but it turned out to achive exactly what I wanted; Scale an element without effecting the size of its child elements.

``` css
div {
  width: 100px;
  height: 100px;
  margin: 100px;
  position: relative;
}
div:before {
  z-index: -1;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100px;
  height: 100px;
  background: red;
  transform-origin: 0 0;
  transition: all 8s;
}

div:hover:before {
  transform: scale(2);
}
```

Here is an [example](http://jsbin.com/siwitix/edit?html,css,output) showing the animation using scale on the div itself (first box) and using scale on div:before (second box).

### Bottom line

By setting transform on the element the element gets an own [layer](http://www.html5rocks.com/en/tutorials/speed/layers/) which does not effect the size of the box model. This means an element with `width: 100px; transform: scale(2);` will still have an `offsetWidth` and `getAttribute("width")` of 100px; as you can see in the [console](http://jsbin.com/pudawe/edit?html,js,console,output) output here.

If you really want to change the content width/content height of a box you have to change a property effecting the [box model](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model) (width/height, margin, padding, border). They all trigger layout and repaint and are therefore expensive to animate so if you only want to “visually” change the size of an element use transform.