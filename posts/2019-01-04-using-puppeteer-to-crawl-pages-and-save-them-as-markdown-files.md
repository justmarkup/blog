---
title: Using Puppeteer to crawl pages and save them as Markdown files
description: 
date: 2019-01-04T08:55:11+00:00
tags:
    - article
layout: layouts/post.njk
---

One of my goals for 2019 is to finally launch a redesign of this site and more importantly switch from WordPress to a Static Site. To get this rolling, I first need to have all my posts saved as Markdown. I first looked for some existing WordPress plugins to achieve this, but this wasn’t really working for me. I also could have used the WordPress REST API or even the RSS feed to get the data – again this didn’t feel like the right tools. Then, I read this [article](https://24ways.org/2018/dynamic-social-sharing-images/) by [Drew McLellan](https://twitter.com/drewm), where he writes about using Puppeteer to take screenshots of a page and use them for social sharing and I had a plan.

In this article I will describe how to use Puppeteer to find all articles of a page, open them one after another, extract the content, convert it to markdown and save them as separate files.

Get Puppeteer running
---------------------

[Puppeteer](https://github.com/GoogleChrome/puppeteer) is built on Node.js and provides a clean API to control headless Chrome. This means you can start a Chrome browser from the command line without ever drawing anything to a user interface window. You can open pages, it renders CSS, it runs JavaScript – so you can do everything Chrome on Desktop does, just without an user interface.

Before continuing you should already have Node.js [installed](https://nodejs.org/en/download/package-manager/).

To install Puppeteer run

    npm i puppeteer

in your command line.

This will install the API as well as a Chromium version (~200MB). On my Windows Subsystem for Linux I had some problems installing it, as dependencies were missing, so I had to install some more libraries, but after this extra installs all worked. If you have any problems installing Puppeteer, have a look at the [Troubleshooting page](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md).

Get the data
------------

First we launch a new browser with Puppeteer and go to a new page. To do this create a new file called index.js and insert the following:

    const puppeteer = require('puppeteer');
    
    (async() => {
        // start the browser
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        // open a new page
        const page = await browser.newPage();
        const pageURL = 'https://justmarkup.com';
        try {
            // try to go to URL
            await page.goto(pageURL);
            console.log(`opened the page: ${pageURL}`);
        } catch (error) {
            console.log(`failed to open the page: ${pageURL} with the error: ${error}`);
        }
    
        // all done, close the browser
        await browser.close();
    
        process.exit()
    })();
    

First, we require the Puppeteer library. Next we use `puppeteer.launch()` to create a new browser and `browser.newPage()` to define a new page/tab. Last we use `page.goto(URL)` to open an URL.

If we run `node index.js`, it should log “opened the page https://justmarkup.com” in the command line. There may also be an error (invalid URL, SSL error, timeout, resource failed to load) opening the URL, so we use a try/catch statement here to catch the possible [errors](https://github.com/GoogleChrome/puppeteer/blob/v1.11.0/docs/api.md#pagegotourl-options).

Now, that we know how to launch a browser and open an URL, let’s see how we can get data from the DOM of the page.

    const puppeteer = require('puppeteer');
    
    (async() => {
        // start the browser
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        // open a new page
        const page = await browser.newPage();
        const pageURL = 'https://justmarkup.com';
        try {
            // try to go to URL
            await page.goto(pageURL);
            console.log(`opened the page: ${pageURL}`);
        } catch (error) {
            console.log(`failed to open the page: ${pageURL} with the error: ${error}`);
        }
    
        // Find all links to articles
        const postsSelector = '.main .article h2 a';
        await page.waitForSelector(postsSelector, { timeout: 0 });
        const postUrls = await page.$$eval(postsSelector, postLinks => postLinks.map(link => link.href));
    
        // Visit each page one by one
        for (let postUrl of postUrls) {
    
            // open the page
            try {
                await page.goto(postUrl);
                console.log('opened the page: ', postUrl);
            } catch (error) {
                console.log(error);
                console.log('failed to open the page: ', postUrl);
            }
    
            // get the pathname
            let pagePathname = await page.evaluate(() => location.pathname);
            pagePathname = pagePathname.replace(/\//g, "-");
            console.log('got the pathname:', pagePathname);
    
            // get the title of the post
            const titleSelector = '.article h1';
            await page.waitForSelector(titleSelector);
            const pageTitle = await page.$eval(titleSelector, titleSelector => titleSelector.outerHTML);
            console.log('found the title', pageTitle);
    
            // get the content of the page
            const contentSelector = '.article .entry-content';
            await page.waitForSelector(contentSelector, { timeout: 0 });
            const pageContent = await page.$eval(contentSelector, contentSelector => contentSelector.innerHTML);
            console.log('found the content: ', pageContent);
    
        }
    
        // all done, close the browser
        await browser.close();
    
        process.exit()
    })();
    

First, we get all links to our posts we find in the entry page, in my case they can be targeted with the selector ‘.main .article h2 a’.

    // Find all links to articles
    const postsSelector = '.main .article h2 a';
    await page.waitForSelector(postsSelector, { timeout: 0 });
    const postUrls = await page.$$eval(postsSelector, postLinks => postLinks.map(link => link.href));
    

We define the selector and use `waitForSelector()` to be sure the DOM nodes are visible. Next, we use [page.$$eval(selector, pageFunction\[, …args\])](https://github.com/GoogleChrome/puppeteer/blob/v1.11.0/docs/api.md#pageevalselector-pagefunction-args), which runs `Array.from(document.querySelectorAll(selector))` within the page and passes it as the first argument to `pageFunction`. Lastly we use the `map()` method to get the links to the pages defined in the `href` attribute. Great, we now have an `Array` with all our links.

Now, it is time to open all links, one after another and get the data (headline, content, pathname) we need.

    for (let postUrl of postUrls) {
    
        // open the page
        try {
            await page.goto(postUrl);
            console.log('opened the page: ', postUrl);
        } catch (error) {
            console.log(error);
            console.log('failed to open the page: ', postUrl);
        }
    
        // get the pathname
        let pagePathname = await page.evaluate(() => location.pathname);
        pagePathname = pagePathname.replace(/\//g, "-");
        console.log('got the pathname:', pagePathname);
    
        // get the title of the post
        const titleSelector = '.article h1';
        await page.waitForSelector(titleSelector);
        const pageTitle = await page.$eval(titleSelector, titleSelector => titleSelector.outerHTML);
        console.log('found the title', pageTitle);
    
        // get the content of the page
        const contentSelector = '.article .entry-content';
        await page.waitForSelector(contentSelector, { timeout: 0 });
        const pageContent = await page.$eval(contentSelector, contentSelector => contentSelector.innerHTML);
        console.log('found the content: ', pageContent);
    
    }
    

We loop through the above defined `postUrls` and use `page.goto()` to open each URL. Now we get the pathname, which we will later use as our filename. Here we use `page.evaluate()` to get the `pathname` defined in `window.location`. We also replace all “/” with “-” to get a valid filename.

Next up is the main headline of the article. Here we define a selector (in my case ‘.article h1’), use `page.waitForSelector()` again to make sure it is visible, and use `page.$eval()` to get the `outerHTML` of the headline. We are using `outerHTML` so we can pass that to the HTML-to-markdown API later.

Lastly, we get the main content of the article. We define another selector (in my case ‘.article .entry-content’), use `page.waitForSelector()` again to make sure it is visible, and use `page.$eval()` to get the `innerHTML` of the content.

Great, we now know how to find URLs, how to open each URL and how to get data from a page.

Convert to markdown
-------------------

So, we now have all the needed data. As the next step we will use [Turndown](https://github.com/domchristie/turndown) to convert the HTML to Markdown.

    const puppeteer = require('puppeteer');
    const TurndownService = require('turndown');
    
    const turndownService = new TurndownService();
    
    (async() => {
        // start the browser
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        // open a new page
        const page = await browser.newPage();
        const pageURL = 'https://justmarkup.com';
        try {
            // try to go to URL
            await page.goto(pageURL);
            console.log(`opened the page: ${pageURL}`);
        } catch (error) {
            console.log(`failed to open the page: ${pageURL} with the error: ${error}`);
        }
    
        // Find all links to articles
        const postsSelector = '.main .article h2 a';
        await page.waitForSelector(postsSelector, { timeout: 0 });
        const postUrls = await page.$$eval(postsSelector, postLinks => postLinks.map(link => link.href));
    
        // Visit each page one by one
        for (let postUrl of postUrls) {
    
            // open the page
            try {
                await page.goto(postUrl);
                console.log('opened the page: ', postUrl);
            } catch (error) {
                console.log(error);
                console.log('failed to open the page: ', postUrl);
            }
    
            // get the pathname
            let pagePathname = await page.evaluate(() => location.pathname);
            pagePathname = pagePathname.replace(/\//g, "-");
    
            // get the title of the post
            const titleSelector = '.article h1';
            await page.waitForSelector(titleSelector);
            const pageTitle = await page.$eval(titleSelector, titleSelector => titleSelector.outerHTML);
    
            // get the content of the page
            const contentSelector = '.article .entry-content';
            await page.waitForSelector(contentSelector, { timeout: 0 });
            const pageContent = await page.$eval(contentSelector, contentSelector => contentSelector.innerHTML);
    
            // convert the html to markdown
            let pageContentMarkdown = turndownService.turndown(pageTitle + pageContent);
            console.log('Yes, this is the headline and content as markdown', pageContentMarkdown)
        }
    
        // all done, close the browser
        await browser.close();
    
        process.exit()
    })();
    

First, we need to install Turndown by running `npm install turndown` in our command line. After that, we require turndown at the top of our index.js, and define the service with `const turndownService = new TurndownService();`

Now, we only need to add `let pageContentMarkdown = turndownService.turndown(pageTitle + pageContent);` after the part where we defined our `pageTitle` and `pageContent` before and voilà, we have our HTML converted to Markdown.

Save markdown files
-------------------

To finish the plan, we now need to save the converted Markdown in files (one for each article).

    const puppeteer = require('puppeteer');
    const TurndownService = require('turndown');
    const fs = require('fs');
    
    const turndownService = new TurndownService();
    
    (async() => {
        // start the browser
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        // open a new page
        const page = await browser.newPage();
        const pageURL = 'https://justmarkup.com';
        try {
            // try to go to URL
            await page.goto(pageURL);
            console.log(`opened the page: ${pageURL}`);
        } catch (error) {
            console.log(`failed to open the page: ${pageURL} with the error: ${error}`);
        }
    
        // Find all links to articles
        const postsSelector = '.main .article h2 a';
        await page.waitForSelector(postsSelector, { timeout: 0 });
        const postUrls = await page.$$eval(postsSelector, postLinks => postLinks.map(link => link.href));
    
        // Visit each page one by one
        for (let postUrl of postUrls) {
    
            // open the page
            try {
                await page.goto(postUrl);
                console.log('opened the page: ', postUrl);
            } catch (error) {
                console.log(error);
                console.log('failed to open the page: ', postUrl);
            }
    
            // get the pathname
            let pagePathname = await page.evaluate(() => location.pathname);
            pagePathname = pagePathname.replace(/\//g, "-");
    
            // get the title of the post
            const titleSelector = '.article h1';
            await page.waitForSelector(titleSelector);
            const pageTitle = await page.$eval(titleSelector, titleSelector => titleSelector.outerHTML);
    
            // get the content of the page
            const contentSelector = '.article .entry-content';
            await page.waitForSelector(contentSelector, { timeout: 0 });
            const pageContent = await page.$eval(contentSelector, contentSelector => contentSelector.innerHTML);
    
            // convert the html to markdown
            let pageContentMarkdown = turndownService.turndown(pageTitle + pageContent);
            
    
             // Check if folder exists before writing files there
            const postsDirectory = '/posts/';
            if (!fs.existsSync(postsDirectory)) {
                fs.mkdirSync(postsDirectory);
            }
    
            // save the file as ${pathname}.md
            fs.writeFile(postsDirectory + pagePathname + '.md', pageContentMarkdown, (err) => {
                if (err) {
                    console.log(err);
                }
    
                // success case, the file was saved
                console.log('Page saved!');
            });
        }
    
        // all done, close the browser
        await browser.close();
    
        process.exit()
    })();
    

We are using the [File System API (fs) from Node.js](https://nodejs.org/api/fs.html) here, so as a first step we require it at the the top of our index.js. I wanted to save all posts in a folder called ‘posts’. So, we first check if the folder already exists, and if not we will create the folder using:

    // Check if folder exists before writing files there
    const postsDirectory = '/posts/';
    if (!fs.existsSync(postsDirectory)) {
        fs.mkdirSync(postsDirectory);
    }
    

Now on to the final part to save a Markdown file for each article.

    // save the file as ${pathname}.md
    fs.writeFile(postsDirectory + pagePathname + '.md', pageContentMarkdown, (err) => {
        if (err) {
            console.log(err);
        }
    
        // success case, the file was saved
        console.log('Page saved!');
    });
    

Here we use `fs.writeFile()`. We want to save our files in ‘/posts/’, using our `pagePathname` as the filename and use the file extension “.md” so we pass that as the first argument. As the second argument we will pass `pageContentMarkdown` which contains the converted Markdown as a `String`. If all goes well, the articles now get saved one after another as Markdown files. Yes, goal achieved!

I hope you learned something from this article and maybe your next plan also includes using Puppeteer to achieve something.

I also put the final code on [Github](https://github.com/justmarkup/html-posts-to-markdown/blob/master/index.js) if you are curious.