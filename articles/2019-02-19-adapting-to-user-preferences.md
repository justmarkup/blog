---
title: Adapting to user preferences
description: 
date: 2019-02-19T16:48:43+00:00
oldUrl: https://justmarkup.com/log/2019/02/adapting-to-user-preferences/
tags:
    - article
layout: layouts/post.njk
---

Over the last years, browsers implemented various features to react to user preferences on the web using CSS, JavaScript or by checking for preferences on the server-side. In this article, I would like to show which user preferences are currently exposed by browsers, the best way to handle them and a look in to the future to see what might be available soon.

Reduced Motion
--------------

Let’s start with the [prefers-reduced-motion media query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion). It was introduced in Safari 10.1 and is currently (February 2019) [supported](https://caniuse.com/#feat=prefers-reduced-motion) in the latest versions of Safari, iOS Safari, Firefox and Chrome.

The prefers-reduced-motion media feature is used to detect if the user has requested the system minimize the amount of animation or motion it uses. You can either detect it using a CSS media query

    @media (prefers-reduced-motion: reduce) {
      /* disable animations/transitions */
    }
    

or you can also use JavaScript to check if the users prefers reduced motion:

    var motionQuery = matchMedia('(prefers-reduced-motion)');
    function handleReduceMotionChanged() {
      if (motionQuery.matches) {
        /* disabled animations/transitions */
      } else { 
        /* enable animations/transitions */
      }
    }
    motionQuery.addListener(handleReduceMotionChanged);
    handleReduceMotionChanged();
    

The safest way to disable all CSS animations and transitions is to use:

    @media (prefers-reduced-motion: reduce) {
      * {
          transition: none !important;
          animation: none !important;
      }
    }
    

This would however also not trigger [animation start/end events or keyframe states](https://twitter.com/scottjehl/status/1086287082031583232), so if your code relies on them you might use:

    @​media (prefers-reduced-motion: reduce) { 
      * { 
          animation-duration: 0.1s !important; 
          transition-duration: 0.1s !important; 
        } 
    }
    

This is the safest solution, but it might not be the best solution as you may still want to use animations/transitions for some parts even if the user prefers reduced motion. I recommend reading [Designing Safer Web Animation For Motion Sensitivity](https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity) by [Val Head](https://twitter.com/vlh) to learn more about when it is a good idea to use animations or transitions.

prefers-color-scheme
--------------------

The next user preference is the [prefers-color-scheme media query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) which is currently (February 2019) only [supported in Safari 12.1](https://caniuse.com/#feat=prefers-color-scheme). It will however also be supported by [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1494034#c20) soon and [Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=889087) will also add support in the future.

The prefers-color-scheme media query is probably better known by Dark/Light mode which you can enable on MacOs in preferences.

In CSS you can use the following media query to check if a user prefers dark mode. For light mode the query would be prefers-color-scheme: light.

    
    @media (prefers-color-scheme: dark) {
      /* adust styles for dark mode */
    }
    

As it is a media query you can also use JavaScript to check for it:

    var colorSchemeQuery = matchMedia('(prefers-color-scheme: dark)');
    function handleColorSchemeChanged() {
      if (colorSchemeQuery.matches) {
        /* dark mode */
      } else { 
        /* light mode */
      }
    }
    colorSchemeQuery.addListener(handleColorSchemeChanged);
    handleColorSchemeChanged();
    

You can read more about [designing for dark mode](https://stuffandnonsense.co.uk/blog/redesigning-your-product-and-website-for-dark-mode) in this article by [Andy Clarke](https://twitter.com/Malarkey).

Save data
---------

On to the next one – the [SaveData request header](https://wicg.github.io/netinfo/#dom-networkinformation-savedata). Users can activate the SaveData mode in their browser and we as developers can use that information to deliver a \*light\* version. This means we could serve system fonts instead of web fonts if save data is enabled or serve low-res images instead of high-res and much more.

We can either detect it via JavaScript using:

    if ("connection" in navigator) {
        if (navigator.connection && navigator.connection.saveData === true) {
            // saveData mode is enabled - don't load heavy assets like high-res images or webfonts
        }
    }
    

Or you can also detect it on the server-side, here is an example in PHP:

    if (isset($_SERVER["HTTP_SAVE_DATA"]) && strtolower($_SERVER["HTTP_SAVE_DATA"]) === "on") {
      // `Save-Data` detected!
      $saveData = true;
    }
    

There is currently no media query for saveData and while we probably never get [bandwith media query](https://www.smashingmagazine.com/2013/01/bandwidth-media-queries-we-dont-need-em/) there is hope that there will be a save data media query in the future.

Fore more infos on delivering fast and light applications with Save-Data I recommend [this article](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/save-data/):

Do Not Track
------------

Next is the [Do Not Track request header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/DNT), which I [wrote about](https://justmarkup.com/log/2018/03/do-not-track-user-preference/) before as I am all against tracking and had great hopes in this feature. Unfortunately, [Safari Technoloy Preview 75](https://webkit.org/blog/8594/release-notes-for-safari-technology-preview-75/) disabled the feature recently, as it was used by some sites for – wait for it – tracking; Oh the irony.

So while I am not sure if other browsers will also disable it, it is still great and gives you extra karma if you honour the Do Not Track setting. It can again be checked via JavaScript:

    var doNotTrack = (navigator.doNotTrack === "1" || navigator.doNotTrack === "yes" || navigator.msDoNotTrack === "1" || window.doNotTrack === "1");
    
    if (!doNotTrack) {
        /* load analytics if you really need to */
    }
    

You can also check for Do Not Track on the server-side, again here an example in PHP:

    $donottrack= (isset($_SERVER['HTTP_DNT']) && $_SERVER['HTTP_DNT'] == 1); 
    if (!$donottrack) {
      echo 'embed analytics script if you really need to'; 
    }
    

Let the user decide
-------------------

While it is great if you honour user preferences you should also make sure that users can override it on your site. A user may prefer dark mode in general, but may prefer light mode on your site – so you should have a setting to change the theme and use that to override the general user setting exposed by the browser. And talking about settings – always make sure users can [find the setting](https://twitter.com/simevidas/status/1096832706191728640) easily.

What’s next?
------------

Let’s have a look at the [User Preference Media Features](https://drafts.csswg.org/mediaqueries-5/#mf-user-preferences) to see what we may see next in browsers.

As you can see there are some new media queries defined, like “inverted-colors”, “prefers-reduced-transparency” and “prefers-contrast” which are currently (February 2019) not implemented in any browsers, but probably will be in the future.

Conclusion
----------

As you can see there are currently various ways to adapt your site to honour user preferences and there will be even more in the future. This features help to improve accessibility, performance and privacy and you can make your users happy when you adapt to them.

Happy coding!