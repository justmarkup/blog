---
title: Loading and replacing HTML parts with HTML
description: In this article I would like to describe an idea to load and replace HTML with HTML and why browsers could do it best.
ogImage: https://justmarkup.com/img/icons/icon-512x512.png
ogImageAlt: justmarkup
date: 2020-12-28T15:11:08+00:00
tags:
    - note
layout: layouts/post.njk
---

In the last weeks there has been another round of approaches about loading [HTML]( https://hotwire.dev/) and [server-rendered components](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html). We had the option to only load and replace some parts of an HTML page for over [20 years](https://en.wikipedia.org/wiki/Ajax_(programming)) with JavaScript, and even longer by using [framesets](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/frameset). The idea is always the same, replace only some parts of HTML instead of loading everything again. There has been many approaches to load and replace parts of a document and there will be many more. This got me thinking again. What if we can do that with HTML properly. In this article I would like to describe an idea to load and replace HTML with HTML and why browsers could do it best.

**Disclaimer:** I am probably not the first one thinking about such an approach, but I couldn't find any article describing. If you know about one, please let me [know](mailto:hallo@justmarkup.com).

## The idea

Let's get straight to the basic idea with an example:

```html
<a href="/another-article.html" target="#main">Another article</a>
<main id="main"></main>
```

So, if a user clicks on the link, there will be no page reload, instead the browser will fetch another-article.html, parse the HTML, look for the first element with the id of main, and replaces the content on the page the link was triggered.

This means, by adding two attributes in our HTML to make a connection we can get SPA-like loading experiences. The browser will do the job, they would also replace the title of the page, not load any requests outside our target, take care of focus and browser history and probably also about caching and more.

This feature should make simple things simple and also possible to achieve more complicated things, which I will explain later down.

**Note:** We would need another attribute, as using a value like "#main" for target currently opens the page in a new tab - which is not what we want as a fallback.

## Let the browser do the job

This can all be done already today using JavaScript, but to make this accessible and robust you need to take care of a lot of stuff and handle edge cases you might never think of. This is hard. Do you handle focus properly, do you update the title correctly, do you handle errors correctly and much more? So, why not let the browser to the job.

## Accessibility build-in

HTML is accessible by default, at least [mostly](https://daverupert.com/2020/02/html-the-inaccessible-parts/). This is a big advantage over any approach using JavaScript to replace HTML - doing it with JavaScript means you have to take care of accessibility for yourself, and it is easy to do it wrong. By using HTML it is less likely that we will mess it up, on top of it is also a lot more robust, if there are any JavaScript errors it will still work.

There are a lot of intelligent people writing specifications and implementing this in browsers. They know their job and I have more trust in native features over any tool/library to make something accessible. It would make it also a lot easier for assistive technologies to adapt to this.

## Easily enhanceable

As said above I would like to make it as simple as possible to use this, but also give developers tools to handle more complicated use cases.

### Enhance with JavaScript

On top of the HTML part, there could be JavaScript events we can listen to. There could be an event when the fetch starts, one while the browser is loading and parsing the document and one once it is done.

```javascript
const myElement = document.getElementById('main');

myElement.addEventListener("beforeload", function(event) {
  console.log("The user triggered a change of the content");
});

myElement.addEventListener("loading", function(event) {
  console.log("The content is loading");
});

myElement.addEventListener("loaded", function(event) {
  console.log("Successfully replaced the HTML of #main");
});
```

There may be even more events, but this would already make it possible to add transitions and animations and more and improve the loading experience even more.

### Enhance with CSS

Speaking of transitions and animations, why not also implement a new CSS pseudo-class on top of it.

```css
main:loading {
  filter: blur(5px);
}

main:loading:before {
  content: "Loading";
}
```

This would make it very easy to implement the loading experience we are used from SPA today.

We also may want to change the styling of the current active navigation item, so we could get another pseudo-class there as well, which will check the value of the href attribute and if it matches will apply the styles, something like:

```css
a:active-link {
  font-weight: bold;
}
```

## Enhance with request header

You might wonder why my idea is based on the idea to fetch the whole document, and not only parts of it, say you have the full html and then only the HTML of main at another-article.content.html. This would require quite some changes to implement and not every developer might be able to generate two versions. The simple should be simple principle.

The browser could however send a header for these types of links, say something like:

```css
link-target: #main
```

This way developers could check for the header on the backend and only send back the HTML required.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Another article</title>
</head>
<body>
  <main id="main">
    <h1>Another article</h1>
    <p>Lorem</p>
  </main>
</body>
</html>
```

This would reduce the page load even more.

## Conclusion

Does this make sense at all, or is it a bad idea? Please let me [know](mailto:hallo@justmarkup.com).

There are of course many details missing here, but I really would like HTML to be more powerful, and I think showing other content without a full page reload is something people wanted for decades and will probably also want in the future, so it may be worth to see if we can do this in HTML.

To be honest, I had to write this down, because I was thinking about this for way too long, and by writing it and publishing it, it is out of my head and I can focus on other things again.

I would still like to follow-up on this and will open an issue about this in the [GitHub repo](https://github.com/w3c/html) of the W3C in the new year.

## References

*   Hotwire [https://hotwire.dev/](https://hotwire.dev/)
*   React Server Components [https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html)
*   HTML: The Inaccessible Parts [https://daverupert.com/2020/02/html-the-inaccessible-parts/](https://daverupert.com/2020/02/html-the-inaccessible-parts/)
*   Smaller HTML Payloads with Service Workers [https://philipwalton.com/articles/smaller-html-payloads-with-service-workers/](https://philipwalton.com/articles/smaller-html-payloads-with-service-workers/)
