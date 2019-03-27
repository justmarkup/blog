---
title: PWA on desktop
description: 
date: 2018-02-05T07:54:49+00:00
tags:
    - note
layout: layouts/post.njk
---

Last week I twittered a poll asking which browser will be the first to bring full support for Progressive Web Apps (PWA) to desktop. Here are the results:

> Wonder which browser will be the first\* to bring full support for PWA to desktop.
> 
> \*Yes, Samsung Internet for DeX already does, but would say it is not traditional desktop.
> 
> — Michael Scharnagl (@justmarkup) [31\. Januar 2018](https://twitter.com/justmarkup/status/958628132663300097?ref_src=twsrc%5Etfw)

54% think Chrome will be the first, 27% see Firefox as the leader, 18% bet on Edge and only 1% think Safari will be the first one to ship.

Personally, I think that either Edge or Chrome will be the first to ship this spring and that Firefox will probably follow later the year. I am not sure about Safari, I was already surprised that they shipped [Service Worker and other PWA features](https://medium.com/@firt/pwas-are-coming-to-ios-11-3-cupertino-we-have-a-problem-2ff49fd7d6ea) some time ago, so maybe we will see PWA support on desktop soon too.

The term PWA is a marketing term for me. When a browser says it fully supports PWA, what does this even mean? Does it mean that a prompt is showing to install a site, does it mean that technical features like Service Worker (including BackgroundSync, Push Notification…) are fully supported, does it mean that the Web App Manifest is fully supported, does it mean that the site will work offline or all of it?

As various people asked what I mean by full support, I would like to use this post to share what full support means for me and how I would like to experience PWA on desktop.

Installable
-----------

To turn a website into a PWA it has to be installable. This can mean many things. Firstly, the browser should offer a menu item to install a website to the desktop. In addition to this the browser should offer some sort of prompting or ambient badging. On desktop I think ambient badging may work best. Browsers could show a PWA icon in the URL bar if the website meets all the requirements. A prompt can get annoying pretty soon (It already annoys me on Android sometimes), but I also think that browsers are still trying to find the best way when to show a prompt and when not, so maybe this can also work.

### App Stores and Marketplaces

I hear many people saying that there is no need for App Stores, because a PWA lives on the web and can be installed directly from there. While this is certainly true, I personally think that PWA should show up in the App Stores of the systems in addition to showing up in extra PWA app stores. I know a lot of websites, who used PhoneGap or Cordova to transform their existing site to an App, for the only reason to show up in the App Store. If it would be possible to index a PWA in the store, they wouldn’t need to do this and would have more/time to improve their acctual site. I am, however, not for automatic indexing – I think every website should choose on their one if they want to be listed in a store or not.

There is one open question with the default App Stores though. If I want to list my PWA there what browser engine will it use, will it use Webkit on MacOs and EdgeHTML on Windows or can the user choose, or will it be the engine of the default browser the user set?

I also wonder what the requirements will be, so a site can be listed in a Store. Does it have to work offline? Does it need a Ligthouse Score of > 80?

Integrated in the system
------------------------

Once an PWA is installed it should be easily findable on the system. Like a native app, it could have an icon on the desktop and should be findable via Search and Explorer. There should be no difference from a Electron App for example. The icon should be on its own and not with a small browser logo attached to it. It should also respect the display property defined in the Manifest. If the value is standalone it should open as a standalone window, while if the value is browser it should open a new browser window with the URL bar and all other browser UI visible.

Current state
-------------

As of today (05.02.2018), Chrome has experimental support for PWA on desktop (Linux, Windows, Mac and Chrome OS).

![pokedx.org running as a standalone PWA on desktop](https://justmarkup.com/log/wp-content/uploads/2018/02/Screenshot_111.png)

You can enable it by visiting [chrome://flags/#enable-desktop-pwas](chrome://flags/#enable-desktop-pwas) and enabling it there. After a restart you will see “Add to desktop…” in the menu. After clicking there, the app will be added to the desktop and will be discoverable like a native App. There is no prompt or ambient badging at the moment, so not sure if it will be added once this makes this into stable.

The icon on the desktop already looks like a native app icon though and doesn’t have a reference that it was added via Chrome.

![justmarkup icon on windows desktop](https://justmarkup.com/log/wp-content/uploads/2018/02/Screenshot_asdhas.png)

If the site has a display value of “desktop” defined in the Manifest it does open a new browser window, but there is one empty tab and one with the actual site. As it is all experimental I am sure they will fix this though.

![justmarkup opened vom desktop showing the normal chrome ui](https://justmarkup.com/log/wp-content/uploads/2018/02/Screenshot_11.png)

Conclusion
----------

I think PWA could replace many Electron Apps in the future, the same as many Cordova/PhoneGap Apps are currently replaced by Progressive Web Apps, as they are often only used as a wrapper. I also think that PWA will make it into App Stores, whereas Edge and Microsoft will probably be the first one to do so.

That all said, PWA are certainly not always the best option. There will always be the need for native apps. PWA’s will find their place on the desktop, but there are still a lot of open questions browsers need to think of to make this a great experience for users.

Update from 06.02.2018: Microsoft just [announced their plan to bring PWA to Microsoft Edge and Windows 10](https://blogs.windows.com/msedgedev/2018/02/06/welcoming-progressive-web-apps-edge-windows-10/)