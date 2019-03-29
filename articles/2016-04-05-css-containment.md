---
title: CSS containment
description: 
date: 2016-04-05T10:04:11+00:00
oldUrl: https://justmarkup.com/log/2016/04/css-containment/
tags:
    - article
layout: layouts/post.njk
---

I haven’t heard about the [contain property](https://drafts.csswg.org/css-containment-3/) until some weeks ago when I asked about [use cases for container queries](https://justmarkup.com/log/2016/02/use-cases-for-container-queries/) on twitter and [David Baron](http://dbaron.org/) mentioned it in a [response](https://twitter.com/davidbaron/status/700417133251932160) saying that `contain: strict;` can avoid many of the theoretical problems of container queries. Since then I read the specification and everything I found about it trying to understand it; Here is what I learned.  

The contain property
--------------------

It’s a primitive for isolating style, layout, and paint. The contain property allows developers to limit a specific DOM sub-tree and the rest of the document; You can think of it like an iframe. Much like an iframe, this boundary establishes a new layout root, ensuring that DOM changes in the sub-tree never trigger reflows in the parent document.

> The contain property allows an author to indicate that an element and its contents are, as much as possible, independent of the rest of the document tree.
> 
> — [From the W3C Specification](https://drafts.csswg.org/css-containment-3/#contain-property)

none | strict | layout | style | paint | size | contain
-------------------------------------------------------

There are seven different values for the contain property.

*   **none** no effect
*   **layout** turns on layout containment
*   **style** turns on style containment
*   **paint** turns on paint containment
*   **size** turns on size containment
*   **content** all, except size containment
*   **strict** layout, style and paint combined

Use cases
---------

So far we know that by using CSS containment we can isolate elements from the rest of the document to mark them as independent parts. To show you where this can be helpful here are some use cases:

### Widgets

When integrating third-party widgets you mostly don’t have much control and they can decrease the site performance dramatically by doing expensive layout, style or paint operations. To make them independent from our site we can set `contain: strict;` for the most outer element of the third-party widget. This way, they won’t affect the performance of all the other parts of the page.

### Off-Screen

If you build a off-screen navigation or similar, the browser paints the content completely although it is not visible on load. By setting `contain: paint;` the user agent can skip the paint off the off-screen element and therefore paint all the other content faster.

Container queries
-----------------

As I already mentioned in the beginning, `contain: strict;` can [avoid many of the problems](https://github.com/ResponsiveImagesCG/container-queries/issues/3#issuecomment-185951645) of container queries. One of the “problems” of container queries is that the children and their content can have an effect on the size of the container. This can be avoided by using CSS containment.

Why can’t the browser do it automatically
-----------------------------------------

Browser engines already make a lot of optimization under the hood when possible, but each engine has its differences. Using containment provides a standard way for applications to indicate to the [user agent](https://www.w3.org/TR/UAAG20/#def-user-agent) that it can optimize certain layout cases, which browser would otherwise not be able to optimize.

Bottom line
-----------

If you build simple sites without tons of DOM nodes and widgets you probably don’t have to care about CSS containment. On the other hand, if you build more complex sites CSS containment will help to optimize the performance. It is also a good idea to set `contain: strict;` for third-party widgets to protect the performance of your site.

As always – test, test and test again. And not only test with fast network on a high-end machine, but test with old hardware and slow network. To get an idea how otheres experience your site you can also emulate the network speed and the CPU with Chrome Devtools.

Note: At the moment (April 2016) it is only supported in [Chrome](https://www.chromestatus.com/feature/6522186978295808).

**Update 06.04.2016:** You need to turn on the flag chrome://flags/#enable-experimental-web-platform-features in Chrome at the moment to test CSS containment.

**Update 20.05.2016:** Now enabled by default in [Chrome 52](https://www.chromestatus.com/feature/6522186978295808)

**Update 02.08.2016:** Added the values “size” and “content” from the last update from the specification