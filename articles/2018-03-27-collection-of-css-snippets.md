---
title: Collection of CSS snippets
description:
date: 2018-03-27T04:45:05+00:00
tags:
    - article
layout: layouts/post.njk
---

Some time ago I asked on twitter about the favorite CSS snippets people use regularly.

<blockquote>

What’s you favorite CSS snippets which you use again and again?

Rules:  
– Has to fit in one tweet  
– Has to be vanilla CSS (not Sass, Less…)  
– You don’t have to include vendor prefixes

Go!

— Michael Scharnagl (@justmarkup) [16\. März 2018](https://twitter.com/justmarkup/status/974573989497593856?ref_src=twsrc%5Etfw)
</blockquote>

A lot of people replied with great snippets. So, without further ado, here are the most mentioned ones:

“Responsive” media
-----------------------------------------

``` css
img,
video,
audio {
  max-width: 100%;
  height: auto;
}
```

Using this all the img, video and audio elements won’t be larger than 100% of the container width. This prevents a common issue where an image is larger than the width of the container and therefore causes an overflow. This is the easiest way to implement responsive images, but we have great support for `picture` and `srcset` now and should make use of them. Read more about it in this [great series](https://cloudfour.com/thinks/responsive-images-101-definitions/) where responsive images are explained in great detail.

Text selection
-----------------------------------

``` css
::selection {
  color: #000;
  background: #fbd404;
}
```

If you want to change the default browser style how a text looks when selected you can use the ::selection pseudo-element. Support is [pretty good](https://caniuse.com/#feat=css-selection). Read more about it on [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/::selection).

Clearfix
-----------------------

``` css
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
```

That’s one I have used in one or another form for many years. For older browsers we [used some hacks](https://css-tricks.com/snippets/css/clear-fix/), but nowadays we don’t need them anymore and can use this version. Some noted in the thread that clear is not needed anymore, as we have Flexbox and Grid now, but I have to disagree on this as float and clear still has its place and may ever have. In the future we may use [display: flow-root;](https://www.rachelandrew.co.uk/archives/2017/01/24/the-end-of-the-clearfix-hack/) instead of clear though.

Box sizing
---------------------------

``` css
html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}
```

The [box-sizing property](https://css-tricks.com/box-sizing/) can make building CSS layouts easier and a lot more intuitive. There is even an [International box-sizing Awareness Day](https://css-tricks.com/international-box-sizing-awareness-day/). Setting the value to `border-box` for `box-sizing` tells the browser to account for any border and padding in the values you specify for an element’s width and height. This means if you set an element’s width to 20em, it’s padding to 1em and it’s border-width to 10px, the element will still be 20em width in total.

Flexbox/Grid
----------------------------

There were some answers mentioning Flexbox or Grid, like this ones:

``` css
.fukol-grid {
  display: flex;
  flex-wrap: wrap;
  margin: -0.5em;
}
.fukol-grid > * {
  flex: 1 0 5em;
  margin: 0.5em;
}

.class {
  display: flex;
  justify-content: space-between;
}

::root {
  --min-col-width: 250px;
}

.overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--min-col-width), 1fr));
}
```

We have come a long way with defining layout using CSS. If you want to learn more about Flexbox and Grid I recommend [Grid by Example](https://gridbyexample.com/), the [Flexbox Guide on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox), the [Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) and [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) guides on CSS-Tricks and everything [Rachel Andrew](https://rachelandrew.co.uk/) and [Jen Simmons](http://jensimmons.com/) have ever written and said about Grid and Flexbox.

Center elements
----------------------------

Another one, many mentioned was some form of centering an element. When you look at all the stupid jokes made about CSS, it seems it is impossible to center elements in CSS. It may have been hard 10 years ago, but today there are many ways to center element vertically and horizontally.

Here are some of the replies mentioning centering.

``` css
.🦄 {
  display: flex;
  align-items: center;
  justify-content: center;
}

body {
  display: grid;
  place-items: center;
  height: 100vh;
}

.foo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate (-50%, -50%);
}
```

There are even more ways to center elements as you can read in this [guide](https://css-tricks.com/centering-css-complete-guide/).

Aspect ratio
-------------------------------

``` css
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;
}
.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.wrapper {
  /* 16:9 */
  --ratio-h: 16;
  --ratio-v: 9;

  height: 0;
  overflow: hidden;
  padding-top: calc(var(--ratio-v) / var(--ratio-h) * 100%);
  position: relative;
}

.wrapper > .element {
  height: auto;
  position: absolute;
  width: 100%;
}

div {
  --ratio-x: 16;
  --ratio-y: 9;
  position: relative;
}

div::before {
  display: block;
  content: "";
  padding-top: calc(var(--ratio-y) / var(--ratio-x) * 100%);
}
```

The padding-bottom hack (also called Instrinsic Ratios or [Aspect Ratio Boxes](https://css-tricks.com/aspect-ratio-boxes/)) has been used for [many years](https://alistapart.com/article/creating-intrinsic-ratios-for-video) now and even now and then people also come up with new ways like [this one using CSS Grid and SVG](https://codeburst.io/keeping-aspect-ratio-with-html-and-no-padding-tricks-40705656808b).

cursor:pointer
---------------------------

``` css
label, 
button, 
input, 
select { 
    cursor: pointer; 
}

label[for] {cursor: pointer;}
```

I first replied to this that it may not be a good idea to change the default cursor styles for form elements, but I am not sure anymore as many people mentioned that most people expect the pointer cursor for all interactive elements and not only for links.

Truncation
---------------------------

``` css
.ellipsis { 
    max-width: 200px; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap; 
}

.truncated {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 15rem;
}
```

At first this looks like a smart way, but truncating text with CSS can have many side-effects, as you may end up with unwanted words. I know that this is used often, but you should try to find another way if possible. I wrote about how to deal with long words [here](https://justmarkup.com/log/2015/07/dealing-with-long-words-in-css/).

Max-width
-------------------------

``` css
.container {
  width: calc(100% - 40px);
  max-width: 1200px;
  margin: 0 auto;
}

p {
  max-width: 75ch;
}

p {
  max-width: 38em;
}
```

Max-width and max-height are as their name says for defining the maximal width/height an element should be. I use this a lot for containers and also for text to keep line length at around 50 to 75 characerts. Here, the ch unit comes in handy.

Reduced motion
---------------------------

``` css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

On iOS and MacOS user can reduce motion via settings and we can and should react to this preference in our CSS and JavaScript Code. You can read more about it in this [article by Val Head](http://valhead.com/2017/06/23/reduced-motion-query/).

Responsive font-size
------------------------------------

``` css
:root {
  font-size: 12px;
}
@media (min-width: 768px) {
  :root {
    font-size: 14px;
  }
}
@media (min-width: 992px) {
  :root {
    font-size: 16px;
  }
}
@media (min-width: 1200px) {
  :root {
    font-size: 18px;
  }
}

.class {
  font-size: calc(1em + 1vw);
}
```

A combination of vw and em is great here as it will scale the text and at the same time won’t disable browser zoom.

Print external URLs
-------------------------------

``` css
@media print { 
    a { 
        text-decoration: underline; 
    } 
    [href]:not([href^="#"]):after { 
        content: ' ('attr(href)') '; 
    } 
}
```

Web pages are still printed sometimes and with this snippet you can make the URL of Links visible.

Visually hidden
----------------------------

``` css
.visually-hidden { 
    clip: rect(1px, 1px, 1px, 1px); 
    height: 1px; 
    overflow: hidden; 
    position: absolute; 
    white-space: nowrap; 
    width: 1px; 
}
```

This is another one I have used since the very beginning of me using CSS. This way you can make text available to screen readers while hiding it visually.

Normalize
-------------------------

``` css
abbr[title],
acronym[title],
dfn {
  cursor: help;
}

img {
  font-style: italic;
}

textarea {
  resize: vertical;
}

[disabled] {
  cursor: default;
}

[aria-disabled="true"] {
  cursor: default;
  pointer-events: none;
}

.no-js button[type="button"] {
  display: none;
}

svg {
  fill: currentColor;
}

sub,
sup {
  line-height: 0;
}

img {
  vertical-align: middle;
}

body {
  overscroll-behavior: none;
}
```

I mostly use [normalize.css](https://github.com/necolas/normalize.css/blob/master/normalize.css) as a starting point and copy all needed code from there. There is also [modern normalize](https://github.com/sindresorhus/modern-normalize).

Debugging
---------------------

``` css
* {
    border: 1px solid red:
}

img:not([alt]),
img[alt=""] {
  outline: 5px solid red;
}
```

Setting a red outline/border is the console.log of CSS debugging. If you want to find accessibility issues, there is [a11y.css](https://ffoodd.github.io/a11y.css/index.html) and if you want to find bad HTML there is [revenge.css](https://github.com/Heydon/REVENGE.CSS).

Box shadow
---------------------------

``` css
.classname {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
```

Seems like people really like the box shadows defined in Material Design.

Outline
---------------------

Various people also mentioned that they reset the outline property for all elements. This is a [bad idea](http://outlinenone.com/) if you don’t have other focus styles for all elements in place; Please never do this and always test the site using only your keyboard to find issues with `:focus`.

tel: Links
--------------------

``` css
a[href^="tel"] {
  white-space: nowrap;
  pointer-events: none;
  text-decoration: none;
  color: inherit;
}
@media (max-width: 30em) {
  a[href^="tel"] {
    pointer-events: auto;
    text-decoration: underline;
  }
}
```

I wish there would be a way to detect if an OS or and App installed there offers the option to make use of tel: links. Assuming bigger screens means that they can’t handle tel: links is not always true.

HTML for Emails
----------------------------

``` css
.★:not(#★){ /* for targeting AOL */} 
@media yahoo{/* for targeting Yahoo */} 
u+ .body .foo{/* for targeting Gmail */} 
#MessageWebViewDiv .foo{/* for targeting Samsung mail */} 
[OWA] .foo{/* for targeting http://Outlook.com  */}
```

I didn’t need to write any HTML for emails for year, but looks like this is still a mess and requires lots of hacks for different clients; Crazy stuff.

All snippets
------------

I haven’t mentioned all snippets here. If you want to see all snippets have a look at the [twitter thread](https://twitter.com/justmarkup/status/974573989497593856) or you can read also most of them in a curated [summary article](https://blog.wb.gy/css-snippest/) by [Ahmed Abdelsalam](https://twitter.com/geeksamu).