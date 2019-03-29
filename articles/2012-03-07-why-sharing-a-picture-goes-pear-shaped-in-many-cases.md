---
title: Why sharing a picture goes pear-shaped in many cases
description: 
date: 2012-03-07T11:10:48+00:00
oldUrl: https://justmarkup.com/log/2012/03/why-sharing-a-picture-goes-pear-shaped-in-many-cases/
tags:
    - article
layout: layouts/post.njk
---

As it happens a lot that you get a link from a friend saying “Look at this cute cat” and once you open the picture you actually get to see a “big pink dog”, I went on and tested some of the most visited news sites in Germany to see if it’s possible to share a specific image out of a gallery just by copying the URL from the address field.

Here is what I came up with.  

### [spiegel.de](http://spiegel.de)

The link I tested on this site was [this one](http://www.spiegel.de/fotostrecke/fotostrecke-79544-3.html). Sharing on non-mobile devices works well however once viewing this link on mobile you get [this](http://www.spiegel.de/fotostrecke/fotostrecke-79544.html#spRedirectedFrom=www). #fail

### [bild.de](http://bild.de)

I tried to share Image 4 in this [gallery](http://www.bild.de/schlagzeilen-des-tages/ateaserseite/der-tag-bei-bild/ateaserseite-15480098,tbid=20239438,cid=23017780.bild.html). Impossible as you always get to see the first image. #fail

### [welt.de](http://welt.de)

Here I tried to share Image 6 from this [gallery](http://www.welt.de/politik/article13903167/Oeffentlichkeitsscheu-Russlands-neue-alte-First-Lady.html). Nope, again no chance to share this specific image. #fail

### [sueddeutsche.de](http://sueddeutsche.de)

On this site I wanted to share this [image of a wale](http://www.sueddeutsche.de/leben/bilder-des-tages-momentaufnahmen-im-maerz-1.1297863-3). And surprise, surprise this is the first image I can share between different devices. #good

### [stern.de](http://stern.de)

Seems like we now have a run. Sharing this [picture](http://www.stern.de/digital/cebit/cebit-eroeffnung-merkel-looking-at-things-1796092-578f337d0900c121.html) works like a charm as well. #good

### [focus.de](http://focus.de)

Oh look at the [tiger on picture 4](http://www.focus.de/wissen/wissenschaft/artenschutz/bedrohte-tiere-groesster-feind-mensch_did_25875.html). What you actually see is not a tiger at all but some other animals. On my Android 2.3 device you even have to close 2 Pop-ups (asking if you want to install the App) before you get to the article, but no wonder still no tigers. #fail

### [zeit.de](http://zeit.de)

Here I tried to share [picture 13](http://www.zeit.de/kultur/kunst/2012-03/fs-state-of-the-art-photography). Unfortunately this is not possible, as you always get to see the first picture, on mobile the same of course. #fail

### Results are frustrating

To sum it up, out of 7 tested sites only 2 provided me with a link to a specific image which I could share with whatever device I like. One (spiegel.de) is doing his job on desktop, but once you go mobile they fail completely. As a side note – sueddeutsche.de was the only gallery where you could use your keyboard to navigate through the images, which is a terrible quota.

I really don’t know why so many sites have problems changing the URL while clicking through there “fancy” JavaScript Gallery. It’s just some lines of JavaScript, to add a different hash to the URL for every image and on the other hand checking if a hash is present to show the image the user asked for. If you don’t like hashes in your url you can also use the HTML5 History API like this [cross-browser Solution](https://github.com/balupton/History.js/).

### Conclusion

I am really the only one who is pissed of, that fancy effects seems way more important than some of the basics? I absolutely hope not.