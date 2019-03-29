---
title: Input type email – better don’t use it!
description: 
date: 2015-02-13T12:07:51+00:00
oldUrl: https://justmarkup.com/log/2015/02/input-type-email-better-dont-use-it/
tags:
    - article
layout: layouts/post.njk
---

**Last update: 21.03.2017 – updated browser support for Chrome, added info about punycode in Chrome**

**tl;dr If you want to use input type=”email”, be aware that international email addresses (containing Umlaut, non-latin characters…) are not supported in every browsers and you may exclude users using such an email address from using your service. Furthermore, the current version (56) of Chrome translates international addresses to punycode, so if a user registers with test@ö.at, the value you will receive will be test@xn--nda.at in Chrome but test@ö.at in all other browsers supporting international email addresses. So, think twice and be careful using it!**

According to a [survey](http://www.quirksmode.org/blog/archives/2015/02/poll_results_po.html) by Peter-Paul Koch input type=”email” is the most used advanced input type. Which makes sense in my opinion as almost every site using a form also has a field for email. So, at a first glance it seems perfect to use it, browsers who support it will validate it, most mobile browsers will add the @ sign to the keyboard and most importantly, if a browser doesn’t support it, it falls back to type=”text”.

![screenshot Safari on iPhone6](https://justmarkup.com/log/wp-content/uploads/2015/02/safari_iphone6.png)

![screenshot from Lumia520](https://justmarkup.com/log/wp-content/uploads/2015/02/windows81_lumia520.png)

However, at a second glance, you will find out that it comes with some disadvantages and unexpected behaviors.

### Validation

You can use type=”email” to validate the value of the input. I put together a simple [test](https://jsbin.com/vakucin/2/edit?html,outputt) to find out which browsers accept which values for input type=”email”.

Here are the values I tested:  
1) test  
2) test@  
3) test@test  
4) test@127.0.0.1  
5) test@test.test  
6) test.O’test@test.com  
7) test@testä.com  
8) test@郵件.商務  
9) test@मोहन.ईन्फो  
10) testρ@εχαμπλε.ψομ  
11) !#$%&’\*+-/=?^\_\`.{|}~@test.com  
12) user+mailbox/department=shipping@example.com

Expect from 1 and 2 (which are invalid email addresses in any case), most browsers (expect from Firefox and Chrome – see Note 1) also invalidates 7 (Umlaut), 8 (Chinese), 9 (Hindi) and 10 (Greek). This list is far from complete, there are lots of languages with different writing systems.

[![World alphabets & writing systems](//upload.wikimedia.org/wikipedia/commons/thumb/a/aa/World_alphabets_%26_writing_systems.svg/1000px-World_alphabets_%26_writing_systems.svg.png)](http://commons.wikimedia.org/wiki/File%3AWorld_alphabets_%26_writing_systems.svg "By George Tsiagalakis [CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0)], via Wikimedia Commons")

Image by George Tsiagalakis \[[CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0)\], [via Wikimedia Commons](http://commons.wikimedia.org/wiki/File%3AWorld_alphabets_%26_writing_systems.svg)

\* Note 1: Firefox added support for [international emails](https://bugzilla.mozilla.org/show_bug.cgi?id=618876) in Version 26 and Chrome also supports them (at least since version 56 – couldn’t find exact information when it was added).

### Unexpected values

In the latest Chrome version (56) international email addresses are now supported, but Chrome handles it different from Firefox. Chrome is transforming international email addresses to punycode, so if the input value is test@ö.at the value will be test@xn--nda.at.

You can test it yourself in this [jsbin](http://jsbin.com/nuqovod/2/edit?html,js,console,output).

This can lead to a lot of trouble, imagine a user registers with test@ö.at in Chrome, you will save test@xn--nda.at as the email in the database. Now, the next time the user is using Firefox to login to your site using test@ö.at and the correct password, access will be denied as in Firefox the value send is test@ö.at (which you don’t know about) and not test@xn--nda.at. The only way this can be solved is by checking if the value contains punycode on the server side and decode it there.

As far as I interpret the [Specification](https://www.w3.org/TR/html5/forms.html#e-mail-state-(type=email)) the way Chrome is handling it is correct, but I may misread this.

In any case we have different behaviours in different browsers at the moment and if you don’t want to handle it on the server side you better avoid `input type="email"` for the time being.

### A regex a day…

If you want to validate against international email addresses and exclude domains with no TLD input type=”email” is not really our best bet. So, RegExp to the rescue you may say. Well, I thought so too but soon realized that a regular expression for this is way over my head. So, I asked [Mathias Bynens](https://twitter.com/mathias) for help on twitter and he pointed me to a [StackOverflow answer](http://stackoverflow.com/questions/27829640/how-to-match-unicode-by-writing-system-script/27858354#27858354) where he shows how to generate regular expression for different Unicode writing styles.

While in theory it is probably possible to generate a Regex which matches every valid international email address I won’t still not trust it. Which brings me to the following conclusion – please do not use a pattern for email validation. Every regular expression for email validation is missing something. Lots of people gone through the process with the conclusion, that it is nearly impossible to get a perfect validation. If you don’t care about international email addresses use type=”email” without the pattern attribute.

For reference here is the regular expression defined by the W3C for a valid email address (this does not include international email addresses):

/^\[a-zA-Z0-9.!#$%&’\*+/=?^\_\`{|}~-\]+@\[a-zA-Z0-9-\]+(?:\\.\[a-zA-Z0-9-\]+)\*$/

### Conclusion

From my part, I will not use input type=”email” anymore in any of my projects. Preventing potential users for signing up with their email address (which may contain umlaut, non-latin characters…) is for me more important than semantic, validation and the @ on some virtual keyboards.

If you would like to see international email address validation for input\[type=email\] in Microsoft Edge, please vote for it [on Windows Uservoice](https://windows.uservoice.com/forums/285214-microsoft-edge/suggestions/7855248-support-international-email-address-validation-for), thanks!