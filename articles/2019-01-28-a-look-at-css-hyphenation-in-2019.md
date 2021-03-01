---
title: A look at CSS hyphenation in 2019
description: 
date: 2019-01-28T10:40:34+00:00
oldUrl: https://justmarkup.com/log/2019/01/a-look-at-css-hyphenation-in-2019/
tags:
    - article
layout: layouts/post.njk
---

I recently worked on a web site which used big headlines (as in font-size) and also is available in German. This means there are often rather long words and they often don’t fit in the surrounding container. Without doing anything this would »break« the layout as a horizontal scroll bar would appear. So, I reread an article I wrote almost four years ago about [Dealing with long words](https://justmarkup.com/log/2015/07/dealing-with-long-words-in-css/) and implemented the final solution.

This seemed to still work great, but there were some issues with this approach. Let’s have a look at the browser support of CSS Hyphenation, how to use it today and which feature I would like to see in browsers.

Browser support
---------------

Support for [CSS Hyphenation](https://caniuse.com/#feat=css-hyphens) is pretty good. You should keep in mind that while it works in Chromium-based browsers on Mac & Android platforms it doesn’t work at the moment (January 2019) on [Windows and Linux](https://bugs.chromium.org/p/chromium/issues/detail?id=652964). It also doesn’t work in Opera Mini and some other mobile browsers (Blackberry browser, IE mobile, …), but overall the support is solid.

**Update 2021**: Hyphenation is now also supported in Chromium on Windows.

Using CSS Hyphenation
---------------------

To use hyphens today we still need to add prefixes for IE/Edge/Chromium, so it is best to use the following for every text which should use hyphens:

``` css
.hyphenate {
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
}
```

As you probably want to break words and not the layout in unsupported browsers I recommend the following. This way all words will be hyphenated in supported browsers and will break into new lines in unsupported browsers.

``` css
.hyphenate {
    overflow-wrap: break-word;
    word-wrap: break-word;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
}
```

Now, that we know how to use CSS Hyphenation today, let’s have a look at what’s missing to make it even better.

Too much Hyphenation
--------------------

The biggest problem we had with Hyphenation was that it simple hyphenates too often. What this means shows the following example, here it hyphenates the word Josef (Joseph), which doesn’t look great. It also makes the text harder to read and therefore a little bit less accessible.

![Über Josef Hauser](https://justmarkup.com/log/wp-content/uploads/2019/01/josef-hauser.png)

This is because, unless the UA (user agent) is able to calculate a better value, it is suggested that `hyphens: auto` means two for before and after, and five for the word total. This means hyphens will be used for every word, which is at least five characters long and it will break after/before a minium of two words.

I am not sure why they came up with this default values, but here we are now having them. There is a solution though already defined in the specification – The [hyphenate-limit-chars property](https://www.w3.org/TR/css-text-4/#hyphenate-char-limits).  
It specifies the minimum number of characters in a hyphenated word and thus we can use it to override the default value of 5 (word length) 2 (before break) 2 (after break).

So, in theory we could use the following to only use hyphens for words with 10 characters or more and only break before/after after four characters:

``` css
hyphenate-limit-chars: 10 4 4;
```

In reality, this property is still only supported in Internet Explorer 10+ and in Edge with the -ms prefix. It would be really great to get better support for hyphenate-limit-chars – so please let your favorite browser(s) know that you want it – thanks! Here is the issue for [Chromium](https://bugs.chromium.org/p/chromium/issues/detail?id=924069) and here for [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1521723)

Additional note: Webkit-based browsers (Safari) support the -webkit-hyphenate-limit-before, -webkit-hyphenate-limit-after and -webkit-hyphenate-limit-lines [properties](https://github.com/WebKit/webkit/blob/master/LayoutTests/fast/text/hyphenate-limit-before-after.html), which lets you also define the minimum length and the minimum characters before/after a break.

As you can see support for CSS Hyphenation is pretty solid in 2019. The only issue for me is the lack of support for the hyphenate-limit-chars property which will hopefully get better in the future when enough users/developers request it.

Update from 28.01.2018: Added info about similiar properties for webkit-based browser as pointed out by [Alexander Rutz](https://twitter.com/petitsanimaux/status/1089841643195383814) and [Jiminy Panoz](https://twitter.com/JiminyPan/status/1089841172040876032).
