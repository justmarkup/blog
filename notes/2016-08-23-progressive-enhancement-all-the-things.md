---
title: Progressive enhancement all the things
description: 
date: 2016-08-23T15:49:13+00:00
tags:
    - note
layout: layouts/post.njk
---

I am currently working on a project where I have to build an interactive graph to accompany some content (text, images). I made sure it is accessible, but what if the JavaScript fails (an error in our JavaScript, connection timeout or because of [another reason](http://kryogenix.org/code/browser/everyonehasjs.html)? For the last few days I wondered if I should make the content of the graph somehow available if the JavaScript fails or if the graph is not part of the core content and therefore an enhancement.

What is the core part of my page?
---------------------------------

In this case we decided that the graph is not part of the core content and can fail in certain cases. More precisely, we decided to show the graph only if the browser is capable of doing so (Opera Mini and other proxy browsers are not) and also to hide it if the [JavaScript fails](https://www.filamentgroup.com/lab/enhancing-optimistically.html).

Today, the client came back to us and decided that this graphs should also be available via an extra page where only the graphs are shown. Great, now the enhancement is clearly the core.

Conclusion
----------

When a user opens your site and sees nothing, you either have no content or you are doing it wrong. Apart from that, it is not always easy to decide which parts are an enhancement and which parts belong to the core of a site.

What I like to do is removing all the enhancements and see if the site still makes sense and is usable. If not, the enhancement should be part of the core experience.

How do you decide if something is an enhancement or part of the core experience?