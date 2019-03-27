---
title: Rethinking setting class=”js” to hide elements if JavaScript is available
description: 
date: 2016-02-01T15:38:11+00:00
tags:
    - article
layout: layouts/post.njk
---

Last month a client reported an issue with their website, saying that the navigation isn’t working on his new iPhone 6s Plus. After getting all [browser details](https://justmarkup.com/bugreporter), I started to reproduce the error, but neither on my iPad with an identical iOS and Safari version nor on any emulator on browserstack.com the error occurred. So, I arranged a meeting with the client and debugged directly on his smartphone. After some testing I noticed an JavaScript exception `QUOTA_EXCEEDED_ERR:DOM Exception 22`. I checked the code and found the error was caused by using `localStorage.setItem();`. While we checked if localStorage is available `'localStorage' in window` we didn’t check for `setItem();` [properly](http://stackoverflow.com/questions/14555347/html5-localstorage-error-with-safari-quota-exceeded-err-dom-exception-22-an) and therefore our complete JavaScript failed.

This made me rethink my strategy of hiding elements when JavaScript is available. Typically I change the className of `<html>` from `.no-js` to `.js` in the `<head>` with JavaScript to [avoid the FOUC](http://www.paulirish.com/2009/avoiding-the-fouc-v3/). The problem with this method is if an error occurs, like described before, this will fail and probalby make parts of the site unusable.

Example
-------

To demonstrate it here is an [example of a responsive navigation](https://justmarkup.com/progressive-navigation/).

![](https://justmarkup.com/log/wp-content/uploads/2016/02/navigation-big.png)

Navigation on big screens

![](https://justmarkup.com/log/wp-content/uploads/2016/02/navigation-nojs.png)

Navigation with JavaScript disabled/unusable

![](https://justmarkup.com/log/wp-content/uploads/2016/02/navigation-js-closed.png)

JavaScript usable and navigation closed

![](https://justmarkup.com/log/wp-content/uploads/2016/02/navigation-js-open.png)

JavaScript usable and navigation open

If you view the demo on a small screen you can see that the navigation is hidden and the button to trigger the navigation is visible if JavaScript is usable. If JavaScript is disabled or unusable the navigation is hidden and the navigation is shown.

Here is the same demo [with a JavaScript](https://justmarkup.com/progressive-navigation/error/) error added. As you can see in this case the navigation is displayed the same way it would be if JavaScript was disabled. So whatever error may stop your JavaScript from working the site will still be usable.

Conclusion
----------

To avoid cases where JavaScript is available, but not usable I will use the following code in the future.

    document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/,'js');
    window.onerror = function () {
      document.documentElement.className = document.documentElement.className.replace(/\bjs\b/,'no-js');
    }
    

Additional I will use [Cut the mustard](https://justmarkup.com/log/2015/02/cut-the-mustard-revisited/) to check for features.

    if('querySelector' in document && 'addEventListener' in window) {
      // code here
    } else {
      document.documentElement.className = document.documentElement.className.replace(/\bjs\b/,'no-js');
    }
    

There are many [ways](http://kryogenix.org/code/browser/everyonehasjs.html) where JavaScript is not available or executed in a browser and by using `window.onerror` we can handle them and show the same layout/functionality which would be shown for users who disabled JavaScript.