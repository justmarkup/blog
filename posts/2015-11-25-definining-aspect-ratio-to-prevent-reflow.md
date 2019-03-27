---
title: Definining aspect ratio to prevent reflow
description: 
date: 2015-11-25T12:21:50+00:00
tags:
    - article
layout: layouts/post.njk
---

When browsing the web (especially on a slow connection) it takes some time until images are loaded and the browser is able to calculate the necessary space needed. I often open an URL, start reading and half way down when the images are finally loaded, I lose the current position and have to scroll down and search the position I have been; This is frustrating.  

Here is an [example](http://jsbin.com/suyuwas/edit?html,css,output) showing the Reflow effect using Chrome and Network throttling set to 3G.

![Animated gif showing browsing a web site where an image creates a jump effect](https://justmarkup.com/log/wp-content/uploads/2015/10/reflow2.gif)  
Screencast showing the jump effect

There are different ways to prevent this jump effect. While you can avoid it by setting an explicit width and height for every image in your HTML we will concentrate on solutions suitable for responsive web sites where images don’t have a fixed width and height.

### padding-bottom hack

    .aspect-ratio-container {
      position: relative;
      padding-bottom: 56.25%; /* 16/9 aspect ratio */
      height: 0;
    }
    
    .aspect-ratio-container > * {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #eee; /* you could also define a background image as a placeholder here */
    }
    

[Example on jsbin](http://jsbin.com/nilemo/latest/edit?html,css,output).

The padding-bottom hack – [intrinsic ratios](http://alistapart.com/article/creating-intrinsic-ratios-for-video) – has been around for a while now. The only downside is that you need a container to wrap the element.

### calc()/vw based workaround

    
    body {
      width: 75em;
      max-width: 90vw;
      margin: 0 auto
    }
    
    img {
      width: 100%;
      height: auto;
      height: calc(9 * 90vw / 16);
      object-fit: cover;
      background-color: #eee;
    }
    
    @media all and (min-width: 75em) {
      img {
        max-width: 100%;
        height: auto;
        height: calc(9 * 75em / 16);
        object-fit: cover;
      }
    }
    

[Example on jsbin](http://jsbin.com/kezefu/latest/edit?html,css,output).

After trying several ways to set an aspect ratio without the need of a container I came up with a workaround using calc() and the vw (viewport width) unit.

The biggest disadvantage is that it only works for images spreading to the full width of the screen size.

Browser support is pretty good for [calc()](http://caniuse.com/#feat=calc) and [vw](http://caniuse.com/#feat=viewport-units).

### The aspect-ratio property

    
    /* set 16/9 aspect ratio for all images */
    img {
      aspect-ratio: 16/9;
    }
    

Tab Atkins already proposed a draft for an [aspect-ratio CSS property](http://www.xanthir.com/blog/b4810) in 2012. According to [Tab](https://twitter.com/tabatkins) the CSSWG does want to address it, but it’s been low priority for years. He also mentioned that the proposal has some serious problems:

If you want to have this property, write a reply to this thread on [Specifiction](http://discourse.wicg.io/t/css-aspect-ratio-proposal/540) to show your desire.

### Other elements

There are other elements like video/iframe and ads (inserted asynchronous and expanding the space) which can trigger an unwanted reflow. I recommend setting an aspect ratio for these elements as well. For banners you often have fixed units which gets inserted into the page according to screen size. Here is an example how you could handle this with CSS:

    
    /* On small screens show 320x50 banner */
    .ad-container {
      width: 320px;
      height: 50px;
    }
    
    /* On medium screens show 728x90 banner */
    @media all and (min-width: 800px) {
     .ad-container {
       width: 728px;
       height: 90px;
     }
    }
    
    /* On large screens show 970x90 banner */
    @media all and (min-width: 1000px) {
     .ad-container {
       width: 970px;
       height: 90px;
     }
    }
    

### Bottom line

If you are able to set a container the padding-bottom hack is a good way to prevent a Reflow. For images not having an extra container the calc()/vw solution is a good alternative. Until we have a native CSS solution to handle aspect ratios the mentioned workarounds are great to prevent the jump effect.