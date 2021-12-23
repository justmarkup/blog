---
title: Browsers and Bugs 01/2015
description: 
date: 2015-01-09T09:24:41+00:00
oldUrl: https://justmarkup.com/log/2015/01/browsers-and-bugs-012015/
tags:
    - article
layout: layouts/post.njk
---

There are probably more browser bugs than real bugs so I thought why not collect them and give a shout-out to the best ones crossing my way. So, this marks the beginning of a weekly roundup of my favorite browser bugs, best workarounds and other browser bugs related issues. Enjoy! As an extra, I will share tips/features/improvements for testing at the end.

Bugs and Workarounds
--------------------

### [Flexbugs](http://philipwalton.com/articles/normalizing-cross-browser-flexbox-bugs)

Let’s start with a fantastic list of cross-browser flexbox issues and their known workarounds by Philip Walton.  
[Article](http://philipwalton.com/articles/normalizing-cross-browser-flexbox-bugs) and [Github Repo](https://github.com/philipwalton/flexbugs)

### [The Chrome CSS Bug That Crashed Our Site](http://hackingui.com/front-end/chrome-box-shadow-bug-that-crashed-our-site/)

Chrome has issue calculating inset box-shadows with large numbers. [Fix](https://code.google.com/p/chromium/issues/detail?id=437128) will probably land in Chrome 40.

### [Bug writing guidelines for Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/QA/Bug_writing_guidelines)

Effective bug reports are the most likely to be fixed. These guidelines explain how to write such reports.

### [Bugreport from the past (still open)](https://bugzilla.mozilla.org/show_bug.cgi?id=129986)

Bug 129986 (from 2002) – Cached Gif animations don’t reset on reload.

### [Happy Bugreporter of the week](https://twitter.com/stevefaulkner/status/551030318187417600)

[![](http://justmarkup.com/log/wp-content/uploads/2015/01/bug-fix-happy-012015.png)](https://twitter.com/stevefaulkner/status/551030318187417600)

Debugging and Testing
---------------------

### [Animation controls in Devtools (Chrome Canary)](http://www.valhead.com/2015/01/06/quick-tip-chrome-animation-controls/)

[Val Head](https://twitter.com/vlh) shares a sceencast showing how to use the animation play/pause and speed control in Devtools.

### [IE test VMs on modern.IE get a refresh](http://blogs.msdn.com/b/ie/archive/2015/01/06/ie-test-vms-on-modern-ie-get-a-refresh.aspx)

VMs to help web developers test versions of Internet Explorer