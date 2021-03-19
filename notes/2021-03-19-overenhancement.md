---
title: Overenhancement
description: This article is all about enhancements, enhancements going too far; Overenhancements.
ogImage: https://justmarkup.com/img/icons/icon-512x512.png
ogImageAlt: justmarkup
date: 2021-03-19T17:04:08+00:00
tags:
    - note
layout: layouts/post.njk
---

A friend of mine upgraded their bicycle to an electric bicycle some years ago, mainly to improve their commute to work. It sounded like a great choice, in the end the upgrade did however not make their life easier. The upgrade had the opposite effect.

This article is all about enhancements, enhancements going too far; Overenhancements.

> "Simplicity is a great virtue but it requires hard work to achieve it and education to appreciate it. And to make matters worse: complexity sells better." — Edsger W. Dijkstra (1930-2002) "On the nature of Computing Science" (EWD896) August 10, 1984

## Hamburger

The first [websites](http://info.cern.ch/hypertext/WWW/TheProject.html) didn't have a main navigation we are used to having today. They linked from one page to another.

Today, almost every website has some sort of main navigation – a list of links for the most important (overview) pages of a site. When smartphones got popular, people realized that the spare space available had to be used effectively. So they came up with a solution – the hamburger menu.

Given the spare space available on small screens it sounds like a great idea to hide the navigation behind a button at first and only reveal it once the hamburger is selected. This can also be build in a progressive and accessible way making it available for as many users as possible.

There is however one problem – using this pattern in every case. If you only have three navigation items, it makes no sense at all to initially hide them. Enhancing a list of three navigation items to a hamburger menu will make it more complicated to use the navigation; Overenhancement.

## Tabs

Another prominent enhancement pattern are tabs. Say, you have a page with multiple headlines all with corresponding text. In HTML one would structure it like this:

```html
<h2>A topic</h2>
<p>This is all about...</p>
<h2>Another topic</h2>
<p>More about this topic...</p>
```

Now, the idea is to enhance this using tabs to save space and give the user a better overview of available topics and the option to quickly switch between them.

Again, this sounds like a great enhancement at first, and it is again possible to build it in a progressive and accessible way. For many users though, this can make things worse.

First, by using tabs you make it harder for users to use the native in-search functionality browsers offer. In addition, you may run into problems if there are too many tabs, if headlines are really long and so forth.

Most importantly, as tabs are not a native HTML feature, all work a bit differently for keyboard users, on some you can switch tabs with the arrow keys, on some only with tabs, on some with both. This makes them hard to use for keyboard users and users using assistive technologies. Much harder than our basic version with headlines and paragraphs.

There are lots of other enhancements which can turn out to have the opposite effect, so be really careful when you enhance. Don't enhance just for the sake of it.

## It depends™

Remember my friend I mentioned at the beginning, who upgraded to an electric bicycle to enhance their commute? The reason why the enhancement did not work out for them? The commute was only 1 km and while the electric power made the biking itself less exhausting they didn't think about the other consequences.

The power only lasted for a while, so they regularly had to charge the battery, which means taking the battery out of the bicycle, charge it and not forget it to take it back the next morning. Even more frustrating was, that at work they had no elevator and as they wouldn't want their expensive bike to be stolen, they had to carry the bike (which was much heavier than the non-electric one) to the 4th floor every day.

The enhancement looked great at first, in the end though it did make their life not easier, but quite the opposite.

As with electric bicycles, there are a lot of cases where some mentioned patterns do make things easier and do enhance the user experience, at the same time there are a lot of cases where using these patterns do overcomplicate things and make it harder for users; Overenhancement.
