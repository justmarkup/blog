---
title: Handling states on resize using CSS custom properties
description: 
date: 2017-01-24T11:31:50+00:00
tags:
    - article
layout: layouts/post.njk
---

Last week, Scott Jehl asked: [Have your a11y assumptions/practices evolved w RWD?](https://twitter.com/scottjehl/status/821743412600832000), which reminded me to re-evaluate my current practise of handling states on resize. My current approach is [importing CSS breakpoints into JavaScript](https://www.lullabot.com/articles/importing-css-breakpoints-into-javascript) and handle the JavaScript based on the values from the `:before` pseudo elements defined in CSS. This way I don’t need to define the width/height where the elements should change in CSS and JavaScript, but only in CSS. While this is a great solution, it is also a hack and I think custom properties are better here.

So, let’s see how we can improve this using CSS custom properties.

Expandable menu
---------------

Throughout this article, we will use an expandable menu as our example. The idea is that the menu is fully visible on big screens and transforms into an expandable menu on small screens. Our basic markup looks like this:

``` html
<header role="banner">
	<a class="logo" href="/" title="Home">Logo</a>

	<nav role="navigation" id="menu" class="js-menu js--expandable">
		<ul>
			<li><a href="/">Link 1</a></li>
			<li><a href="/">Another Link</a></li>
			...
		</ul>
	</nav>
</header>
```

So, we have a header with our Logo and a navigation with multiple navigation items. I also added an id to the nav and two classes, which we will need later.

With this basic markup and some styles our header will look like the following on big screens and small screens. Users of old browsers will also get this along with the case where JavaScript fails.

![Screenshot of our example header on big screens](https://justmarkup.com/log/wp-content/uploads/2017/01/Observing-states-on-resize-using-custom-properties.png)

![Screenshot of our example header on small screens](https://justmarkup.com/log/wp-content/uploads/2017/01/Observing-states-on-resize-using-custom-properties1.png)

Now, let’s have a look at the JavaScript.

``` js
//CTM
if (window.CSS && CSS.supports('color', 'var(--primary)')) {

	var expandableElement = document.querySelector('.js--expandable');
	var header = document.querySelector('header');
	var menu = document.querySelector('.js-menu');
	var menuButton = document.createElement('button');
	var hasRun = false;

	function observeMenu() {

		var isExpandable = window.getComputedStyle(expandableElement).getPropertyValue('--expandable').trim();
		
		// check if --expandable is set to true
		if (isExpandable === 'true') {
						// add menu toggle button and eventListener if not already happened before
			if (!hasRun) {
				initToggleMenu();
			}
						// hide menu and show button
			menu.setAttribute('hidden', true);
			menuButton.removeAttribute('hidden');
			menu.setAttribute('aria-labelledby', 'menu-button');
		} else {
						// hide button and show menu
			menuButton.setAttribute('hidden', true);
			menu.removeAttribute('hidden');
			menu.removeAttribute('aria-labelledby');
		}

	};

	function initToggleMenu () {

		// Button properties
		menuButton.classList.add('menu-button');
		menuButton.setAttribute('id', 'menu-button');
		menuButton.setAttribute('aria-expanded', 'false');
		menuButton.setAttribute('aria-controls', 'menu');
		menuButton.innerHTML = 'Menu';
		
		// Menu properties
		menu.setAttribute('hidden', true);
		menu.setAttribute('aria-labelledby', 'menu-button');
		menu.classList.add(' is--expandable');
		
		// Add menu button to DOM
		header.insertBefore(menuButton, menu);


		// handle click on menu button
		menuButton.addEventListener('click', function () {

			if (!menu.hasAttribute('hidden')) {
				// Hide
				menu.setAttribute('hidden', true);
				menuButton.setAttribute('aria-expanded', 'false');
			} else {
				// Show
				menu.removeAttribute('hidden');
				menuButton.setAttribute('aria-expanded', 'true');
			}
		}, false);

		hasRun = true;

	};

	observeMenu();
	
	window.addEventListener('resize', observeMenu, true);
	
}
```

It is pretty long, so let’s go through this step by step. First, we have a [Cut the mustard](http://responsivenews.co.uk/post/18948466399/cutting-the-mustard) check, so only supported browsers will run the JavaScript. Next, we define some variables with our needed elements as well as a Boolean value we will use later to check if the button has already been created.

After that, we create a function called `observeMenu` which we will execute on page load and on every resize. Within the function we first get the CSS custom property named `--expandable`, based on which we will decide if the menu should be expandable or not.

Here is the CSS we use to set the custom property. On small screens we set it to `true` and once there is enough space to show it in one line, we set it to `false`

``` css
.js--expandable {
	--expandable: true;
}

@media all and (min-width: 50em) {
	.js--expandable {
		--expandable: false;
	}
}
```

Back in our `observeMenu` function, if `isExpandable` is true, we first check if we already added the menu, and if not add it. Futhermore we change some attributes based on the `isExpandable` variable.

Next, we have a function called `initToggleMenu`, within we create the menu button to toggle the menu and also add an click event listener for our button.  
Lastly in the function we set the variable `hasRun` to `true` so the menu button only gets added once. Add the end we call our `observeMenu` function and listen to it onresize.

With that in place our menu is now expandable on small screens (if the browser supports custom properties) while still looking the same in other browsers and on big screens.

![Screenshot of our example menu showing the closed state](https://justmarkup.com/log/wp-content/uploads/2017/01/Observing-states-on-resize-using-custom-properties2.png)

Here is a [Demo](https://justmarkup.com/demos/observe-onresize-css-custom-properties/) and the code is also available on [Github](https://github.com/justmarkup/demos/blob/gh-pages/observe-onresize-css-custom-properties/index.html).

Conclusion
----------

While this solution may not always be the best option, due to [browser support of CSS custom properties](http://caniuse.com/#feat=css-variables) it is great as an enhancement for menus or other components. I already have some use cases in my mind that I am looking forward to use in upcoming projects.

Overall, I think this is a great use case for custom properties and it feels a lot less hacky than using `:before` pseudo elements.