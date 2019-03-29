---
title: Share quotes via twitter
description: 
date: 2014-12-18T13:08:19+00:00
oldUrl: https://justmarkup.com/log/2014/12/share-quotes-via-twitter/
tags:
    - article
layout: layouts/post.njk
---

Some days ago Christian Heilmann (@codepo8) wrote [“Great publishing works with the medium, not against it”](https://medium.com/@codepo8/great-publishing-works-with-the-medium-not-against-it-fc7e66bbac88), where he argues against posting images with quotes on twitter. I totally agree with him, images with text included are a bad way to spread the word.

This reminded me about an idea I had some months ago. The idea is to have a classic tweet link (http://www.twitter.com/share) at the bottom of the page and once you select a text, the text gets highlighted and you see a share button above the text.  

![Share button above selected text](https://justmarkup.com/log/wp-content/uploads/2014/12/sharebutton.png)

After clicking “Tweet” you will get redirected to twitter with the selected text filled in the textarea. Furthermore you will notice that after selecting a text, the text will be added to the hash of the url. This way I can later reference the tweet with the text you selected, even if you decide to shorten/change the text of your tweet.

### Where is the quote?

This is in fact not a new idea, medium.com and feedly, just to name two, already use similar share buttons. The new part about my script happens once somebody clicks the link you posted on twitter. After the page opens, the script grabs the quote from the hash, highlights the text and scrolls directly to the emphasized text. This way you can share quotes without the need of making a screenshot of the selected text and posting that as an image. Pretty neat, eh?

The nice thing is that the [highlight part](https://justmarkup.com/texttweet/index.html#If+you+use+an+old+browser+or+JavaScript+is+not+available+the+tweet+button+at+the+bottom+is+still+usable%2E) works in almost every browser (if JavaScript is available).

Furthermore if you are on a touch device or any older browser where the selection is not available there is still the tweet button sitting at the bottom ready to use.

It needs more testing though, but I am quite happy with the current state, here is an [example](https://justmarkup.com/texttweet/index.html).

The code is on [Github](https://github.com/justmarkup/texttweet.js) and any help is more than welcome. Especially tests for older browsers, ways to get the selection part working on touch devices and accessibility improvements.