---
title: Stop supporting Internet Explorer!
description: Ways to support Internet Explorer.
ogImage: https://justmarkup.com/img/icons/icon-512x512.png
ogImageAlt: justmarkup
date: 2022-07-06T11:12:08+00:00
tags:
    - note
layout: layouts/post.njk
---

As of 15th of June 2022 Internet Explorer [has retired and is officially out of support](https://blogs.windows.com/windowsexperience/2022/06/15/internet-explorer-11-has-retired-and-is-officially-out-of-support-what-you-need-to-know/).  
  
Great, let's stop supporting Internet Explorer finally, you say? Sure, I will do the same, but your support may be different from how I approach this. Let's have a look.

## Ways to support a browser

There are two ways to support a browser:

*   Add [polyfills](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill)/workarounds, so all unsupported features work the _same_ in unsupported browsers as in supported browsers.
*   Use progressive enhancement. Basics work in _every_ browser, new features (extras) only in supported browsers.
    

## Support Internet Explorer

When I say 'Stop supporting IE' it means to me that I won't go the extra mile to get unsupported features working in Internet Explorer, but still make sure Internet Explorer users get the basics, and can use the site.

For example, in one project, we are using the [Beacon API](https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API) for a feature (an extra, not required). At the time (about 3 years ago), we integrated the feature, Internet Explorer was still fully supported, and we had quite some users using IE11. Therefore, we decided that it's worth to load a [polyfill](https://github.com/miguelmota/Navigator.sendBeacon), so IE11 users will also get this extra. Now, this changed, the numbers of IE users are really low, so we will now remove this polyfill. IE users still get the basic experience, but not this extra feature.

We could also have kept the polyfill, you say? Sure, but we try to keep our third-party dependencies as low as possible. One fewer means one fewer to check for security issues, updates – one less dependency to care about.

So, this is how I will support Internet Explorer from now on. You could also think about it this way: Your Internet Explorer user should now get the same experience as your No-JavaScript user – the basics.

## Resources

*   [Internet Explorer 11 has retired and is officially out of support—what you need to know](https://blogs.windows.com/windowsexperience/2022/06/15/internet-explorer-11-has-retired-and-is-officially-out-of-support-what-you-need-to-know/)
*   [Internet Explorer Still Does Not Go Away Today](https://adrianroselli.com/2022/06/internet-explorer-still-does-not-go-away-today.html)
