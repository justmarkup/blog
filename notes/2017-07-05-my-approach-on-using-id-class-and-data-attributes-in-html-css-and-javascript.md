---
title: My approach on using id, class and data attributes in HTML, CSS and JavaScript
description: 
date: 2017-07-05T07:48:40+00:00
oldUrl: https://justmarkup.com/log/2017/07/my-approach-on-using-id-class-and-data-attributes-in-html-css-and-javascript/
tags:
    - note
layout: layouts/post.njk
---

Have you ever changed a class name in HTML and some time later got a bug report that a JavaScript functionality was not working anymore? I did and the issue was that the className was not only used as an attribute in HTML and as a selector in CSS, but has also been used by another developer in JavaScript. Over the years, working as a Frontend Developer I realized how important it is when and how to use `id`, `class` and `data` attributes in HTML, CSS and JavaScript.

So, I thought I share my current practise of using them.  

id
--

Let’s start with the [`id` attribute](https://developer.mozilla.org/en/docs/Web/HTML/Global_attributes/id). According to the [Specification](https://www.w3.org/TR/html5/dom.html#the-id-attribute) the value must be unique amongst all the IDs in the element’s home subtree and must contain at least one character.

While this is true in theory and will throw an error when [validating](https://validator.nu/) HTML with two identical id\`s, the page will render fine without an error in every browser and you can also style multiple id\`s with the same value in CSS and even use `document.querySelectorAll('#id');` and it will work fine as you can see in this [demo](http://jsbin.com/fewaziq/edit?html,css,js,output). Nevertheless, you should never use multiple id\`s with the same value on a page.

With that in mind, let’s have a look where the `id` attribute is useful and why.

#### Fragment identifier

The first use case for the `id` attribute is using it as a fragment identifier. This is really helpful to link to specific areas of a page, for example if you want to link to this section of this article you can add [#fragment-identifier](#fragment-identifier) to the url and link to it.

``` html
<h4 id="fragment-identifier">Fragment identifier</h4>
```

Another pattern where this is often used is a “back-to-top” link, you can add an id with the value of top to an element at the beginning of the page and add a link referencing it. The page will scroll to the top by clicking the link.

``` html
<a href="#top">Back to top</a>
```

#### ARIA

Another case where I use the id attribute is ARIA, for example aria-labelledby and aria-describedby.

``` html
<div>
    <label for="username">Your username</label>
    <input type="text" id="username" aria-describedby="username-tip" required>
    <div role="tooltip" id="username-tip">Your username is your email address</div>
</div>
```

Here is an [example](http://heydonworks.com/practical_aria_examples/#input-tooltip) from Heydon Pickering showing this in action.

#### Form elments

As you can see in the example above the id attribute is also used for form elements. By using an `id` on the input/textarea and an `for` attribute with same name for the label you associate both.

class
-----

As said in the beginning, I often used classNames as a selector in JavaScript which works fine most of the time but can lead to problems if you later change a className without remembering that it also has to be changed in JavaScript.

That’s why I use classNames only for styling.

``` css
.class {
    display: flex;
}
```

data attributes
---------------

I primarily use it in JavaScript, but also in CSS for different states.

``` js
var element = document.querySelector('[data-toggle]');

element.addEventListener('click', function () {
    if (this.hasAttribute("data-active")) {
    this.removeAttribute("data-active");
    } else {
    this.setAttribute("data-active", true);
    }
});
```

If I want to change a state in JavaScript I add/remove a data attribute, which I will use in CSS to define additional styles for it:

``` css
[data-active] {
    color: pink;
}
```

This way, I can immediately see which parts in HTML and CSS are dependent from JavaScript.

### Conclusion

Lately many people prefer to have HTML, CSS and JavaScript in one place, but I still prefer to separate them and with my current approach of using id, class and data attributes I can easily see in every file which part belongs to which language.

This approach alone won’t help much if you don’t have documentation in place, so be sure to always document your code in a way that the information will be available for every developer.