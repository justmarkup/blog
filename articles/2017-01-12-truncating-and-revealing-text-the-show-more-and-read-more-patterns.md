---
title: Truncating and revealing text  – The Show More and Read More patterns
description: 
date: 2017-01-12T18:28:18+00:00
oldUrl: https://justmarkup.com/log/2017/01/truncating-and-revealing-text-the-show-more-and-read-more-patterns/
tags:
    - article
layout: layouts/post.njk
---

Truncating text and revealing text on the web is very common and I have to deal with these patterns almost on every project I work on. There are many situations where people want to have expandable text. In this article, I will cover the Show More pattern (toggling text on user gesture) and the Read More pattern (Show full content on user gesture).

Show More
---------

Let’s start with the Show More Pattern – where you have a short text and a button to reveal the longer text. Without the markup needed for the reveal function the HTML may look like this:

``` html
<article>
	<h2>Headline</h2>
	<p>Some text. Some text. Some text.</p>
	<div>
		<p>Some more text. Some more text. Some more text. Some more text.
		Some more text. Some more text. Some more text.</p>
		<p>Some more text. Some more text. Some more text. Some more text.
		Some more text. Some more text. Some more text.</p>
	</div>
</article>
```

We can use a JavaScript or CSS-based method to add the toggle functionality. First, let’s see how we can achieve it with JavaScript.

### Using JavaScript

To start with, we modify the HTML and add a button to toggle the content and an id attribute on the “full text” wrapper element to associate it with the toggle button.

``` html
<article>
	<h2>Headline</h2>
	<p>Some text</p>
	<div id="more-1" class="fulltext">
		<p>Some more text</p>
	</div>
	<button aria-expanded="false" aria-controls="more-1" class="toggle-content" hidden><span class="text">Show More</span> <span class="visually-hidden">about Headline</span></button>
</article>
```

On the button we add two attributes `aria-expanded="false"` and `aria-controls="more-1"` for better accessibility. We also set the attribute `hidden` so the button is hidden by default when the full text is not hidden as well. We also add some extra text for context, more on this later.

With that in place, it will still look and behave the same as before (featured text and full text shown, toggle button hidden). This means that when JavaScript fails/is not available the user will still be able to read the full text.

Now, we add some JavaScript to enhance this and toggle the full text.

``` js
// cut the mustard
if ('querySelector' in document && 
	'addEventListener' in window) {

	var toggleButtons = document.querySelectorAll('.toggle-content');
	var fullTextWrappers = document.querySelectorAll('.fulltext');
	var fullText;
	var toggleButtonText;
	

	[].forEach.call(fullTextWrappers, function(fullTextWrapper) {
		// hide all full text on load
		fullTextWrapper.setAttribute('hidden', true);
	});

	[].forEach.call(toggleButtons, function(toggleButton) {
		// show toggle more buttons
		toggleButton.removeAttribute('hidden');

		// add listener for each button
		toggleButton.addEventListener('click', function () {

			fullTextWrapper = this.parentElement.querySelector('.fulltext');
			toggleButtonText = this.querySelector('.text');

			// change attributes and text if full text is shown/hidden
			if (!fullTextWrapper.hasAttribute('hidden')) {
				toggleButtonText.innerText = 'Show More';
				fullTextWrapper.setAttribute('hidden', true);
				toggleButton.setAttribute('aria-expanded', false);
			} else {
				toggleButtonText.innerText = 'Show Less';
				fullTextWrapper.removeAttribute('hidden');
				toggleButton.setAttribute('aria-expanded', true);
			}
		});
	});
}
```

We start by [cutting the mustard](https://justmarkup.com/log/2015/02/cut-the-mustard-revisited/), so users using old browsers not supporting `querySelector` or `addEventListener` will get the “No-JavaScript Version” and can still read everything, while all other will get the enhanced version.

Next, we define some variables we will need later and go through all full-text elements and hide them. After that, we loop over every toggle button, show it and add an listener. Within the listener, we check if the full text is hidden or not and based on this show/hide the text and change the text and `aria-expanded` attribute of the button.

Demo: [Using JavaScript to toggle content](https://justmarkup.com/demos/toggle-content/showmore/with-js/), there is also a [version with jQuery](https://justmarkup.com/demos/toggle-content/showmore/with-jquery/)

Code: [Using JavaScript](https://github.com/justmarkup/demos/blob/gh-pages/toggle-content/showmore/with-js/index.html) and the one [using jQuery](https://github.com/justmarkup/demos/blob/gh-pages/toggle-content/showmore/with-jquery/index.html)

Next, we have a look at how to achieve the same functionality without JavaScript.

### Using :target

For this, we make use of the [Target Trick](https://bitsofco.de/the-target-trick/) to show/hide content based on the fragment identifier (hash) of the URL.

First, we change the Markup of our initial example:

``` html
<article id="less-1">
	<h2>Headline</h2>
	<p>Text.</p>

	<div class="fulltext" id="more-1">
		<a class="more" href="#more-1">Show more <span class="visually-hidden">about Headline</span></a>

		<p>More Text</p>

		<a class="less" href="#less-1">Show less <span class="visually-hidden">about Headline</span></a>

	</div>
</article>
```

Here, we add an id attribute to the outer article element (to jump back there when hidding the content), an id attribute to the full text and two links (one to show and one to hide the full text).

Next, we add some CSS:

``` css
.fulltext p,
.less {
	display: none;
}

.fulltext:target p,
.fulltext:target .less {
	display: block;
}

.fulltext:target .more {
	display: none;
}
```

Per default, we hide the full text and the Show Less link. If the full text container is targeted (`.fulltext:target`) we show the full text and Show Less link and hide the Show More link.

Example: [Using :target to toggle content](https://justmarkup.com/demos/toggle-content/showmore/with-target)  
Code: [of the :target version on Github](https://github.com/justmarkup/demos/blob/gh-pages/toggle-content/showmore/with-target/index.html)

Note: You could also use the [Checkbox Hack](http://css-tricks.com/the-checkbox-hack/) to achieve a [toggle content pattern](https://codepen.io/Idered/pen/AeBgF) without JavaScript.

Summary
-------

For this pattern I personally prefer a progressive enhanced JavaScript-based version because there won’t be the page jump as with the :target version and while I enjoy tricks/hacks with CSS I think that behaviour should be done in JavaScript if there are no disadvantages over a CSS solution.

Whatever solution you choose, be sure to test if it is accessible and what happens if the something goes wrong.

Read More
---------

Next, we will have a look at the Read More pattern.

``` html
<article>
	<h2>Article</h2>
	<p>Text. <a class="more" href="/article/#more">Read More <span class="visually-hidden">about Article</span></a></p>

</article>
```

This is a very common pattern for article overview pages and while it is in use for ages there are still two issues many don’t think of.

Cutting text
------------

Truncating text on the web often seems an easy job at a first glance, but there are many ways to solve it and a lot of things which can go wrong.

“Very important person is dead…Read More”  
while the whole sentence would be  
“Very important person is dead serious about solving the problem.”

While I haven’t seen exactly this example, I have seen [many](https://twitter.com/cabel/status/808783680353116160) [examples](https://twitter.com/planetmoney/status/809577279349227520) where truncating text completely changed the meaning of a word or sentence. Sometimes this is funny, but it can also be abusive and offensive.

That’s why you shouldn’t truncate text automatically if possible. In many CMS authors can define the featured text and where the Read More should appear. This way you will always know where the text is truncated and won’t run into a shitstorm because of wrongly truncated text. If manual truncating is not possible, at least truncate after sentences.

Providing context
-----------------

As shown in all examples above, I added an extra text for all Read/Show More/Less buttons and links with the class `.visually-hidden`.

``` html
<a class="more" href="/article/#more">Read Mor <span class="visually-hidden">about Article</span></a>
```

``` css
.visually-hidden {
	clip: rect(1px, 1px, 1px, 1px);
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
	width: 1px;
}
a:hover .visually-hidden,
a:focus .visually-hidden,
button:hover .visually-hidden,
button:focus .visually-hidden {
	position: relative;
	margin: 0;
}
```

This text is visually hidden, but will be announced by screen readers. This is really useful as otherwise they may hear “Read More” multiple times, but don’t know where the link will lead to as the context is missing. For the examples above, I also decided to show the text if you hover or focus any of the links or buttons to see what text you are going to hide/show if there are multiple.

Conclusion
----------

Be nice to your users, try to avoid automatic text truncation and always think about cases where something can go wrong. You don’t want to have hidden text which can’t be expanded because of a JavaScript error.