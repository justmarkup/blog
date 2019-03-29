---
title: Do Not Track user preference
description: 
date: 2018-03-01T15:09:26+00:00
oldUrl: https://justmarkup.com/log/2018/03/do-not-track-user-preference/
tags:
    - article
layout: layouts/post.njk
---

Recently, I got reminded about the [Do Not Track (DNT) request header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/DNT). As a user, you can enable DNT in various [browsers](http://donottrack.us/) and as a website this setting should be respected. In reality very few websites honor DNT as there are no legal or technological requirements to do so and sadly most prefer to collect as much data as possible instead of respecting privacy.

What many of these websites may not realize is that they are already not able to track most of the users which have DNT enabled, as many of them also use Ad blocker or other extensions to block tracking scripts. So, why not honor the DNT and don’t load the analytics script if it is enabled by a user.

You can check if a user has DNT enabled either on the server-side or on the client-side.

Client-side
-----------

We can use JavaScript to check for DNT on the client-side. Here is an example, which only loads Google Analytics if DNT is not enabled.

``` js
var doNotTrack = (navigator.doNotTrack === "1" || navigator.doNotTrack === "yes" || navigator.msDoNotTrack === "1" || window.doNotTrack === "1");

if (!doNotTrack) {
    var _gaq = [['_setAccount', 'UA-XXXXX-X'], ['_trackPageview']];
    (function(d, t) {
        var g = d.createElement(t),
            s = d.getElementsByTagName(t)[0];
        g.src = 'https://ssl.google-analytics.com/ga.js';
        s.parentNode.insertBefore(g, s);
    }(document, 'script'));
}
```

The standard way to test for DNT is using `navigator.doNotTrack`, which either returns “1” if DNT is enabled or “0” if not. However, some browsers use [non-standard properties and values](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/doNotTrack#Browser_compatibility), that’s why we have to extend the test to cover all of them.

Server-side
-----------

Even better than checking it on the client-side is checking it directly on the server-side, as there are [many ways](https://kryogenix.org/code/browser/everyonehasjs.html) JavaScript could fail to execute.

### PHP

If you are using PHP, the information is available in the $\_SERVER array:

``` php
$donottrack= (isset($_SERVER['HTTP_DNT']) && $_SERVER['HTTP_DNT'] == 1); if (!$donottrack) {echo 'embed analytics script'; }
```

### Node.js

In Node.js it is available via `req.header.dnt`. Here is an example using Express.

``` js
app.get('/', function (req, res) {
    const donottrack = (req.header.dnt && req.header.dnt == '1) ? true : false;
    res.render("index", {
        dnt: donottrack
    });
});
```

And now you can check for the dnt variable in the template.

``` js
if !dnt
    script(src="analytics.js")
```

Conclusion
----------

Implementing a solution to honor DNT is a relatively small effort (it took less than five minutes for me to implement it here, to only load analytics/ads if DNT is not enabled). Many websites will fear to implement this, as they want to track all users. However, for most websites the numbers won’t really change after implementing DNT as they are already not able to track most of them.

Update 19.02.2019: Safari removed support for DNT in [Technology Preview 75](https://webkit.org/blog/8594/release-notes-for-safari-technology-preview-75/), because some sites used it for tracking users – oh the irony.