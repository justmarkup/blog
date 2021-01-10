---
title: Make the page count of a 3D book visible using CSS custom properties
description: How to use CSS custom properties to adapt the depth of a 3D book showing how many pages the book has
ogImage: https://justmarkup.com/img/3d-book-v1.png
ogImageAlt: Final demo showing the book World Wide Waste - How Digital Is Killing Our Planet-and What We Can Do About It by Gerry McGovern
date: 2021-01-12T14:34:10+00:00
tags:
    - article
layout: layouts/post.njk
---

I am currently building a book section for this site and thought it would be cool to show the books in 3D and also to make it visible how many pages a book has. In this article I would like to show you how to use CSS custom properties to adapt the depth of a 3D book showing how many pages the book has.

## 3D Book in CSS

There are many [resources](https://freefrontend.com/css-book-effects/) and [code examples](https://codepen.io/poulamic/pen/RwrKqmb) how to build a [3D Book](https://codepen.io/mina-mounir/pen/gOPppdv) in CSS. As a starting point I used [this](https://scastiel.dev/posts/2020-07-23-animated-3d-book-css/).

Here is the HTML for creating the book:

```html
<div class="book">
  <div class="book__wrapper">
    <img class="book__cover" src="/books/world-wide-waste.jpg" alt="World Wide Waste: How Digital Is Killing Our Planet-and What We Can Do About It by Gerry McGovern "/>
  </div>
</div>

```

And here is the CSS:

```css
.book {
  width: 200px;
  height: 300px;
  margin: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 400px;
}

.book__wrapper {
  transform: rotateY(-30deg);
  position: relative;
  transform-style: preserve-3d;
  width: 200px;
  height: 300px;
  transition: transform 1s ease;
}

.book__cover {
  position: absolute;
  background: #0d47a1aa;
  width: 200px;
  height: 300px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  box-shadow: 5px 5px 20px #666;
}

.book__wrapper::before {
  content: ' ';
  background: #fff;
  height: calc(300px - 2 * 3px);
  width: 50px;
  top: 3px;
  position: absolute;
  transform: translateX(calc(200px - 50px / 2 - 3px)) rotateY(90deg) translateX(calc(50px / 2))
}

.book__wrapper::after {
  content: ' ';
  position: absolute;
  left: 0;
  width: 200px;
  height: 300px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  background: #01060f;
  transform: translateZ(-50px);
  box-shadow: -10px 0 50px 10px #666;
}
```

<div style="max-width: 400px;">

![Screenshot of the above demo showing the book World Wide Waste - How Digital Is Killing Our Planet-and What We Can Do About It by Gerry McGovern](https://justmarkup.com/img/3d-book-v1.png)

</div>

Demo: [https://jsbin.com/nuzaten/1/edit?html,css,output](https://jsbin.com/nuzaten/1/edit?html,css,output)

## Customize via CSS custom properties

This looks already really great, so now enhance this and change the depth of the book based on the pages of the book.

First let's define a range – I decided to increase the depth every 50 pages, starting from 50 pages and ending at 1000 pages.

```css
html {
  --page-count: 50;
  --page-count-range: clamp(1, calc(var(--page-count) / 50), 20);
  --page-width: calc(10px * var(--page-count-range));
}
/* only showing the updated stuff here */
.book__wrapper::before {
  width: var(--page-width);
  transform: translateX(calc(200px - var(--page-width) / 2 - 3px)) rotateY(90deg) translateX(calc(calc(var(--page-width)) / 2))
}

.book__wrapper::after {
  transform: translateZ(calc(var(--page-width) * -1));
}
```

Let's go through this.

First, we set three CSS custom properties whereas the first one defines the actual page count.

In the second one it is getting interesting. There we use clamp() to define our minimum as 1 (50 pages or fewer), our preferred value (page count divided by 50) and a maximum of 20 (1000 pages or more).

In the last property we multiply the range by 10px, so we can use that in our CSS for the transform and width properties that we need to adapt.

If you open the [demo](https://jsbin.com/dozadun/3/edit?html,css,output) you can change the --page-count property to see how the depth changes. And that's it. With some small changes, the depth of the book is now reactive. CSS: What a wonderful language!

That was a fun challenge and can't wait to share my book section where you will see this in action.

## Resources

Demo: [https://jsbin.com/dozadun/3/edit?html,css,output](https://jsbin.com/dozadun/3/edit?html,css,output)
[Create an animated 3D book in CSS, step by step](https://scastiel.dev/posts/2020-07-23-animated-3d-book-css/)
