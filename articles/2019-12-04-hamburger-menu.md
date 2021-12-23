---
title: Do's and Don'ts of implementing a hamburger menu
description: The infamous hamburger menu is one of the examples were I see bad practise very often. A look at good and bad examples of the hamburger menu.
ogImage: https://justmarkup.com/img/hamburger-menu.png
ogImageAlt: Button with the hamburger icon on the left and the word Menu on the right.
date: 2019-12-04T09:20:43+00:00
tags:
    - article
layout: layouts/post.njk
---

The infamous hamburger menu is one of the examples where I see bad practice very often. Surf the web one day using a screen reader or using only your keyboard and you will most likely experience some of the problems as well. Let's have a look at the most common errors and how to avoid them.

## Using the hamburger menu

Before even thinking about the best way to implement a hamburger menu, one should ask if it is even needed at all. There are various [Responsive](https://bradfrost.com/blog/post/responsive-nav-patterns/) [Navigation](https://www.smashingmagazine.com/2017/04/overview-responsive-navigation-patterns/) [Patterns](https://responsivenavigation.net/) to use instead. Lately, there is also the trend to use a hamburger menu on large screens – while this may look fancy – it means that users have to click two times to go to one of the listed pages. So, if there is space, it is better to directly show all navigation items and only hide them behind the hamburger toggle on small screens.

Okay, so you still think a hamburger menu is the best choice for the site you are building? Let's see what to consider when implementing it.

## The icon

We start with the hamburger icon, also referred to as Navicon. Let's start with some bad examples and see what better alternatives there are available.

Many use the Unicode sign for ['IDENTICAL TO' (U+2261)](http://www.fileformat.info/info/unicode/char/2261/browsertest.htm) or the one for ['TRIGRAM FOR HEAVEN' (U+2630)](http://www.fileformat.info/info/unicode/char/2630/browsertest.htm) to visually show the three lines. The first problem with this approach of showing the icon is, that not all browsers support these Unicode signs and also not all fonts do, which means these users will see a square  □ (also called tofu or [replacement Glyph](http://unicode.org/glossary/#replacement_glyph]) instead of the three lines. 

The bigger problem with this approach is that screen readers may announce the U+2630 sign as ["the trigram for heaven"](https://www.htmhell.dev/11-the-trigram-for-heaven/). 

We could use something like:

```html
<button class="nav-toggle" aria-expanded="false" aria-controls="menu">
  <span aria-hidden="true">☰</span> Menu
</button>
```

to hide the glyph for screen readers, so only the word "Menu" would get announced, but we may still run into browser/font support problems. Another approach many used and sadly still use is using an icon font. Regarding this, I can only say –  [Seriously, Don’t Use Icon Fonts](https://cloudfour.com/thinks/seriously-dont-use-icon-fonts/).

Now that we know, what not to use, see some good examples to achieve this. The first way is to use an ```<img>```, with an empty alt attribute as it is purely decorative.

```html
<button class="nav-toggle" aria-expanded="false" aria-controls="menu">
  <img src="menu.svg" alt="">
  Menu
</button>
```

We could also rebuild the three lines with CSS using box-shadow, gradient or borders and a [pseudo element](https://css-tricks.com/three-line-menu-navicon/#article-header-id-1).

Another approach would be to use an SVG directly in the HTML. In this case, you have to set ```aria-hidden="true"``` and ```focusable="false``` for the SVG element, as described here by [Sara Soueidan](https://www.sarasoueidan.com/blog/accessible-icon-buttons/#icon-sitting-next-to-text).

***Really bad***: Use Unicode without aria hidden. Use icon font.
***Still not good***: Use Unicode icon with aria hidden
***Good***: Use img, CSS or an SVG and not use the icon alone

## The toggle button

Now let's move on to the toggle button. As you hopefully guessed right, it is called button because we should use a real ```<button>```. Still, many people sadly use ```<span>``` or ```<div>``` or ```<a>``` for the toggle button. Many argue that a ```<button>``` is hard to style with CSS, but this is not true and you can quite easily [reset the styles](https://hankchizljaw.com/wrote/introducing-the-button-element/#heading-oh-these-are-hard-to-style-though) so it looks like a ```<span>``` or ```<div>```. 

The same is true if you think using a ```<a>``` is the right choice here. It is not, a link is called a link because it is used to link to other pages or other parts of the pages and not to provide functionality.

Great, now that we know we have to use a ```<button>```, you may think that it is the best way to server-side render it because client-side rendering is all bad, right? As much this is true for content, it is not for interactive elements which are pretty much useless without JavaScript.

First let's start with the fallback version which works completely without JavaScript and shows all navigation items directly.

```html
<nav>
    <div hidden data-menu-button>
      Menu
    </div>
    <ul id="menu" data-menu>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/shop">Shop</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>
```

See the div there, didn't I just say that we should never use a ```div``` for a button? Yes, this is still right, but this is only a placeholder that we will later replace with a real ```<button>```. We also use the hidden attribute here to hide it, so it won't be visible and also will not be announced by screen readers.

Another alternative is to use a ```<a>``` with an anchor link to the navigation in the footer. In both ways the navigation is still accessible if JavaScript fails and no useless buttons are shown.

Now, let's enhance that when JavaScript is available and ready.

```javascript
(function() {
  const fakeButton = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');

  const toggleMenuButton = document.createElement('button');
  toggleMenuButton.textContent = fakeButton.textContent;
  toggleMenuButton.setAttribute('aria-expanded', false);
  toggleMenuButton.setAttribute('aria-controls', 'menu');
  toggleMenuButton.classList.add('nav__toggle');

  fakeButton.parentNode.replaceChild(toggleMenuButton, fakeButton);

  toggleMenuButton.addEventListener('click', function() {
    let expanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !expanded);
    menu.hidden = !menu.hidden;
  });

  menu.hidden = true;
})()
```

Here we replace the fake button with a real ```<button>```, add ```aria-expanded``` and ```aria-controls``` attributes and add an EventListener which toggles the visibility of our menu and also updates the ARIA attributes accordingly. You can find an unstyled example of this on [JS Bin](https://output.jsbin.com/jagupinila).

We now have all the functionality we want and still make the navigation available if JavaScript fails. 

***Really bad***: Use anything else as a real button element
***Still not good***: Render the button server-side
***Good***: Use a client-side generated button with appropriate ARIA

## The checkbox hack

At this point you may wonder – Isn't there a CSS-only way to achieve this? You may also remember hearing about a way to toggle content using the so-called Checkbox Hack and may consider using that. Please don't, as it involves some usability and accessibility concerns. So, forget that it even exists.

***Really bad***: Even thinking about using it.

## Styling and user preferences

Okay, as a last step let's see what can go wrong with styling and why we should respect user preferences.

First, you should, as always, check the contrast ratio, for example using this [tool](https://whocanuse.com/). You should also check the navigation in high-contrast mode.
Also, make sure that the click target of the links is big enough.

Be also sure to test it with small screens. I have quite often seen navigation with lots of links, but only the half of it where reachable to the user, so make sure to use ```overflow: auto``` if your navigation is fixed to make the list scrollable.

Also, if you are applying animations and or transitions for the show/hide effect, make use of the [reduced motion media query](https://css-tricks.com/revisiting-prefers-reduced-motion-the-reduced-motion-media-query/) to minimize/avoid these effects for everyone who prefers reduced motion.

***Really bad***: Low contrast, too small click areas
***Good***: Tested in high-contrast mode, great contrast, large click area and respecting user preference

## Conclusion

First of all, think twice before hiding content at the first place – avoiding extra clicks for the users is always a good idea. If you need to hide the navigation behind a toggle button, only do it on smaller screens where there is not enough space available and not on large screens where they would perfectly fit.

Use an image, a SVG or a CSS approach to show the hamburger icon, avoid using the Unicode character or an icon font. It is also a good idea to show real text next to the icon, a simple "Menu" will do the trick. While the hamburger icon may be used by a lot of sites and apps, many people still have no idea what it means.

Provide a basic version in case JavaScript fails, so users could at least continue to your other pages.

Use a client-side generated ```<button>``` to toggle the menu and always use the appropriate ARIA properties to make it accessible.

Last but not least, be sure to test your implementation with screen readers, only your keyboard and in high-contrast mode – you know, the basic tests you should make for every component and page you are building.

Happy coding!

## Resources

* [Accessible Icon Buttons](https://www.sarasoueidan.com/blog/accessible-icon-buttons/) by Sara Soueidan
* [Three Line Menu Navicon](https://css-tricks.com/three-line-menu-navicon/) by Chris Coyier 
* [Browser Test Page for Unicode Character 'IDENTICAL TO' (U+2261)](http://www.fileformat.info/info/unicode/char/2261/browsertest.htm)
* [Browser Test Page for Unicode Character 'TRIGRAM FOR HEAVEN' (U+2630)](http://www.fileformat.info/info/unicode/char/2630/browsertest.htm)
* [HTMHELL - #11 The trigram for heaven](https://www.htmhell.dev/11-the-trigram-for-heaven/)
* [Seriously, Don’t Use Icon Fonts](https://cloudfour.com/thinks/seriously-dont-use-icon-fonts/) by Tyler Sticka
* [Responsive Navigation Patterns](https://bradfrost.com/blog/post/responsive-nav-patterns/) by Brad Frost
* [Accessible Mobile Navigation](https://www.a11ymatters.com/pattern/mobile-nav/) by Ahmad Shadeed
* [A Brief Overview On Responsive Navigation Patterns](https://www.smashingmagazine.com/2017/04/overview-responsive-navigation-patterns/) by Chris Poteet
* [Adventures in Responsive Navigation](https://responsivenavigation.net/) by Erick Arbé
* [Introducing the Button element](https://hankchizljaw.com/wrote/introducing-the-button-element/) by Andy Bell
* [The link to button enhancement](https://justmarkup.com/articles/2019-01-21-the-link-to-button-enhancement/)
* [Who can use](https://whocanuse.com/) by Corey Ginnivan
* [Revisiting prefers-reduced-motion, the reduced motion media query](https://css-tricks.com/revisiting-prefers-reduced-motion-the-reduced-motion-media-query/) by Eric Bailey