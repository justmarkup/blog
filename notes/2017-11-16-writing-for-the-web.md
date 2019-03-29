---
title: Writing for the web
description: 
date: 2017-11-16T07:34:53+00:00
oldUrl: https://justmarkup.com/log/2017/11/writing-for-the-web/
tags:
    - note
layout: layouts/post.njk
---

**tl;dr: Don’t share bad practise. Be responsible. Be nice. Thanks.**

Some time ago I sent a tweet which got quite a lot of interactions:

> If you publish articles/demos/experiments, please make them accessible.
> 
> – Use `<img>` -> add alt text  
> – Use `<input>` -> use associated label  
> – Use `<span class=".btn">` – use `<button> ` 
> …
> 
> Many will use/copy these. Don't share bad practise. Be responsible. Be nice. Thanks.
> 
> — Michael Scharnagl (@justmarkup) [1\. November 2017](https://twitter.com/justmarkup/status/925671964085227520?ref_src=twsrc%5Etfw)

I read a lot of articles related to web development (HTML, CSS, JavaScript), which I discover via twitter, RSS or one of the many newsletters I am subscribed to; I enjoy reading them and I learn a lot from them.

Many of these articles include code examples and this is the point where I get sad sometimes. I am sad because these examples use bad practice: Inaccessible patterns, non-semantic HTML, –prefix-only CSS or JavaScript without feature tests.

Responsibility
--------------

When publishing articles for the web we have a responsibility. Many developers will read them, many will copy the examples and many will use the code you shared. If the example demonstrates bad practise, people will adopt them, people will think it is okay to use an `<img>` without an `alt` attribute.

Sometimes, there is a note before or after the example:

> Normally, we wouldn’t do this, but to keep it simple for this demo…

This is even worse; Knowing that you are sharing bad practice, but still sharing it instead of showing how it can be done better.

Nobody knows everything, that’s good. But, if you know how to do something correctly, why not share this instead of a bad example which may be shorter or simpler.

Be responsible when you share content.

Awareness
---------

Quite often when I see an inaccessible code example or any other bad practice I am aware of, I try to reach out to the author. I know many other developers doing the same and this is really useful. Useful for the author who isn’t aware the issue and learned something new and useful for all readers reading the corrected example because they won’t copy bad practise.

Proofreading
------------

When writing about new APIs or Code I am unfamiliar with I often try to reach out to other developers and ask them if they can proofread an article. This often helped me sharing bad practise because they told me how to do something better. And often they also will learn something new when reading your article. Again, nobody knows everything.

It is often hard to find someone to proofread, so I thought about setting up a slack channel or something for proofreading. If you think this would be helpful for you too, please let me [know](mailto:hallo@justmarkup.com) and we will try to figure it out.

Catch insensitive, inconsiderate writing
----------------------------------------

Most people will run grammar checks on their content before publishing, but there can be other issues with text, most tools don’t catch: insensitive, inconsiderate writing. When I write, I mostly use my code editor (VS code at the moment) and write in markdown.

Before publishing an article, I run the text through [Alex](http://alexjs.com/) to find insensitive or inconsiderate phrasing. You can try it on their [website](http://alexjs.com/) and it is also available on the command line or via one of the available integration.

Clear and concise
-----------------

We shouldn’t try to be clever and use long sentences full of uncommon phrases. There is no need to impress people with your language skills. Writing clear and concise sentences will help many people. You can use a free [tool to check the readability of your text](https://www.webpagefx.com/tools/read-able/).

You should also avoid [words](http://blog.stoyanstefanov.com/technical-writing-checklist/ rel=) like [just](http://bradfrost.com/blog/post/just/) and easy when describing technical details. It may be easy for you, but this doesn’t mean it is also easy for everyone else.

Text alternatives for images
----------------------------

When using images you should always use [meaningful](https://www.w3.org/WAI/tutorials/images/) text alternatives. You should also avoid images of text, as this makes the text uncopyable and untranslatable. Furthermore, it decreases the performance and you have to put effort in it to make these images accessible. There are cases where it is fine to include an image with text, for example a screenshot of a website (with an additional link to the pictured site).

If you can write it down or already have – why use an image of the same text.

This is a good example where one can clearly see that using an accessible version (text) instead of an inaccessible (text in images) is better for all. It is not only great for accessibility, but also improves user experience, SEO (Search Engine Optimization) and performance.

Vanilla code
------------

When using code examples, use vanilla code. I often see examples where they use Sass for CSS or jQuery for JavaScript code. If you write about a jQuery specific issue you should of course use jQuery, but when writing about JavaScript not so. You can always add an additional example using your preferred framework/plugin/tool, but we should not assume everyone else also prefers your choice. By providing vanilla code everyone can use them and adapt them to their needs.

Assumptions
-----------

Another issue I often see is authors assuming the reader already knows about X. When using new features not directly related to the article it is always a good idea to link to other articles explaining the feature. This way readers unfamiliar with the feature can read about it before and won’t get stuck when seeing new, unexplained code.

Browser support
---------------

Web features have different browser support and it should be mentioned in the article. I use [Can I use](https://caniuse.com/) to get browser support information and add the info to my articles. There are also various plugins/tools to [embed](https://caniuse.bitsofco.de/) the data from Can I use directly in the article, so the information stays up-to-date.

Outdated information
--------------------

The specification and implementation of new web features can change over time. The first thing you should do is to show the publish date of an article good visible on the site. It is also a good idea to indicate at the beginning of an article that it may be outdated. For example, I add the following info/warning for technical articles older than one year on my site:

> This article has been updated the last time on January 3, 2016 and the given information may be not accurate anymore. Feel free to contact me on [twitter](https://twitter.com/justmarkup) to get more details.

Low contrast
------------

There was a trend to use very light, small and grey text on white background – I never understood it, but many people use this for their article pages. My eye-sight is very good, but even for me it is really hard to read many of these pages. Please always use a good [Contrast ratio](http://leaverou.github.io/contrast-ratio/) for all elements on your site.

Tools, Guides and Tips
----------------------

*   [Alex – Catch insensitive, inconsiderate writing](http://alexjs.com/)
*   [Grammarly – spell checker](https://www.grammarly.com/)
*   [Test Document Readability](https://www.online-utility.org/english/readability_test_and_improve.jsp)
*   [aXe – free, open-source accessibility testing tool](https://www.deque.com/products/axe/)
*   [Contrast ratio check](http://leaverou.github.io/contrast-ratio/)
*   [Dynamically Generated Alt Text using Azure’s Computer Vision API](https://s.codepen.io/sdras/debug/4437473c764a1d553691005a0f40a145)
*   [Reading Level](https://www.w3.org/TR/UNDERSTANDING-WCAG20/meaning-supplements.html)
*   [W3C Web Accessibility Initiative tutorial for images](https://www.w3.org/WAI/tutorials/images/)
*   [A guide for alternative text for images](https://axesslab.com/alt-texts)

Bottom line
-----------

Sharing good practice with accessibility in mind on a page (which itself is accessible) may take more time than sharing »simple« inaccessible demos, but it is really worth the effort. The same goes with the content of the article itself, by using clear and concise sentences many more people can read them.

Nobody is perfect and no website, article or example will ever be perfect, but you should really avoid publishing bad practice. Be responsible.

I also encourage everybody to write and publish articles. I recently had a problem, googled it and found an old article of mine where I described how to solve it. Back then I also had the problem, did research and wrote about my findings. Now, years later I was able to use this and solve the problem again.