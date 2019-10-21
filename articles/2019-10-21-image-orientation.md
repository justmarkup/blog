---
title: image orientation on the web
description: Learn about the current status of image orientation on the web, how to fix it using Node.js and a look in the future
ogImage: https://justmarkup.com/img/image-orientation.png
ogImageAlt: image-orientation
date: 2019-10-21T10:18:43+00:00
tags:
    - article
layout: layouts/post.njk
---

I am currently working on a little side project, where I upload images to my server (using file input and additionally Web Share Target) to make them available to others. While I had a first working version ready pretty quickly there was one problem – when uploading a portrait image from my phone, the image was shown with the wrong orientation.

In this article you will learn about the current status of image orientation on the web, how to correct orientation of images using Node.js, and how browsers will handle this in the future.

## Current status

![Young person behind a waterfall. Text on the image is top, right, bottom, left clockwise and in the center it says six.](https://justmarkup.com/testimg/Portrait_6.jpg)

If you view this image (I it got from the [exif orientation examples](https://github.com/recurser/exif-orientation-examples)) it may show correctly in portrait mode or it may incorrectly be shown 90deg rotated to the left.

You are most probably a browser on iOS if you see the word top actually at the top and another browser if you see the word top on the left. The reason for this is that the EXIF data for this image has the info *Rotate 90 CW* for orientation.

When you embed the image using ```<img>```, or ```background-image``` the image will be shown wrong in all browsers, except from browsers on iOS. If you, however, open the [image](https://justmarkup.com/testimg/Portrait_6.jpg) directly it will be shown correctly in Firefox, Chrome and Safari, but will still be shown wrong rotated in Edge and Internet Explorer. What a great consistency!

## The image-orientation property

When looking for possible ways to fix orientation using CSS or JavaScript I found about the [image-orientation property](https://drafts.csswg.org/css-images/#the-image-orientation). 

At the moment this property is only supported in Firefox and you can use it this way so browsers honor the EXIF data and *fix* the orientation:

```css
img {
    image-orientation: from-image;
}
```

When looking for more information I also found that this property is already [deprecated](https://github.com/w3c/csswg-drafts/issues/4164) which was confusing to me at first, because this property would be an easy way for me to fix my issue with image orientation if it would be supported by all browsers.

After reading some more through the Github issue, I learned that the plan is that all browsers will honor the EXIF orientation in the future, and therefore will use ```image-orientation: from-image``` by default. Great, that's what I want!

## Fixing the orientation with Node.js

We learned so far that there is quite some disagreement among browsers how to deal with EXIF orientation and no cross-browser way to easily correct it on the front end. In short, it is quite a mess and as we don`t want that some users will see *broken* images, let's see how we can *fix* this using Node.js.

First, we need a form to upload our images:

```html
<form class="form" action="./upload" enctype="multipart/form-data" method="POST">
    <label for="file">Select image: </label>
    <input type="file" required name="file" multiple="" accept="image/*">
    <input type="submit" value="Upload your photos">
</form>
```

Once you select an image and submit the form a POST request will be made to /upload, so let's see the upload route next:

```js
app.post('/upload', upload.array('file'), async(req, res, next) => {
    const images = req.files;

    for (image of images) {
        await correctOrientation(image);
    }

    res.redirect('./show');
});
```

We are using multer as a middleware here to process the images and for every image we call ```correctOrientation``` to correct the orientation.

Before we look into ```correctOrientation```, here is the multer configuration we are using to save images to our /uploads folder.

```js
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "uploads"));
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '__' + file.originalname);
    }
})

const upload = multer({ storage: storage });
```

So, let's see the interesting part - the correction of the image orientation:

```js
const readFileAsync = async(file) => {
    return await new Promise((resolve, reject) => {
        fs.readFile(file, async(err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
};

const correctOrientation = async(image) => {
    let imageOrientation = false;
    let rotateDeg = 0;

    const buffer = modifyExif(await readFileAsync(path.join(__dirname, "uploads") + '/' + image.filename), data => {
        imageOrientation = data && data["0th"] && data["0th"]["274"] ? data["0th"]["274"] : false;
        if (imageOrientation) {
            if (imageOrientation === 1) {
                imageOrientation = false;
            } else {
                data["0th"]["274"] = 1; // reset EXIF orientation value
            }
        }
    });

    if (imageOrientation) {
        switch (imageOrientation) {
            case 3:
                rotateDeg = 180;
                break;
            case 6:
                rotateDeg = 270;
                break;
            case 8:
                rotateDeg = 90;
                reak;
            default:
                rotateDeg = 0;
                break;
        }
        Jimp.read(buffer, (err, lenna) => {
            if (err) {
                console.log('err', err);
                return;
            }
            lenna
                .rotate(rotateDeg) // correct orientation
                .write(path.join(__dirname, "uploads") + '/' + image.filename); // save
        });
    }
};
```

First we define ```readFileAsync``` which turns the fs.readFile function in to a promise.

Now, let's see what we have in the actual function. First, we are using the [modify-exif package](https://www.npmjs.com/package/modify-exif) to set the EXIF orientation value for every image to the value of *1* (the default one) if it was not already *1*.

After we changed the EXIF information, we now use [jimp](https://www.npmjs.com/package/jimp) to rotate the image according to EXIF orientation value we got before and re-save the image.

And that's it - all images are now correctly shown in every browser.

You can find the [full example](https://github.com/justmarkup/demos/tree/gh-pages/image-orientation) on Github.


## Conclusion

As of now, the only browser honoring the EXIF orientation is browsers on iOS, but there is hope that all other browsers will sooner or later also honor it and show the correct orientation. This way this issue would get solved automatically and we developers have one less issue to deal with.

However, for the moment the only way to fix the orientation problem, is by removing the EXIF orientation data and rotating the image accordingly which can either be done manually or using your favorite back end. It would also be possible to correct it on the client-side using JavaScript, but I advise against it as we should outsource as less as possible of the heavy work to the front end and therefore the user.

Happy coding and don`t forget to tell your favorite browser that they should honor EXIF orientation and fix this issue.
