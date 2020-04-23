---
title: Written with Writerie
description: Earlier this week I finally launched Writerie – a distraction free writing tool for Internet People. 
ogImage: https://justmarkup.com/img/writerie.png
ogImageAlt: Writerie
date: 2020-04-23T12:38:12+00:00
tags:
    - note
layout: layouts/post.njk
---

Earlier this week I finally launched [Writerie](https://app.writerie.com) – a distraction free writing tool. Here is my story why I build it, what it is and what the future will be for Writerie.

## Background

I first started to build a writing tool in summer 2017, because I wanted a place where I could store all my documents and articles and not being tracked. Until this point I mostly just used my code editor to write in Markdown, but this meant I couldn't edit them on the phone or if I don't have my laptop with me. The first version was very basic and was missing a lot of things, but it did the job for me.

Time went by and I rarely made changes here and there. Until Autumn 2019, when I wanted to finally make it more usable. At this point I restarted the project with the goal to launch it in 2020 and make it usable to others as well. What followed were months of work.

## Status Quo

I had thousands of features planned, but also knew that I should first start with a Minimum Viable Product, before having built hundreds of features nobody wants.



On top of accessible and privacy friendly which I don't see as features but as a given for every project I wanted to have the option to use plain Markdown to write, but also to have a Rich Text Editor for things like a table which I still find harder to do in Markdown than via a User Interface. So I build it this way that you can switch every time between the two modes.

![The Writer in Markdown Mode](/img/writerie-2.png)

Another feature I wanted to have is a better integration of links (resources). You can easily add links to Writerie and later use them in any document. Links are regularly unreachable after some time, so in Writerie we check all links if they are still reachable and show you a warning if not.

We also generate an automatic outline for you, so you have a better overview on longer documents.

One of the last things I implemented were comments. This makes it possible to add a comment for every text snippet. It works in Markdown and in WYSIWG Mode and we also added to option to include or exclude them in the export (we support PDF, HTML and Markdown for now). Thanks to [Heydon Pickering](https://twitter.com/heydonworks/status/1238359513662656512?s=20) for proposing it.

It also supports Dark/Light Mode of course.

![The Writer in Dark Mode](/img/writerie-1.png)

On 21. April I finally launched the site. It is not perfect, but it is a start. Yes, we are in a pandemic right now and I have thought a lot about postponing the launch to later this year or even next year, but as [Cameron Moll](https://twitter.com/cameronmoll/status/1239971692144807938) said:

> Deploying in the middle of a pandemic seems so unimportant at the moment. Or maybe there's no better time for it.

## The Future

There are a lot more features I want to integrate in the future, but I also want to build things people want, and not things I think people want, so there is a [Roadmap](https://app.writerie.com/page/roadmap) where users can propose new features and vote on features proposed by others. 

One of the next things I will integrate is Text to Speech – hearing the text you wrote often helps a lot to find errors and improve the writing style.

Some other features I have in mind are collaboration, implement a tool to [catch insensitive, inconsiderate writing](https://alexjs.com/), integration with Static Site Generators and much more. Really looking forward to seeing how Writerie will involve in the months and years to come.

What features would you like to see in Writerie? Please let me know via [Email](mailto:support@writerie.com) or via [Twitter DM](https://twitter.com/justmarkup).

[Give Writerie a try](https://app.writerie.com)