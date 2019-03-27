---
title: The download attribute
description: 
date: 2015-01-13T09:38:38+00:00
tags:
    - article
layout: layouts/post.njk
---

The download attribute indicates the browser that a link should trigger the “Save as…” dialog instead of opening the file directly in the browser.

Here is an example:

    <a href="/363946739467/64634.jpg" download="custom-filename">Link</a>

As you can see you can specifiy the filename (in the example custom-filename) the file should be saved as, the extension will be added automatically.

### Use cases

There are various handy ways to use this attribute. You can use if for pdf files (which in some browsers get opened directly in browsers), which you want to be saved locally, eg. tickets. Another use case could be a Download-Section for your logos or link to music files. It is also great if you have a gallery and want to offer a “download fullsize image” link.

### Demo

[Demo-Link without download attribute](/images/layout/logo.png)  
[Demo-Link with download attribute (filename set to justmarkup)](/images/layout/logo.png)

![screenshot from save as modal](https://justmarkup.com/log/wp-content/uploads/2015/01/saveas.png)

### Browser Support

See support on [Can I use](http://caniuse.com/#feat=download). It’s currently (Jan 2015) not supported in Internet Explorer ([Under Consideration](https://status.modern.ie/adownloadattribute)) and Safari and there are some problems on Linux ([Known issues](http://caniuse.com/#feat=download)). But as it’s not breaking anything if a browser doesn’t support it, you can use it safely today.

### Show filesize

When providing a Download-Link you should also consider showing the size of the file. This will help the user to decide if it’s worth to download the file. Always remember that a user may use Roaming (and yes also on [Laptops](http://www.smashingmagazine.com/smashing-newsletter-issue-128/)) and don’t want to waste his limited bandwidth. Detecting the file size is not possible on the client-side but can easily be done server-side.  
Here is an example for php:

    <?php echo filesize($filename); ?>

And if you use Node.js you can use the following code:

    function getFilesizeInBytes(filename) {
     var stats = fs.statSync(filename)
     var fileSizeInBytes = stats["size"]
     return fileSizeInBytes
    }
    

### Conclusion

The download attribute is really helpful and can be used in many ways to enhance the user experience. You should consider using it when linking to big files or files which should be downloaded.