---
title: Teaser with multiple links
description: In this article we will have a look at the possible options to make all the elements of a teaser link-able and their advantages and disadvantages.
ogImage: https://justmarkup.com/img/teaser.png
ogImageAlt: A teaser with a headline, an image, some text and a Read More link
date: 2020-02-21T07:56:12+00:00
tags:
    - article
layout: layouts/post.njk
---

Cards, teaser, preview blocks – there are many different ways to name them – one thing they all have in common is that they usually consist of a headline, an image, some text and a read more link. The other similarity is that all these elements should link to the same goal. In theory, writing the HTML for this pattern seems pretty straightforward, but there are some accessibility concerns which may not be obvious at a first glance.

In this article we will have a look at the possible options to make all the elements link-able and their advantages and disadvantages.

## Extra link for each element

One option to make all the elements (image, headline, ...) link-able, would be to define an extra link for each element.

```html
<article>
  <h2>
    <a href="/bestarticle">Headline</a>
  </h2>
  <a href="/bestarticle">
    <img src="bestimage.jpg" alt="Best image">
  </a>
  <p>Some text</p>
  <a href="/bestarticle">Read more <span class="visually-hidden">about Headline</span></a>
</article>
```

If you happen to use a mouse or touch device this sounds like a good way to define the HTML. If you use a screen reader or are a keyboard user this isn't. The problem with this approach is the redundancy – as a keyboard user you have to tab three times to get to the next teaser, as a screen reader user you will get announced the same link three times as well.

### Advantages

- You can define extra :hover/:focus states for each element
- Every text is selectable
- The context menu works as expected (e.g. option to open link in a new tab)

### Disadvantages

- A lot of redundancy for many users, which makes it inaccessible

You may wonder now, we have three advantages and only on disadvantage – what's the problem? The problem is that this approach is not fully accessible and we never want to ship inaccessible code.

Let's see what other options we have.

## One block link

Since HTML5 you can create so-called [Block Level Links](http://html5doctor.com/block-level-links-in-html-5/). This means, instead of a link for each element, we can use one link around all our elements.

```html
<article>
  <a href="/bestarticle">
    <h2>
      Headline
    </h2>
    <img src="bestimage.jpg" alt="Best image">
    <p>Some text</p>
    <p>Read more <span class="visually-hidden">about Headline</span></p>
  </a>
</article>
```

### Advantages

- The context menu works as expected (e.g. option to open link in a new tab)
- No link redundancy

### Disadvantages

- You can't define extra :hover/:focus states for each element
- Selecting individual text parts is pretty hard
- Screen readers may announce all the text, which can be annoying

From an accessible point of view this is better than having the redundancy problem, but it comes with other disadvantages, so let's see at yet another approach.

## An absolute link

Our next approach is to use an absolute link. The idea is to have only one inline link in the HTML, and use ::before to stretch that link around the whole teaser.

```html
<article>
  <h2>Headline</h2>
  <img src="bestimage.jpg" alt="Best image">
  <p>Some text</p>
  <a class="readmore" href="/bestarticle">Read more <span class="visually-hidden">about Headline</span></a>
</article>
```

With this HTML alone only the Read More Link would be clickable, so let's add some CSS to expand the click area to the whole teaser.

```css
article {
  position: relative;
}

.readmore::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
```

Now with the CSS added you can click everywhere on the teaser.

### Advantages

- The context menu works as expected (e.g. option to open link in a new tab)
- No link redundancy

### Disadvantages

- You can't define extra :hover/:focus states for each element
- Selecting individual text parts is pretty hard

## JavaScript all the things

How could I forget about JavaScript? JavaScript is the best, it makes everything better. So let's see how to handle this with good old JavaScript.

```html
<article>
  <h2>Headline</h2>
  <img src="bestimage.jpg" alt="Best image">
  <p>Some text</p>
  <a class="readmore" href="/bestarticle">Read more <span class="visually-hidden">about Headline</span></a>
</article>
```

We start with the same HTML as in the previous example, but instead of using CSS we will now "enhance" it with JavaScript.

```javascript
const article = document.querySelector('article');
article.addEventListener('click', function () {
  const link = this.querySelector('a');
  link.click();
})
```

So, every time the user clicks on any part of our teaser we trigger a click on the Read More link. To avoid that a click is triggered when a user wants to select some text, we can use this [method](https://inclusive-components.design/cards/#theredundantclickevent) described by [Heydon Pickering](https://twitter.com/heydonworks) to only trigger the click after a 200 millisecond threshold.

### Advantages

- Selecting text is possible with some extra effort
- No link redundancy

### Disadvantages

- The context menu doesn't work anymore (e.g. option to open link in a new tab)

All in all, this approach seems pretty good, but the non-working context menu is a big no-go for me and JavaScript is just too fragile to make this a great solution.

## Conclusion

As you can see, there is no real winner here. All the approaches have their disadvantages. Personally, I prefer to use the absolute link approach, as I often don't need individual :hover/:focus styles and I am okay with the disadvantage of not being able to select text there, as on the full article the text will be select-able. And it offers the best experience for keyboard and screen reader users.

If you came as far, go and read more about building cards elements on [Inclusive Components](https://inclusive-components.design/cards/).