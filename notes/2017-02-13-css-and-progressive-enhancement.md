---
title: CSS and progressive enhancement
description: 
date: 2017-02-13T14:33:50+00:00
tags:
    - note
layout: layouts/post.njk
---

When people talk about progressive enhancement it is often reduced to JavaScript. It involves much more – accessibility, performance, robustness… and also CSS. Badly written CSS can make a site as usable as a JavaScript error or using non-semantic HTML.

Let’s see why CSS can fail, why fallbacks are important and how to progressively enhance CSS.

Fallbacks
---------

CSS has changed a lot in the last years. More and more properties were added and while some are now supported in all modern browsers some only work in one or two browsers. In any way, we can often make use of the architecture of CSS. If a browser doesn’t know a property it will simple skip it without throwing an error. Let’s have a look at an example to demonstrate this:

    h2 {
      color: black;
      color: rgba(0,0,0,0.9);
    }
    

In this case all browsers supporting rgba() will use the rgba() value for the color property. However, browsers not supporting rgba() will ignore this and use the value “black” for the color. In this example there won’t be much harm for users as the default value for color for h2 is already black, so browsers not supporting rgba() would still show the h2 in black, but there are other cases where this can lead to unusable content or unreadable text.

    h2 {
      background: rgba(0,0,0,0.9);
      color: white;
    }
    

Let’s see how different browsers handle this example. Modern browsers supporting rgba() will show a white headline on a semi-transparent black background; Great. Browsers not supporting rgba() will show a white headline on a white background (assuming you haven’t changed the background-color of the element or parent elements), which means it won’t be visually shown for these users; Not great at all.

You probably don’t need to set a fallback for every new CSS property, but you should make sure that the content is still usable in browsers where the new CSS property is not supported. If not sure, better use a fallback.

Feature tests
-------------

Lately, there was a new rule defined in CSS – the @supports rule. You can think of it like a feature query. It gives you the possibility to check in CSS if a CSS feature is supported. Let’s have a look at an example:

    header h1 {
    	font-size: 70px;
    	color: green;
    	padding: 0;
    	margin: 0;
    	text-align: center;
    }
    
    @supports (mix-blend-mode: screen) {
    	header {
    		padding: 0;
    		background-image: url(https://justmarkup.com/iceland/img/l/DSCF3732.JPG);
    		background-size: cover;
    		background-repeat: no-repeat;
    		width: 100%;
    		min-height: 56vw;
    		display: flex;
    		align-items: center;
    		justify-content: center;
    	}
    	header h1 {
    		color: rgba(55,255,255,0.8);
    		mix-blend-mode: screen;
    		line-height: 0.5;
    	}
    }
    

Our default (not enhanced) style for our main headline is a big, green font.

![Screenshot of the default style - showing the word Iceland in green ](https://justmarkup.com/log/wp-content/uploads/2017/02/fallback.png)

This looks okay, but we want to enhance this with new CSS features – in our case with mix-blend-mode and a background. To do this, we first define our feature test `@supports (mix-blend-mode: screen) {}`. If the browser supports `@supports` and `mix-blend-mode` the CSS defined within our feature test will be applied. In this case, we set a background image, define the height to 56vw (so the image will maintain 16/9 ratio), add mix-blend-mode to the text and adapt the line-height as well as centering the text.

![Screenshot of the enhanced version with background and mix-blend-mode applied](https://justmarkup.com/log/wp-content/uploads/2017/02/with-supports-and-mix-blend-mode-1.png)

By using feature queries we can provide an enhanced version without breaking the site for unsupported browsers. Exactly, how I think progressive enhancement should work.

Here is the demo as a [JS Bin](http://jsbin.com/sawaqu/edit?css,output) if you want to see it in action.

You can find more information about using feature queries in this great [article](https://hacks.mozilla.org/2016/08/using-feature-queries-in-css/) by Jen Simmons.

Custom properties
-----------------

Some new CSS properties only make sense to use for certain scenarios – custom properties (CSS variables) are a good example.

    :root {--theme-color: gray;}
    .element {
      background-color: gray;
      background-color: var(--theme-color, gray);
    }

In this example, we first set our `--theme-color` to gray, next in the selector `.element` we first define a fallback for browsers not supporting custom-properties and after that set the background-color to our defined –theme-color. If you wonder why I defined gray inside var() `var(--theme-color, gray)` here, that’s because if we would not have defined –theme-color in `:root` before it would fallback to the value after the comma, in this case “gray”. To use CSS with custom properties responsible today (as there are still a lot of browsers not supporting custom properties), we would have to define a fallback and a custom property with another fallback.

So if you only want to store values in CSS you better use pre/post processing as they give you the same result in every browser whereas with custom properties you would either need to set a fallback every time or only modern browser would get the styles you defined with custom properties. But, if you want to have advanced features like property changes and changing properties [depending on the cascade](https://drafts.csswg.org/css-variables/#example-a4134550) go for custom properties.

If you want to implement the option to change the theme of your site, custom properties are a great way for this. You define the custom properties in CSS, all with a fallback to the default theme values, use JavaScript on your site to check if the browser supports custom properties and if this is the case offer an interface for users to change colors, sizes… A great enhancement without harm for any user.

CSS only
--------

As someone working on the front-end you have probably heard of css-only or pure CSS. It is mostly used to show what amazing things can be done with CSS only. Mostly they also require HTML and should better be called No-JavaScript examples. The biggest problem many of this examples have is that the CSS is used for interactivity and often is not accessible. They often use the [Checkbox Hack](https://css-tricks.com/the-checkbox-hack/) or make use of `:target`.

Don\`t get me wrong, I am often very impressed by some of the examples, but the same way you shouldn’t use JavaScript to imitate HTML elements you shouldn’t use CSS for parts where JavaScript should be used.

    <span onclick="javascript:window.location.href='https://justmarkup.com'; return false;">justmarkup.com</span>

I have been guilty this myself and used `:target` for expandable navigation, but now prefer to deliver a full shown navigation as a fallback and use JavaScript and ARIA to enhance the navigation and make it expandable. You can improve the style as much as you wan,t but you should be careful when trying to add interactivity with CSS.

ads.css
-------

Imagine a developer wrote a lot of styles and now names the file ads.css. If you wonder about the name, the developer speaks german and “ads” stands for “alle diese styles” (“all these styles”). It is all working fine until someone reports that the styles are not loading for them. The developer tries to reproduce it by testing in various browsers, with different extensions, on different network connections… but couldn’t find out why it is not loading for some users. After some time he finds the problem, these users are using an adblocker which blocks the loading of ads.css because of the name “Ads”.

While I haven’t seen this case in production, I saw bug reports from sites, where a developer used `body class="ad">` and the site was showing a white screen instead of the content because of an adblocker blocking every content inside elements with the class ad, ads or advertisement. Better avoid naming anything in your CSS, HTML, JavaScript related to ads if it has nothing to do with ads.

The takeaway here is that anything can happen and it is not guaranteed that your CSS will always be loaded (bad connection, CDN being down…) and applied (extension interfering for example). That’s why the HTML used is not only important for SEO, screen readers, … but also if the CSS will have no effect.

HTML structure
--------------

Using `<h2>Headline</h2>` will not only add semantics, but will also be visually remarkable as a headline without CSS because of the default styles the h2 gets from the browser, using `<p class="h2">Headline</p>` on the other hand will be shown as a paragraph with no hint that it is a headline if the CSS fails to load.

### Change order with CSS

Sometimes, we want to visually change the order of elements with CSS. We can do that with various properties (flexbox, grid, position…). As an example, let’s say we have a content area and a sidebar. On small devices we want to show the content area first and the sidebar underneath it, on bigger screens we want to show the sidebar on the left side of the screen and the content area on the right side.

![Screenshot showing the different order on small and big screens](https://justmarkup.com/log/wp-content/uploads/2017/02/css-order.png)

When writing the HTML we should always ask how the logical order should be. In this case, we want to have the content first and the sidebar after that because the content is the most important part and the sidebar contains additional information.

By changing the order with CSS it won’t change the DOM order and it will also not effect the accessibility tree. This means, screen readers for example, will always get the information of the content area first and the one of the sidebar after that.

Note: It can get confusing for [keyboard users](http://tink.uk/flexbox-the-keyboard-navigation-disconnect/), as by changing the order with CSS the visual presentation changes, but not the tab order, which means there may be a lot of jumping from here to there to there when using the keyboard.

Conclusion
----------

As with every other part on the web (and everywhere else) it is important to act responsible. While it is unlikely that a missing fallback or using an unknown CSS property will break the whole site, there is a good chance some parts won’t work as expected for some users. This is not about delivering the same styles and experience in every browser – it is about not completely breaking it for some users.

CSS can fail too, be prepared.