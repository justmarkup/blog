---
title: Boring by default
description: When starting a new web project one often reaches for new cutting-edge technologies to be up-to-date. But why not start with the basic first and add stuff on top if you really need it. 
ogImage: https://justmarkup.com/img/icons/icon-512x512.png
ogImageAlt: justmarkup
date: 2020-01-14T20:42:10+00:00
tags:
    - note
layout: layouts/post.njk
---

When starting a new web project one often reaches for new cutting-edge technologies to be up-to-date. However, why not start with the basics first and add stuff on top if you really need it. Boring by default.

> I really like new and cutting-edge technology, but lately, I feel more and more that we're just over-engineering everything... 😢  
>   
> I spent the last hour solving problems that I wouldn't have had with a "traditional stack", static HTML and some hand-written JavaScript.
> 
> — Stefan Judis (@stefanjudis) [January 5, 2020](https://twitter.com/stefanjudis/status/1213906461543321602?ref_src=twsrc%5Etfw)

As Stefan and many others, I also often see and experience over-engineered sites regularly. Let's see why starting with a traditional, or boring stack may not be the worst idea.

## Start with the basics

When starting a new website all you need to build it is a computer, an editor and a browser to view it. Yes, that's all – no need for a build script or task runners or for installing something via npm. Yet, nowadays we tend to over-complicate all of this. The arguments for this are that it makes it so much easier to build a site using all this tools, another is that you will clearly need all of this once several people work on the project and/or the project is getting large.

These are all valid points, but to you really need this all from the beginning? What if you abandon the project (like the millions of half-finished side-projects out there), or find that a static HTML page is all you need.

## Maintenance

Ever needed to change "just a small thing" on an old page you build years ago? I recently had the pleasure and the simple task of changing some colors in CSS lead to a whole day of me wrangling with old deprecated Grunt tasks and trying to get the build task running. 

The same will happen to you as well some day, everybody used Grunt back then and almost nobody does today, the same will probably also happen to Babel or other tools – at least you would have to get an old version running which isn't supported anymore at the time you want to change some CSS in 2025.

That's why starting with HTML, CSS and JavaScript without the need to ever compile anything on your local machine is a good idea. Changing some colors on such a page would indeed only take minutes and not a whole day.

## It depends

That said, if your whole team is really into React or Vue or AnotherFrameworkDevelopedRightNow and you know for sure that using these tools is the perfect choice for you. Use that. But, don't tell others they also have to and that this is the only way to build things – it all depends.

Your job as an developer is to decide, to decide what tools to use, to decide what frameworks to use, to decide what to prioritize, to decide what is the best way to maintain a project – a lot of questions only your team is able to answer.

Again, it all depends.

## Conclusion

Never feel ashamed to start with a traditional (boring) stack – you may be the one launching a great project, while others still set up there build scripts.

Be boring by default and enhance on the way.
