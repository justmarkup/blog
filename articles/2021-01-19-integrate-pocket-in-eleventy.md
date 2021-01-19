---
title: Integrate Pocket in Eleventy
description: Learn how to get your data from Pocket and show them on your Eleventy site.
ogImage: https://justmarkup.com/img/icons/icon-512x512.png
ogImageAlt: justmarkup
date: 2021-01-19T14:04:10+00:00
tags:
    - article
layout: layouts/post.njk
---

I have been using [Pocket](https://app.getpocket.com/) since many years to organize my bookmarks and reading list and thought it would be great to show them on my blog where I use [Eleventy](https://www.11ty.dev/). In this article you will learn how to get your data from Pocket and show them on your Eleventy site.

## Get a consumer key from Pocket

We assume that you already have a Pocket account, if not you should register an account [there](https://getpocket.com/) first.

First, we need a consumer key, which we get on their [Developer site](https://getpocket.com/developer/apps/) - use "Create an Application" there. Give it a name and description of your choice, set permissions to Retrieve, and Platforms to Web. After the application got created you will be directed to a site where you can see your consumer key which you should save somewhere now as we need it later.

## Obtain the access token

To be able to use the Pocket API, we also need the access token of our account. To get this you can use [pocket-auth-cli](https://github.com/mheap/pocket-auth-cli)

Open your terminal and install the package globally:

```bash
npm install -g pocket-auth-cli
```

After the installation is finished run the following command (replace <consumer_key> with the key you saved above):

```bash
pocket-auth <consumer_key>
```

If everything worked, you will see your access_token in your terminal. Copy and save that as we also need this one later as well.

You can test if all worked by opening the URL [https://getpocket.com/v3/get?consumerkey=<consumer_key>&access_token=<access_token>](https://getpocket.com/v3/get?consumerkey=<consumer_key>&access_token=<access_token>) in your browser (replace ```<consumer_key>``` and ```<access_token>``` with your data)

## Fetch data from Pocket

Now, let's switch to your Eleventy project.

To start, create a file called pocket.js and save it in the ```_data``` folder (if you don't have the ```_data``` folder already create it now)

Now, switch back to the terminal and navigate to the root of your Eleventy project. To be able to fetch data, we need to install node-fetch and to be able to read our environment variables (more on this later) we need the dotenv package

```bash
npm install node-fetch dotenv --save-dev
```

After this has been installed, we need to define the environment variables. To do this in your local project, create a file called .env (if there is none) and safe it in the root of the project.

**Note**: Never add your environment variables and files (in our case ```.env```) to your Git repository. To avoid ever having them there you can use a ```.gitignore``` file in the root of your project and add ```.env``` there.

Next, we define our variables there:

```bash
POCKET_CONSUMER_KEY=CONSUMER_KEY
POCKET_ACCESS_TOKEN=ACCESS_TOKEN
POCKET_TAG=TAG
```

Replace CONSUMERKEY and ACCESSTOKEN with your values you saved above. For TAG, you can either use the value *all* to get all, or use one of your tags to be able to define what you want to show in public. I use a tag called public for example.

Now, let's move back to our code editor and open the ```pocket.js``` file we created before and insert the following code.

```javascript
const fetch = require("node-fetch");
require('dotenv').config()

const CONSUMER_KEY = process.env.POCKET_CONSUMER_KEY;
const ACCESS_TOKEN = process.env.POCKET_ACCESS_TOKEN;
const TAG = process.env.POCKET_TAG;
const POCKET_URI = `https://getpocket.com/v3/get?consumer_key=${CONSUMER_KEY}&access_token=${ACCESS_TOKEN}&tag=${TAG}`

module.exports = async function() {
    return fetch(POCKET_URI)
        .then(res => res.json())
        .then(json => {
            return Object.values(json.list);
        });
};
```

Let's go through this. In the first two lines we import the packages we installed before. Next we define some variables we extract from the ```.env``` file. The interesting part happens in ```module.exports```.

There we have a function, which uses fetch to, well fetch the data from the pocket API, transform this to json and return an Object with our list of items we saved in Pocket.

## Integrate in your template

Now, that we have the data fetch in place, let's integrate the data in our template. We are using [Nunjucks](https://mozilla.github.io/nunjucks/) as our template engine as the example here, but you can also use any other template language supported by Eleventy.

{% raw %}
```html
{% if pocket.length %}
  <ul>
  {%- for entry in pocket | reverse %}
    <li>
      <h2><a href="{{ entry.given_url }}">{{ entry.resolved_title }}</a></h2>
      <p>{{ entry.excerpt }}</p>
    </li>
  {%- endfor %}
  </ul>
{%- endif %}
```
{% endraw %}

Let's have a look there. First we check if there are any items available at all, and if yes, output an ```<ul>```.

Now we use a for loop to go through every item and output some of the values we got from Pocket. On the [Pocket Developer site](https://getpocket.com/developer/docs/v3/retrieve) you find a list of all values available.

With this in place, we can go back to the terminal and run the Eleventy serve command:

```bash
npx eleventy --serve
```

If you now open the template where you integrated Pocket you should see a list of all your items (or if you used a specific tag, all your items tagged with the specific tag).

You can now deploy your site and show your Pocket list on your site. 

## Extra (automatic deploys, caching)

You most probably want to have the data up-to-date and have automatic deploys. Here is a tutorial how you can do that on [Netlify](https://www.11ty.dev/docs/quicktips/netlify-ifttt/), but this is also possible with many other hosts. In my case it is a bit more complicated, so will share my setup to do automatic deploys on a traditional hoster in a future article.

Be aware that there is a rate limit, but it is very generous with [320 calls per hour](https://getpocket.com/developer/docs/rate-limits). You probably will never reach that, but you may still want to cache data requests. I won't cover this here as well, if you want to integrate caching I can recommend this [tutorial](https://www.11ty.dev/docs/quicktips/cache-api-requests/).

## My Bookmarks

If you are curious what I have saved at Pocket have a look at my [bookmark section](https://justmarkup.com/bookmarks/)
