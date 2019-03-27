---
title: Distrusting certificates – Time to act if you use a StartCom (StartSSL) or WoSign certificate
description: 
date: 2016-12-20T17:37:28+00:00
tags:
    - note
layout: layouts/post.njk
---

**Info: If you are using a certificate from StartCom (for example the free StartSSL certificate) or WoSign you should start switching to another certificate (from [Let’s Encrypt](https://letsencrypt.org/) or any other trusted one). Otherwise, your site will be marked as insecure and might not be accessible to users in the next stable Version of Chrome (56) and Firefox (51) which will both be released at the beginning of 2017.**

This month my SSL certificate from StartSSL for justmarkup.com had to be renewed. This task is normally done pretty quick and I didn’t expect any problem. Some days later I updated my Chrome to Version 56 and suddenly my site was marked as insecure and I had to explicitly allow it to access it.

![Chrome 56 showing justmarkup.com as insecure because of a StartSSL certificate. Screenshot by  Anselm Hannemann](https://justmarkup.com/log/wp-content/uploads/2016/12/api8i4lFwL.png)

Chrome 56 showing justmarkup.com as insecure because of a StartSSL certificate. Screenshot by [Anselm Hannemann](https://twitter.com/helloanselm)

I tried to access it in other browsers, but they all showed the site as secure and after some debugging and trying to find the problem I came across an [article by the Google security team](https://security.googleblog.com/2016/10/distrusting-wosign-and-startcom.html). As you can read there, as of Chrome 56 (and also [Firefox 51](https://blog.mozilla.org/security/2016/10/24/distrusting-new-wosign-and-startcom-certificates/) as I later found out) certificates from StartCom (including their free StartSSL certificates) and WoSign will no longer be accepted and sites using them will be marked as insecure.

Before Let’s encrypt came out a lot of people got their certificate from StartCom as they were one of the only ones available for free. I expect a lot of people still use them and I hope they find out about the problem soon enough so their sites will still be available after the next stable releases.

Thanks to [Anselm Hannemann](https://twitter.com/helloanselm) for reminding me about the issue yesterday, so I finally took the time to switch servers and to Let’s Encrypt.