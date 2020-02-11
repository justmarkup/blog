---
title: Share images to your website using the Web Share Target API
description: Learn how to use Web Share Target API to share images to your site and handle the data.
ogImage: https://justmarkup.com/img/icons/icon-512x512.png
ogImageAlt: justmarkup
date: 2020-02-11T11:46:43+00:00
tags:
    - article
layout: layouts/post.njk
---

Last year my daughter was born, and of course we wanted to be able to share pictures of her with family and friends. I could have used any of the available services to share photos/galleries with them, but I don't feel comfortable at all that pictures of here are saved somewhere I don't really have access to. So, I made a simple web app, where my partner and me can upload the images to my server and family and friends can see them if they have the credentials.

To make it more convenient for us, I added the possibility to share photos directly from the phone gallery to the website. In this article, you will learn how to use the Web Share API to share images to your website and handle the data.

## Manifest

To be able to use the [Web Share Target API](https://wicg.github.io/web-share-target/) we first need to add a ```share_target``` entry to our Web App Manifest (manifest.webmanifest).

```json
"share_target": {
    "action": "./upload",
    "method": "POST",
    "enctype": "multipart/form-data",
    "params": {
        "files": [{
            "name": "file",
            "accept": ["image/*"]
        }]
    }
}
```

The ```params``` keys will be used as query parameters when the target is launched, so you can access them from /upload just like an HTML form submission has happened.

So, the same data will be send to /upload as if we used this form:

```html
<form class="form" action="./upload" enctype="multipart/form-data" method="POST">
    <label for="file">Select images: </label>
    <input type="file" id="file" name="file" multiple>
    <input type="submit" value="Upload your images">
</form>
```

With this in place, now let's see how to handle the data once a user shares them with our site.

## Handling the data

We can handle the data like any other POST request to our server. In Node.js this would look like this:

```javascript
const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  }
});

app.post('/upload', upload.single('file'), function(req, res) {
  const file = req.file;
  // now you can do whatever you want with the file 
});
```

The other option is to handle the request via an Service Worker. Here, we listen on the fetch event, check if the request method is POST and the URL is the one defined as action in our ```share_target``` in the Manifest file.

If this is the case, we redirect the user to our defined page and send the file data via ```postMessage```.

```javascript
addEventListener('fetch', event => {
    // ignore all requests with are not of method POST and which are not the URL we defined in in share_target as action
    if (event.request.method !== 'POST' || event.request.url.startsWith('https://justmarkup.com/demos/web-share-target-image-to-grayscale/upload') === false) {
        return;
    }

    // Code mostly from https://paul.kinlan.me/file-web-share-target/
    event.respondWith(Response.redirect('https://justmarkup.com/demos/web-share-target-image-to-grayscale/output.html'));
    event.waitUntil(async function() {
        const data = await event.request.formData();
        const client = await self.clients.get(event.resultingClientId || event.clientId);

        const file = data.get('file');
        // send the image data to the client
        client.postMessage({ file, action: 'load-image' });
    }());
});
```

Now, on the client (output.html) we can listen to ```onmessage``` event and do some stuff with the image data we received.

```javascript
navigator.serviceWorker.onmessage = function(event) {
    const imageBlob = event.data.file;
    // we now have the file data and can for example use it as a source for an img with the id image on our page
    const image = document.getElementById('image');
    image.src = URL.createObjectURL(imageBlob);
};
```
After all the code and explanation, let's look at a demo.

## Demo

Ever wanted to easily convert an image to an grayscale image on your phone? I do sometimes, and that's why I build a demo using the Web Share Target API to achieve exactly that.  

For this I used the Service Worker way to handle the data. Once the data is received on the client, I use drawImage from canvas to draw the image in canvas, use the grayscale filter to convert it to a grayscale image and output the final image.

```javascript
navigator.serviceWorker.onmessage = function(event) {
    const imageBlob = event.data.file;
    const image = document.getElementById('image');
    image.src = URL.createObjectURL(imageBlob);

    const canvas = document.getElementById("canvas");
    const img = document.createElement('img');
    const ctx = canvas.getContext('2d');

    img.src = URL.createObjectURL(imageBlob);
    img.crossOrigin = "anonymous";

    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.filter = "grayscale(100%)";
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const data = canvas.toDataURL("image/jpeg");
        image.src = data;
    }
};
```

Here is the final [demo](https://justmarkup.com/demos/web-share-target-image-to-grayscale/) and you can find the code on [Github](https://github.com/justmarkup/demos/tree/gh-pages/web-share-target-image-to-grayscale).

## Support

Currently the Web Share Target API is only [supported in Chrome](https://www.chromestatus.com/feature/6124071381106688) and also only on Android. Nevertheless, this is a good progressive enhancement. If the browser supports if you can enhance the  upload experience and let users directly share images from their phone without opening the site first.