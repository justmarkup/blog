---
title: The need for a web accessibility law
description:  More and more convinced that the only way to improve accessibility of the web is to have laws. Laws written by accessibility experts in force in every country. GDPR, but done right. 
ogImage: https://justmarkup.com/img/icons/icon-512x512.png
ogImageAlt: justmarkup
date: 2020-05-27T16:23:12+00:00
tags:
    - note
layout: layouts/post.njk
---


Yesterday I was frustrated again that so many websites are still inaccessible, so as you do, I [tweeted](https://twitter.com/justmarkup/status/1265180442107482113?s=20 "https://twitter.com/justmarkup/status/1265180442107482113?s=20").

> More and more convinced that the only way to improve accessibility of the web is to have laws.
> 
> Laws written by accessibility experts in force in every country.
> 
> GDPR, but done right.

As this got quite some replies, and as Twitter is a bad place to write about complex stuff, you can now read here why I think that we need a global web accessibility law.

## Nobody cares

By "nobody" I mean all the A holes not caring about accessibility. If you care and build accessible sites, you don't belong to this group and are a good person.

The current analysis from [WebAIM](https://webaim.org/blog/webaim-million-one-year-update/ "https://webaim.org/blog/webaim-million-one-year-update/") (web accessibility in mind) about the state of web accessibility of the top one million websites shows that it got even worse as it was already before. Detectable WCAG (Web Content Accessibility Guidelines) failure rate rose from 97.8% to 98.1%.

They found for example that 56% of the 3.4 million form inputs identified were unlabeled. This is so frustrating. Adding a label for form inputs is really not rocket science and there is no reason why you should not use a label.

So, why are still so many sites shipped with these issues?

## Learning

If you are able to develop a site with React, there is no reason you can not make it accessible. There are millions of resources out there - articles, videos, conference talks, code examples, tools... It is all there.

Say you are looking for a new job, you open one of the job search sites and search for "frontend". I just did this and got 6.565 jobs listed for Germany. Next, I used the advanced search and filtered all jobs which contains the word "accessibility" or the German translation "barrierefreiheit" - only 126 jobs were left. 98% of all frontend jobs currently listed don't require any sort of skills regarding accessibility. This also show how few companies care.

Out of curiosity I also checked how many listings used "react" - 1.753 jobs.

This is a big issue. To get a job you have better chances if you know react than by knowing about web accessibility.

If you don't need accessibility to find a job, don't need it in your job, it is less likely you ever learn it.

So, what can be done to make accessibility a requirement for all sites, to make it the standard?

## Penalize sites

We can write millions of more articles, publish thousands of more videos about accessibility, build hundreds of more examples and tell everyone why accessibility is not a feature but the standard way of building a site. In the end, people and companies are sill A holes and don't care.

So, in my opinion, the only way to improve accessibility is by enforcing it.

### Search engines

Years ago, only a few sites used HTTPS. Even if using HTTPS would make a site more secure, most companies didn't care. This all changed when [Google](https://security.googleblog.com/2014/08/https-as-ranking-signal_6.html "https://security.googleblog.com/2014/08/https-as-ranking-signal_6.html") announced that they will reward sites using HTTPS. Suddenly all sites switched to HTTPS. I remember various clients I tried to convince for month that they should HTTPS, they all refused to until the announcement – suddenly they wanted to switch as soon as possible.

It clearly shows how much companies care about SEO. They don't use HTTPS now because they care about security, they do because they don't want to be penalized by search engines.

If Google would announce that they will start penalizing inaccessible websites, I am sure all sites will do everything to make their sites accessible. Again, not because they care about their user, they only care that they will lose money.

### Browsers

Similarly to search engines, browser can also influence how sites are build. For insecure HTTP sites, browser nowadays clearly show in the address bar that the site is not secure - you don't want to be that company having to tell users why their site is not secure.

Browsers could also show a warning if a site is inaccessible. As nobody wants a warning when visiting a site, they again would start making their sites more accessible.

Especially search engines could help to make the web more accessible. There is just one problem – unless with HTTPS, it is nearly impossible to automatically check if a site is accessible. Yet, they could check for color contrast, missing alt attributes, missing semantic, missing labels – this would already help a lot.

Even, if search engines would introduce an accessibility ranking and browsers would start showing a warning for inaccessible sites, it may be not enough.

## A new law

Which brings us to the title of this article.

As of today (May 2020), there are various Web [Accessibility Laws & Policies](https://www.w3.org/WAI/policies/) in place in various countries. The first issue here is that almost no country enforces the law they have, the other one is that they are country specific, the third one is that these laws are really hard to understand by average people.

### Global

As you may know, WWW means World Wide Web. There is no Austria Web, no South African Web, no Peru Web. So why should we have a law which only applies to one country. This makes no sense.

### By experts

The law has to be written by web accessibility experts, by people knowing everything about web accessibility.

In addition, there has to be a version for us. A version which is understandable, a document you can actually read. This is really important.

### Enforcement

The law needs to be enforced. First it should apply to all government and public sites, later for all commercial sites.

### GDPR

Two years ago GDPR went into effect. Personally I don't have the feeling that my data are now more secure and more private. All the big tech companies still collect all the data they can get, the only thing that changed seems to be that we now have annoying cookie consent popups on every site. All hate these popups.

I still don't know why they didn't use DNT (Do not track header) there. This would have been so much more user-friendly.

Anyway, we should learn from GDPR and don't make the same mistakes when introducing an accessibility law.

I have no idea how to write a law, but I think we really need one to make the web a better place.

Being optimistic, I also think that we will never get such a law. But the chances are still better than hoping people will not be A holes anymore.