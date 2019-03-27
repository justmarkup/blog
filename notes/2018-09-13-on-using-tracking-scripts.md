---
title: On using tracking scripts
description: 
date: 2018-09-13T17:06:37+00:00
tags:
    - note
layout: layouts/post.njk
---

Today, I saw a tweet from [Jeremy Keith (@adactio)](https://twitter.com/adactio/status/1040189418445914113)

> Too many businesses treat analytics and tracking scripts as victimless technologies — they only see the benefits (in data acquisation) without understanding the costs (in performance).

which inspired me to write about the benefits and the costs for a business and for the user when using tracking scripts.

On the business side
--------------------

### Benefits

**1) Free data acquisition**

When using tracking scripts you can get a lot of free data from your users. You can identify a user, check what sites they visited, see the sources where they came from, check where they clicked on your site, check every mouse move and much more depending on what tracking script(s) you are using.

**2) Make more money**

One of the main benefits I often hear when companys want to use tracking software is that they are sure they can make more money if they know everything about their user. In theory this may be the case, but if even Amazon is unable to provide great recommendations (just ask everyone selling a book on Amazon how often they saw a recommendation to buy their own book :-)), I am unsure your company can improve sales by evaluating all the collected data.

**3) Be sure that the user experience is bad**

With all the collected data you may find out that a lot of user leave the registration form before finishing it. You may find many more issues after studying all the data. While this may be a benefit, most of this issues could be found without tracking, eg. by user testing. If you actually improve the user experience based on data, good, from my experience as a user and as a developer this rarely happens.

### Costs

**1) Implement the script(s)**

When using a tracking script, someone needs to implement it, so there are development costs. The cost may be low, if you only add a third-party script to the site, but may cost quite a lot if you want to track custom events or use more advanced features.

From a user perspective
-----------------------

### Benefits

**1) Better user experience**

As said before a site could improve the user experience based on the data they collected. So, this is a potential benefit for you as a user.

**2) ???**

I am really not sure if there is any other benefit from a user perspective. If you know one please let me know hallo@justmarkup.com

### Costs

**1) Performance**

When using tracking scripts the performance of a site will automatically decrease. When a user is using a fast network they may not notice this, but on 3G or 2G this tracking scripts may increase the load time by several seconds. Many sites even load this scripts in the head (without async or defer) and will block other resources. When loading a tracking script is your first priority, I can’t trust your business.

**2) Privacy**

Depending on what tracking scripts you are using you can get a lot of information about a user (often without the knowledge of the user). Many sites also happily share this data with other companies. If you include Google Analytics they also get all the data and they can combine this with data from other sites easily (not saying they are doing this). Again, most users are not aware that their data is collected and shared and are shocked when they discover this.

**3) Real money loss**

I have seen sites using no more than seven different tracking scripts, together about 700kb in ~40 requests. For a user in Canada on a postpaid data plan this [costs ~0.09 $](https://whatdoesmysitecost.com). Yes, this is an extreme case and most tracking scripts are below 50kb, but if you think about it that users actually have to buy money so they can get tracked is really crazy.

**4) Potential errors**

When loading an external resource on a site, the JavaScript which gets executed may cause an error on a site. In the worst case the whole site may be unusable because of a third-party script. Developers of third-party scripts of course test their scripts, but I am sure they don’t test in every browser and no matter how big the company is, there is always the potential that JavaScript with an error gets shipped.

This is also not only a cost for users, but also a cost for a business – if a user can’t finish a registration or a checkout you won’t make any money from this user.

**5) Vulnerability**

Imagine someone manages to hack Google Analytics. Yes, this is very unlikely, but it can be done. Once an attacker is able to change the content of the script, they would be able to manipulate all sites using the script, would be able to steal data and much more. Including a third-party script is like Russian roulette – you can be never sure the third-party script is doing any harm.

Best way to handle tracking scripts
-----------------------------------

Here is a list, how a business can handle tracking scripts, from best to worst.

1) Don’t use any tracking at all  
2) Only track on the server-side  
3) Only use self-hosted tracking scripts  
4) Load third-party tracking scripts  
5) Load several third-party tracking scripts  
6) Load all the third-party tracking scripts  
7) Load all the third-party tracking scripts before anything else

Conclusion
----------

When looking at the costs versus the benefits it is hard to believe that almost every website is using tracking scripts. It is like trying to sell a fridge on the south pole and nearly everyone you ask if they want one would say yes even they know that there are no real benefits but quite some costs.

The next time, you implement a tracking script it would be great if you could rethink it and ask yourself if it is really worth. When building [feediary](https://feediary.com) it was clear from the beginning that we don’t want to use any tracking at all and I am really happy about this decision.