---
title: Reduce your client-side JavaScript in Next.js 
description: In this article I would like to outline some ways to ship less client-side JavaScript in Next.js.
ogImage: https://justmarkup.com/img/icons/icon-512x512.png
ogImageAlt: justmarkup
date: 2021-02-10T21:01:10+00:00
tags:
    - article
layout: layouts/post.njk
---

I am currently working on a side-project, where most parts are static, but there are pages where I need to access a database and do things on the server which I can not pre-build. In the past I would have probably used Node.js with an Express server for this, but I thought it is time to give Next.js a try. After using it for some weeks, I have to say I like it, and it is a good option for these type of projects.

The performance you get with Next.js is already pretty good, but there is always room for more. In this article I would like to outline some ways to ship less client-side JavaScript in Next.js.

## Disable client-side JavaScript

Almost every app or site has one or various landing pages. And let's be honest here - a lot of users visiting your landing page(s) will leave your site without further interacting with it. Therefore, we should do our best to serve that page(s) as fast as possible and requesting as few data as possible. If it takes too long to load, people may even leave before they see the content – another potential customer lost.

Among optimizing images, limiting web fonts and other performance improvements, we could serve this pages without any client-side JavaScript. Almost all landing pages I ever visited are static and not interactive, so why ship JavaScript if you don't need it there?

In Next.js by default there will always be client-side JavaScript, but you can disable this with this experimental config.

```css
export const config = {
  unstable_runtimeJS: false
};
```

You can add this to every page (path), where you don't need client-side JavaScript. I said it is experimental, so while it works great for me, there may be some edge cases where this won't work.

I learned about this one from [Andy Bell](https://piccalil.li/blog/new-year-new-website)

## Use Preact

You don't have only landing pages in most of the cases, so what can you do to reduce the size of your client-side JavaScript? A good approach for many apps to replace React with Preact.

As a first step to use Preact instead of React, we should install the needed Preact packages by running

```bash
npm install --save preact preact-compat preact-render-to-string
```

in your terminal.

Now we can open our package.json and alias React to Preact with:

```bash
"react": "github:preact-compat/react#1.0.0",
"react-dom": "github:preact-compat/react-dom#1.0.0"
```

and after that open your terminal and run

```bash
npm install
```

just to be sure.

As a last step, we can uninstall ```react``` and ```react-dom``` by running

```bash
npm uninstall react react-dom
```

In the end it should look like this:

```javascript
{
  "dependencies": {
    "preact": "^10.5.12",
    "preact-render-to-string": "^5.1.12",
    "react": "github:preact-compat/react#1.0.0",
    "react-dom": "github:preact-compat/react-dom#1.0.0"
  }
}
```

While using Preact instead of React will reduce your client-side JavaScript enormous, but be aware that not everything may work as expected by using Preact instead of React. You should still at least try to replace it, if you encounter unsolvable problems you can switch back pretty easy.

## Preload

Some time ago [Harry Roberts](https://twitter.com/csswizardry) asked about a way to [disable rel="preload" in Next.js](https://twitter.com/csswizardry/status/1349681832393109510?s=20), and they got some good answers there. As with disabling client-side JavaScript there is an experimental config setting for disabling Preload using:

```css
export const config = {
  unstable_JsPreload: false
};
```

This has only been added [recently](https://github.com/vercel/next.js/pull/21329/files) so may not be available in the Next.js version you are using. And it is also experimental, so be aware that I may not always work like expected.

## Conclusion

Next.js is already doing a great job regarding performance, but as you can see there are some ways to reduce the JavaScript code users have to download and most important, the JavaScript code the browser has to parse and execute. I always recommend testing your site with an average Android Device like the Moto G. If you don't own such a device you can also use [WebPageTest](https://webpagetest.org/easy.php) to test on a real Moto G – if your site loads fast there, you have done a great job.

## Resources

* [Go Preact!](https://fettblog.eu/go-preact/)
* [Using Preact Instead of React in a NEXT.js Project](https://justinnoel.dev/2020/05/12/using-preact-in-a-next-js-project/)
* [New year, new website ](https://piccalil.li/blog/new-year-new-website)
