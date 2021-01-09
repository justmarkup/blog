---
title: Styling the details element
description: I recently worked on a FAQ page, and as I like semantic and accessible HTML I chose to use the details element to show the questions and answers.
ogImage: https://justmarkup.com/img/icons/icon-512x512.png
ogImageAlt: justmarkup
date: 2020-09-22T09:11:10+00:00
tags:
    - article
layout: layouts/post.njk
---

I recently worked on a FAQ page, and as I like semantic and accessible HTML I chose to use the ```<details>``` element to show the questions and answers. The default styling of ```<details>``` is pretty okay, but the designer had something different in mind, and so I had to find ways to style it according to the design specification.

In this article you will learn how to style the summary, change the default arrows, and how to animate the opening/closing.

## Style the summary

First I had to get rid of the default disclosure triangle.

The ```<summary>``` element supports the list-style property, so to remove the default triangle we can use list-style: none; to remove it. In theory, we are done now, the icon is removed, and we can add our own icon. Unfortunately, Chromium-based browsers do not support list-style on the summary element, so we additionally have to use the non-standard ```::-webkit-details-marker```

Here is the CSS to remove the icon in all modern browsers:

```css
summary {list-style: none}
summary::-webkit-details-marker {display: none; }
```

With this in place we can now add our own icons.

```css
details summary::before { 
  content:"🡒"; 
  color: red; 
  /* you can style it however you want, use background-image for example */
}

/* By using [open] we can define different styles when the disclosure widget is open */
details[open] summary::before { 
  content:"🡑"; 
  color: red 
}

```

## Animate it

The next issue was that the designer didn't like the abrupt opening/closing. To achieve this, we need a way to transition the height of the content. As you may know, transition doesn't work for height: auto; and while there are some [workarounds](https://css-tricks.com/using-css-transitions-auto-dimensions/) to still achieve this in CSS, this won't work for ```<details>```.

To still achieve this we therefore need JavaScript and here is my attempt.

``` css
@keyframes slideDown {
  0% {
    opacity: 0;
    height: 0;
  }
  100% {
    opacity: 1;
    height: var(--details-height-open, '100%');
  }
}

html {
  --details-transition-time: 400ms;
}

details {
  transition: all ease-out var(--details-transition-time, 0);
  max-height: var(--details-height-closed, auto);
}

details[open] {
  max-height: var(--details-height-open, auto);

}

details div {
  transition: all ease-out var(--details-transition-time, 0);
  max-height: var(--details-content-height-closed, auto);
  overflow: hidden;
  animation-name: slideDown;
  animation-duration: var(--details-transition-time);
}

details.is--open div {
  max-height: var(--details-content-height-open, auto);
}
```

```javascript
const details = document.querySelectorAll('details');

details.forEach(detail => {
  const detailContent = detail.querySelector('div');
  const detailClosedHeight = detail.scrollHeight;
  // open the details to get the height of the content
  detail.open = true;
  // pass it to the the element as CSS property
  detailContent.style.setProperty('--details-content-height-open', detailContent.scrollHeight + 'px');
  detail.style.setProperty('--details-height-open', detailContent.scrollHeight + detailClosedHeight + 'px');
  // close the details again
  detail.open = false;

  detailContent.style.setProperty('--details-content-height-closed', detailContent.scrollHeight + 'px');
  detail.style.setProperty('--details-height-closed', detailClosedHeight + 'px');

  detail.addEventListener('click', (ev) => {
    const container = ev.target.parentElement;
    // get time of transition from CSS property
    const timeout = getComputedStyle(container.querySelector('div')).getPropertyValue('--details-transition-time');
    
    // we can't use [open] as it will be only removed after the transition
    container.classList.toggle('is--open');
   
    // remove the open attribute once the transition is done, because otherwise we won't see the transition
    if (container.open) {
      ev.preventDefault();
      setTimeout(function() {
        container.open = false;
      }, parseInt(timeout))
    }
  })
});
```

Lets got through it line by line.

First, let's get all details in the DOM and iterate over them.

Next, we set the open attribute to true to get the actual height of the content, pass it to CSS using custom properties and remove the open attribute again.

After that we create an eventListener for the details element.

There we get the transition time defined in our CSS which we use further down.

Next we toggle the class is--open, which we need in CSS to make the transition work, as we can't use the open attribute for this. The reason is, that if we would use the transition on [open] it will only work when opening it, but not when closing it, as the content will transition, but the details will already be closed by then.

To avoid this, we set a timeout here with the value we set in CSS before via a custom property and remove the open attribute not before the transition is done.

As an extra for Chromium we have to use CSS animation for the opening, as transition somehow doesn't work there. To get it also working in Safari, we need also transition the height of the details itself.

## Reacting to preferences and screen changes

There is still some issue with this approach, if you resize the browser the height of the container will be either too small or too big.

```javascript
details.forEach(detail => {
  // ...code from above

  // this is the new part
  window.addEventListener('resize', (ev) => {
    // if the details is open, adjust height
    if (detail.classList.contains('is--open')) {
      detailContent.style.setProperty('--details-height-open', detailContent.scrollHeight + 'px');
      }
  });
});

```

To correct this, we listen on resize and if the details is currently open, we change the value of our CSS custom property, to adjust the height accordingly. This way the height of our details element is always as big as the content.

As a final step let's reduce the transition time to 1ms if the user prefers reduced motion.

```css
@media (prefers-reduced-motion: reduce) {
  details div {
    --details-transition-time: 1ms;
  }
}
```

With this in place we are done. The details element is now styled to our liking and there is a transition when opening/closing it.

You can find the final demo on [JS Bin](https://jsbin.com/wogeyey/1/edit?html,css,js,output).

## Resources

* [MDN: details](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details)
* [Using CSS Transitions on Auto Dimensions](https://css-tricks.com/using-css-transitions-auto-dimensions/)
* [Browser support for details](https://caniuse.com/details)

Update 24.09.2020: [Vadim Makeev](https://twitter.com/pepelsbey_) pointed out that the opening transition is not working in Chrome and Safari. And while I was 100% sure it did work at least in Chrome, they were absolutely right and it didn't work. To fix this in Chrome I added the animation.

Update 25.09.2020: Add workaround for Safari to transition also there the opening.