---
title: Not sharing GIFs
description: You should think twice before sharing a GIF on social media
ogImage: https://justmarkup.com/img/icons/icon-512x512.png
ogImageAlt: justmarkup
date: 2025-01-13T19:12:08+00:00
tags:
    - note
layout: layouts/post.njk
---

This morning I shared an article about [Balancing text in CSS](https://ishadeed.com/article/balancing-text-css/) (it's a great article, read it) on LinkedIn. To give a quick preview I decided to create a simple GIF of the first interactive example in the article. The GIF showed more or less how I clicked a button, which, after I clicked it, applied the CSS text-wrap: balance; to the text, and the text visually looked more balanced after that. I added an alternative text to it, as well as some more text, and shared it. All good I thought, the post is accessible for all.

Was I wrong! Shortly after that, I read a post, which reminded everyone [how problematic it is to share GIFs on LinkedIn](https://www.linkedin.com/posts/marcusherrmann_linkedin-sollte-es-einem-erm%C3%B6glichen-neben-activity-7284499373361664000-Pfh-) in terms of accessibility. It fails [Web Content Accessibility Guidelines (WCAG) success criterion 2.3.1](https://www.w3.org/WAI/WCAG21/Understanding/three-flashes-or-below-threshold.html) and [WCAG success criterion 2.2.2](https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html). The issues are that you can't stop, pause or hide the GIF on LinkedIn, and as it starts automatically (which you can't disable in settings, like you can on Mastodon) there is flash of content.

I quickly converted the GIF to a MP4 video file and tried to edit my article. But, after I tried to upload the video on LinkedIn, it didn't work. The issue? It was too small with only 31Kb, the minimum there is 75 Kb. Great, so I just removed the GIF and didn't replace it with anything.

LinkedIn has various options to make this better for everyone. They could add settings where you could disable autoplaying GIFs. They could automatically convert GIFs to a video, which would even improve performance, as videos are way smaller than GIFs. Don't know why they didn't change anything yet, but let's hope they will.

For now please don't use GIFs on LinkedIn, and the same is most probably true for many other social networks, where GIFs are always automatically played.

I planned to share some stuff on LinkedIn starting this year, so far it doesn't work out so great, but you can still [connect](https://www.linkedin.com/in/justmarkup/) with me there if you want.
