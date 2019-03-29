---
title: Testing your responsive site – using Ubuntu
description: 
date: 2012-08-23T12:12:35+00:00
oldUrl: https://justmarkup.com/log/2012/08/rwd-testing/
tags:
    - article
layout: layouts/post.njk
---

This post is all about setting up and using tools and extensions, useful for testing your Responsive Design. I work with Ubuntu, so most of the instructions will be for Ubuntu, but I guess everyone else will get the idea.

Browsers
--------

### Firefox

The current Firefox Nightly comes with a fantastic tool for testing your Mediaqueries. They call it “Responsive Design View”, and you name it, it’s for testing a site on different screen resolutions. With this tool you can easily resize your site both vertically and horizontally or choose one of the redefined screen sizes to test the most common ones. Sooner or later this tool will be build in Firefox Stable, but until then you can download [Firefox Nightly](http://nightly.mozilla.org/), which runs site by site with the stable Version.

Furthermore you can install Firefox Fennec, downloadable [on mozilla.org](http://www.mozilla.org/projects/fennec/1.0a2/releasenotes/). There you will find handy install instructions, to get it running within minutes. I don’t use Fennec that often anymore, as I use Firefox Nightly now for testing initial mockups, but it’s a great browser for testing “touch”, as there is, for example, no hover event.  

### Opera

Opera offers Emulators for [Opera Mobile](http://www.omgubuntu.co.uk/2010/08/install-opera-mobile-in-ubuntu-deb) and [Opera Mini](http://www.omgubuntu.co.uk/2010/07/how-to-run-opera-mini-in-ubuntu). Especially the Opera Mini Emulator is great, as the the browser is not only used by many feature phones user, but also has some JavaScript limitations you should be aware of.

Opera not only has browsers for desktop and mobile, but also serves the needs for TV consumers – Opera TV. You can find more out about setting it up in this [post](http://dev.opera.com/articles/view/opera-tv-emulator-getting-started/). I don’t use the emulator on a daily basis, but playing around with a web-based remote control is not just pure debugging fun, but more important, gives you a good feeling about another available input control.

Remote Web Inspector
--------------------

### Weinre

If you are into mobile development you probably heard of [Adobe Shadow](http://labs.adobe.com/technologies/shadow/). There is no Linux Version, but we can instead simply use [Weinre](http://people.apache.org/~pmuellr/weinre/docs/latest/), the package, Adobe is using under his hat. You only need node.js running on your computer, the program itself can installed via the [npm package manager](http://people.apache.org/~pmuellr/weinre/docs/latest/Installing.html). Once everything is done, you can remotely debug any webkit-based browser (Android, iOs, Blackberry …). It’s awesome – use it!

### Firefox mobile

Not long ago, Firefox implemented an [easy way](https://hacks.mozilla.org/2012/08/remote-debugging-on-firefox-for-android/) to debug Firefox Mobile remotely. Check out the [Demo](http://www.youtube.com/watch?feature=player_embedded&v=Znj_8IFeTVs) as well.

### Chrome

Directly with the start of Chrome for Mobile they added the possibility to debug remotely. The latest Android Version ships with Chrome as the default browser, so their will be a big crowd using it in the near future. It’s elementary to set it up [with some simple steps](https://developers.google.com/chrome/mobile/docs/debugging)

### Opera Mobile

Last but not least is Opera. Remote debugging for Opera is already around since 2008, as far as I can see. Definitely another awesome option to test your responsive Design. You can find instructions about the set up [in this post](http://dev.opera.com/articles/view/remote-debugging-with-opera-dragonfly/).

Conclusion
----------

As you can see, there are already fantastic tools lying around to debug your site remotely, as well as testing your responsive design on your desktop, and I am pretty sure there will be even more possibilities in the near future. I love testing, and with this tools in my hand it’s even more awesome. You can also see, that it’s not a big deal to set up most of the tools presented, and that there is something for almost every browser engine out there, although I don’t know about any tools to debug on windows mobile, anyone?

If you know of any other tool, useful for testing a responsive site, please let me know in the comments.