---
title: The link to button enhancement
description:
date: 2019-01-21T17:21:01+00:00
tags:
    - article
layout: layouts/post.njk
---

One of the enhancement patterns I use quite a lot is transforming a link to a button – a link to a new page becomes a button which opens a dialog with the content, an on-page link to the navigation becomes a button to toggle the visibility of the navigation. In this article, I would like to explain why it is often useful to transform a link to a button, how to enhance a login link and why a button not associated with a form is useless without JavaScript.

The button element
------------------

Before we start, some basics about the [button element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button). To quote MDN here:

> The HTML &lt;button&gt; element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.

One thing I have to add here is:

> A &lt;button&gt; not associated with a form is useless without JavaScript.

This means you should either create &lt;button&gt; outside forms with JavaScript or use the hidden attribute and remove it with JavaScript afterwards.

And there is more, if you use a &lt;button&gt; in an &lt;form&gt; it will be treated as &lt;button type="submit&gt; – so if you want a button inside a form not to send the form set type=”button” on it.

After refreshing our knowledge about the &lt;button&gt; element, let’s see how we can transform a link to a button.

Transforming a link to a button
-------------------------------

It all starts with a link:

    <a href="anotherpage.html">Link to another page</a>
    

Once this is rendered in the browser, people can use it to navigate to a new page – no matter what input/output device they are using. The can disable CSS, something can break the JavaScript on the page – the link will still work.

Now, let’s enhance the link to a button:

    (function() {
      const wannabeButtons = document.querySelectorAll('[data-button]');
    
      Array.prototype.forEach.call(wannabeButtons, wannabeButton => {
        
        wannabeButton.outerHTML = `
          <button data-link="${wannabeButton.href}">
            ${wannabeButton.textContent}
          </button>
        `;
    
        const btn = document.querySelector('[data-link="' + wannabeButton.href + '"]')
    
        btn.onclick = () => {
          console.log('clicked the button')  
        }
        
      })
    })()
    

First, we get all links on the page with the data-button (can be anything, but I like to give elements I want to enhance a data atttribute) attribute. We loop over all of them and replace the `outerHTML`, so the link becomes and actual &lt;button&gt;. Next we save a reference to the new button by using the data-link attribute we set before on it. This way we can now add event listeners on it and so on.

This basic example is useless this way as you may notice, all we did was replacing the link with a button without defining what action should happen after activating the button. So, let’s move on to a real example to show how to enhance a basic link to a page to a button opening an dialog with the main content of the page.

An example: A login dialog
--------------------------

It all starts again with a link to our login page, which is probably defined inside our main navigation on the page:

    <a href="login.html" data-open-overlay>Login</a>
    

Once a user visits the link, they can login to the site – all good. Now enhance this to show an overlay/dialog with the login form. We will use [A11y Dialog](https://github.com/edenspiekermann/a11y-dialog) here to create an accessible dialog window.

First, we include the CSS, JavaScript and HTML for the A11y Dialog on our site. We will also include a JavaScript file called script.js with our custom JavaScript.

    <!doctype html>
    <html lang="en">
    
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Login Link to Login Overlay</title>
        <link rel="stylesheet" href="./style.css" />
    </head>
    
    <body>
        <div id="content" class="content">
            <header>
                <nav>
                    <ul>
                        <li><a href="./" aria-current="page">Home</a></li>
                        <li><a href="login.html" data-open-overlay>Login</a></li>
                        <li><a href="anotherpage.html">Another page</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <h1>Login Link to Login Overlay example</h1>
    
                <p>Some Content here</p>
            </main>
            <footer>
                <p>The footer of the page</p>
            </footer>
        </div>
    
        <div id="dialog" class="dialog" hidden>
            <div role="dialog" class="dialog-content">
                <button type="button" class="dialog-close" data-a11y-dialog-hide aria-label="Close this dialog window">
                &times;
                </button>
    
                <div data-dialog-content></div>
            </div>
        </div>
    
        <script type="module" src="a11y-dialog.js"></script>
        <script type="module" src="script.js"></script>
    </body>
    
    </html>
    

You may have noticed that we use type=”module” for the scripts here, this way the JavaScript will be loaded and run as expected in modern browsers and ignored in older browser not [supporting](https://caniuse.com/#feat=es6-module) it. This also means we can use modern JavaScript features in our script.js.

Now move on to the script.js and the actual enhancement.

    (function() {
        var dialogOpeners = document.querySelectorAll('[data-open-overlay]') || false;
    
        if (dialogOpeners && dialogOpeners.length > 0) {
            Array.prototype.forEach.call(dialogOpeners, dialogOpener => {
                var dialogContent = document.querySelector('[data-dialog-content]');
                window.dialog = false;
    
                if (!window.dialog) {
                    var dialogElement = document.getElementById('dialog');
                    var mainEl = document.querySelector('#content');
                    window.dialog = new A11yDialog(dialogElement, mainEl);
    
                    dialogElement.removeAttribute('hidden');
    
                    window.dialog.on('hide', function(dialogEl, event) {
                        dialogContent.innerHTML = '';
                    });
                }
    
                dialogOpener.outerHTML = `
                    <button data-link="${dialogOpener.href}" >
                       ${dialogOpener.textContent}
                    </button>
                `;
    
                dialogOpener = document.querySelector('[data-link="' + dialogOpener.href + '"]');
    
                dialogOpener.addEventListener('click', function(ev) {
                    var link = this.dataset.link ? this.dataset.link : false;
    
                    if (link) {
    
                        fetch(link)
                            .then(function(response) {
                                return response.text();
                            })
                            .then(function(html) {
                                var parser = new DOMParser();
                                var doc = parser.parseFromString(html, "text/html");
                                var pageContent = doc.querySelector('#main');
                                dialogContent.innerHTML = '';
    
                                if (dialogContent && pageContent) {
                                    dialogContent.innerHTML = pageContent.innerHTML;
                                    window.dialog.show();
                                } else {
                                    document.location = link;
                                }
    
                            })
                            .catch(function(err) {
                                console.log('Failed to fetch page: ', err);
                                document.location = link;
                            });
                        ev.preventDefault();
                    }
    
                });
            });
        }
    }());
    

Let’s go through it. We get all links with the attribute data-open-overlay and loop over them. Next, we reference the element with the attribute data-dialog-content where we will later insert the login form and the dialog itself. After that, we transform the link to a button, as already shown above.

Now the event listener for our button. There we check if the link has the data-link attribute set (we filled this with the href of the original link before). If it does, we use fetch to get the text content of the page. Once we get it, we use [DOMParser](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser) to get only the HTML inside `<main id="main">` of login.html. Now that we have the HTML, we insert it into our dialog content element defined above and show the dialog.

So, now if the user clicks on Login an Overlay with the Login form will open. If the user is using an older browser or if anything goes wrong with the fetch of the login form they will be redirected to login.html and can still login.

If you want to see it in action, here is a [demo](https://justmarkup.github.io/demos/link-to-button/) and you can also view the code on [Github](https://github.com/justmarkup/demos/tree/gh-pages/link-to-button).

Happy enhancing!