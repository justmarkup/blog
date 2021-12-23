---
title: Theme switcher using CSS custom properties
description: 
date: 2016-02-15T12:37:45+00:00
oldUrl: https://justmarkup.com/log/2016/02/theme-switcher-using-css-custom-properties/
tags:
    - article
layout: layouts/post.njk
---

[CSS custom properties](https://www.w3.org/TR/css-variables/) have been around for a while now and are currently supported in [three browser engines](http://caniuse.com/#feat=css-variables) (as of February 2016). When I first heard about CSS variables I was skeptical as I thought they will offer the same functionality as variables in pre-/post-processors. Some month later I stumbled across the spec and was [pretty excited](http://philipwalton.com/articles/why-im-excited-about-native-css-variables/) to find out that they are not really variables, but rather properties which are dynamic and scoped to the DOM. To show this in action I build a simple theme switcher demo.  

Feature detect
--------------

As we will use JavaScript to modify custom properties, the first thing we do is adding a detect to decide whether we will show the theme switcher or not.

``` js
if (window.CSS && window.CSS.supports && window.CSS.supports('--a', 0)) {
	// CSS custom properties supported.
} else {
	// CSS custom properties not supported
}
```

Setting custom properties in CSS
--------------------------------

Next we define some custom properties in our CSS. Here we have a –baseColor, –brandColor and –bgColor which we will use for various elements later in the CSS.

``` css
:root {
	--baseColor: #111;
	--brandColor: green;
	--bgColor: #eee;
}

h1 {
	color: green; /* provide fallback */
	color: var(--brandColor);
}
```

Modifying custom properties with JavaScript
-------------------------------------------

When selecting a theme we will change the properties with JavaScript, as shown here:

``` js
var root = document.querySelector(':root');
var htmlStyle = window.getComputedStyle(root);
htmlStyle.getPropertyValue('--baseColor');  // get the custom property --baseColor
root.style.setProperty("--baseColor", "red"); // set --baseColor to red
```

Full example
------------

Here is the HTML of the theme switcher, which is hidden by default and will be set to visible once the feature detect above returns true.

``` html
<label id="theme-changer" hidden>
	Choose theme
	<select name="theme" id="theme">
		<option data-baseColor="#111" data-bgColor="#eee" data-brandColor="green" value="default">default</option>
		<option data-baseColor="#444" data-bgColor="white" data-brandColor="#222" value="light">light</option>
		<option data-baseColor="white" data-bgColor="black" data-brandColor="#eee" value="dark">dark</option>
	</select>
</label>
```

Here is the full JavaScript for the theme switcher. As you can see I also save the current chosen theme in localStorage so users will get the selected theme on future visits.

``` js
// test for localStorage support
var hasLocalStorage = function () {
	var mod = 'a';
	try {
		localStorage.setItem(mod, mod);
		localStorage.removeItem(mod);
		return true;
	} catch (e) {
		return false;
	}
};

// test for CSS custom properties support
if (hasLocalStorage() && window.CSS && window.CSS.supports && window.CSS.supports('--a', 0)) {

	var themeChanger = document.querySelector('#theme-changer'),
			root = document.querySelector(':root'),
			themeInput = document.querySelector('#theme'),
			currentTheme = {
				baseColor: localStorage.getItem("baseColor") || '#111',
				bgColor: localStorage.getItem("bgColor") || '#eee',
				brandColor: localStorage.getItem("brandColor") || 'green'
			},
			selectOption;


	// show the theme changer
	themeChanger.classList.remove('hidden');
	themeChanger.removeAttribute('hidden');

	// change colors and save to localStorage
	themeInput.addEventListener('change', function (e) {

		// get selected option
		selectOption = this.options[this.selectedIndex];

		// change values to current theme
		currentTheme = {
			baseColor: selectOption.getAttribute('data-baseColor'),
			bgColor: selectOption.getAttribute('data-bgColor'),
			brandColor: selectOption.getAttribute('data-brandColor')
		};

		// change values of custom properties and save to localStorage
		for (var key in currentTheme) {
			root.style.setProperty("--" + key, currentTheme[key]);
			localStorage.setItem(key, currentTheme[key]);
		}
	});

	// set theme to previous choosen one
	window.onload = function(e) {

		// set option of current theme to selected
		document.querySelector('[data-baseColor="' + currentTheme.baseColor + '"]').selected = true;

		// get values of custom properties and apply
		for (var key in currentTheme) {
			root.style.setProperty("--" + key, currentTheme[key]);
		}
	}

} else {
	// CSS custom properties not supported - don't show the theme switcher
}
```

You can find the full [demo](https://justmarkup.com/demos/custom-prop/) here and the code is also available on [Github](https://github.com/justmarkup/demos/blob/gh-pages/theme-changer-css-custom-properties/index.html).

Update 20.02.2016: Change styles based on different className
-------------------------------------------------------------

As Tomáš Kapler points out in the comments you could also change the html class with JavaScript and change the properties based on the className:

``` css
:root {
	--baseColor: #111;
	--brandColor: green;
	--bgColor: #eee;
}
:root.light {
	--baseColor: #444;
	--bgColor: white;
	--brandColor: #222;
}
:root.dark {
	--baseColor: white;
	--brandColor: #eee;
	--bgColor: black;
}
```

Here is a [demo](https://justmarkup.com/demos/custom-prop/index1.html) using this method.

Conclusion
----------

As you can see, you can already use CSS custom properties as an enhancement today, but you should always provide a fallback and be careful when using them. If you only need static and lexically scoped variables you are probably better of by using a preprocessor until more browsers support custom properties.