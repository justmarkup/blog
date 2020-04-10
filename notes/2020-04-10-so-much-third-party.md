---
title: A poll, third-party, assumptions, and some tips
description: Why we ship so much third-party code and things to consider when using third-party code
ogImage: https://justmarkup.com/img/icons/icon-512x512.png
ogImageAlt: justmarkup
date: 2020-04-10T11:54:10+00:00
tags:
    - note
layout: layouts/post.njk
---

Last week I started a poll on twitter to find out how much we rely on third-party code in front end. I asked the people how much of their JavaScript and CSS code is third-party. 

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">On average, how much of all the KB of JavaScript you ship, are written by yourself versus third-party code?</p>&mdash; Michael Scharnagl (@justmarkup) <a href="https://twitter.com/justmarkup/status/1245333877012475904?ref_src=twsrc%5Etfw">April 1, 2020</a></blockquote>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Next round: CSS<br><br>On average, how much of all the KB of CSS you ship, are written by yourself versus third-party code?</p>&mdash; Michael Scharnagl (@justmarkup) <a href="https://twitter.com/justmarkup/status/1246693972380209153?ref_src=twsrc%5Etfw">April 5, 2020</a></blockquote> 

As is the tradition with every poll you post, you make assumptions, so here we go.

## More third-party JavaScript than third-party CSS

More than 50% said that their JavaScript is mostly third-party code, while only 3% said the same for CSS. This isn't very surprising though, while there are various CSS frameworks like Foundation or Bootstrap, you still have to adjust and write your own CSS on top of it. This may be also the issue many have with CSS, you have to master it alone.

For JavaScript it is quite different, first there are a lot of JavaScript frameworks and libraries which already comes with a lot of components and other stuff to build your UI. On top of that there is often a solution for a problem just one npm install away. Need to sort some data, search for 'sort' in the npm registry and you most certainly will find a solution and a documentation along with it  - Boom, another third-party script added.

Talking about npm, let's move on.

## What does fast mean?

On the server it doesn't really matter how big a package is. Even the cheapest hosting packages offer some GB of space. What matters is execution time. If there are two packages offering the same functionality, say a function to sort numbers. If one package is 1 MB and another one is only 10 kB, but the one with 100 MB is twice as fast (say 10ms instead of 20ms) you would choose the 1 MB package, even though it requires 100x the space of the 10 kB package. If 1.000.000 people request your site and every time the sort function is executed, you only need the space once, but can deliver the result 1.000.000x twice as fast, or instead of in 20.000.000ms in 10.000.000ms.

On the client it is a different story. While execution time is also important, it is also really important how many kB the user has to download before they can even make use of it. If we would have to decide if we would use the 1 MB package or the 10 kB package you should go with the 10 kB package, even if it takes twice as long. If 1.000.000 users need to download the file with the sort function, they would have to download 1.000.000 MB, but only 10.000 MB if we have chosen to ship the 10 kB package.

npm was originally a package manager for Node.js (JavaScript running on the server), but lately it is also used a lot for JavaScript running on the client. The issue is that they are quite different as outlined above and while some package may be the best solution on the server, the same package may be the worst solution on the client.

One example often cited is [moment](https://www.npmjs.com/package/moment) - "A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates." as they market it. Lightweight means in this case about 232 kB of JavaScript. On the server this is no problem at all, but on the client this is way too much.

## What makes a good third-party package?

To finish this with something useful, here are some things you should consider before using a third-party script.

### 1. Well maintained

Before using a package you should check on npm/Github/Gitlab... if the package is still actively maintained. When was the last release? How many people work on this project? Are the open issues monitored, or was there no response for a longer time?

All this questions give you a first good overview how well a package is maintained. 

### 2. Is it accessible

If the problem you try to solve involves any form of user interaction the JavaScript and CSS you need for it needs to be accessible. First, you may try adding the keywords "Accessibility" or "A11y" to your search. If a package is using these keywords it is a good first sign, but you should still not take this for granted. As a next step I usually open the code repository and search for "keyboard" - if there is a documentation/wiki explaining how well it works with keyboard-only it is fantastic, if there is only one issue found in the search complaining about keyboard issues, it is a bad sign. After "keyboard" I usually do the same search again with "screen reader" looking for the same patterns.

This a good first steps to see if a package might be accessible. As a next step you should test a demo version of if, running some accessibility linters and do your own tests how well it works for keyboard users and users using a screen reader.

### 3. Is it lightweight

Sadly, most packages don't market their lightweight size anymore (maybe because they got heavier and heavier after the years) like years ago when every jQuery plugin wrote at the top of their description - Only 1.6 kB or something.

Even if there are sizes mentioned, it is often unclear what they mean. Is this before/after minification, before/after gzip.

So, do find out how lightweight or heavy a package is you mostly have to install it locally and see for yourself. 


### 4. Do I really need that

Coming back to the moment.js example - if you find that a package is probably not as lightweight as you want, there is often an alternative package or sometimes browser support got so got that you can use native solutions and no third-party at all.

## Conclusion

Almost all websites ship with some third-party code. Yes, for mostly static sites you probably don't need any third-party code. But, the more complex the site is and the more features you have, you will probably use third-party code at some point. Often there are great solutions available for the problems you want to solve, but you should always question the solution. Is there a better one, a more accessible one, a more lightweight one and do I really need that third-party package or can I build it on my own now as browser support involved. 


&lt;information&gt;
This article was written with [Writerie](https://app.writerie.com) - The Writer for Internet People.
&lt;/information&gt;