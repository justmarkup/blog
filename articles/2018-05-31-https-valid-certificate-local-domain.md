---
title: Setting up https with a valid certificate for a local domain – and use it with Node.js
description: 
date: 2018-05-31T06:36:19+00:00
oldUrl: https://justmarkup.com/log/2018/05/https-valid-certificate-local-domain/
tags:
    - article
layout: layouts/post.njk
---

Many new web platform features require a connection via https nowadays. So if you want to use and test Service Worker, you need a domain which runs on https and has a valid SSL certificate. If you have a public domain (like .com or .party), your hosting company most likely offers SSL certificates (often free now thanks to [Let’s Encrypt](https://letsencrypt.org/)), which are also easy to install in most cases. But, if you develop, you don’t use a public domain. You can either use http://localhost or you can use a local domain (e.g. justmarkup.localhost). If you use localhost you can still test Service Worker, as browsers have whitelisted this, but if you use http://justmarkup.localhost it won’t work.

You should use .localhost, .test, .example or .invalid for your local domain as they are save to use. Others like .dev used to work fine until some [time ago](https://medium.engineering/use-a-dev-domain-not-anymore-95219778e6fd) and this may happen to others too, so you should stick to the [Reserved Top Level DNS Names](https://tools.ietf.org/html/rfc2606).

Often localhost is fine for developing, but if you need a subdomain or if your CMS requires you to use a top-level domain‚ you need to set up a valid SSL certificate for this domain. In this article, I will explain how to set up a local domain, how to set up Node.js and a https server, how to configure an OpenSSL certificate and how to ensure browsers consider it as a valid cerfificate.

![Screenshot showing justmarkup.localhost running on https with the green secure mark](https://justmarkup.com/log/wp-content/uploads/2018/05/https.png)

Setting up the domain
---------------------

If you already know how to do this, jump straight to [Setting up a certificate](#setupcertificate). If not, you first have to edit your hosts file. On MacOS and Linux you can find this file at /etc/hosts and on Windows it can be found at \[SystemRoot\]\\system32\\drivers\\etc\\hosts (if you are using the Linux subsystem it is here: /mnt/c/Windows/System32/drivers/etc/hosts). Open the hosts file and add the following at the end.

``` bash
127.0.0.1 justmarkup.localhost
```

Replace justmarkup.localhost with your domain of choice.

With this in place we can move on and get our SSL certificate.

Setting up and installing a certificate
---------------------------------------

First create a new folder called cert in your project folder. This is where we will save our certificates and keys. If you plan to use git for the project, I recommend adding the cert folder to your [.gitignore](https://git-scm.com/docs/gitignore) file.

### Create the root.cnf

Okay, so first create the file root.cnf with the following content and save it in the cert folder.

``` bash
# OpenSSL configuration for Root CA

[ req ]

prompt             = no
string_mask        = default

# The size of the keys in bits:
default_bits       = 2048
distinguished_name = req_distinguished_name
x509_extensions    = x509_ext

[ req_distinguished_name ]

# Note that the following are in 'reverse order' to what you'd expect to see.

countryName = gb
organizationName = Test
commonName = Test Root CA

[ x509_ext ]

basicConstraints=critical,CA:true,pathlen:0
keyUsage=critical,keyCertSign,cRLSign
```

You should replace organizationName and commonName with something related to your project and something you will remember lately.

Next switch to the command line and go into your cert folder you created before and run:

``` bash
openssl req -x509 -new -keyout root.key -out root.cer -config root.cnf
```

The script will ask for a PEM pass phrase – enter something – it should be secure and you should remember it.

### Create the server.cnf

Next, create a file called server.cnf with the following content in the certs folder:

``` bash
# OpenSSL configuration for end-entity cert

[ req ]

prompt             = no
string_mask        = default

# The size of the keys in bits:
default_bits       = 2048
distinguished_name = req_distinguished_name

x509_extensions    = x509_ext

[ req_distinguished_name ]

# Note that the following are in 'reverse order' to what you'd expect to see.

countryName = gb
organizationName = Test
commonName = localhost

[ x509_ext ]

keyUsage=critical,digitalSignature,keyAgreement

subjectAltName = @alt_names

# Multiple Alternate Names are possible
[alt_names]
DNS.1 = justmarkup.localhost
DNS.2 = justmarkup.test
```

You have to change the following things here. First, change organizationName to the same name you have set in your root.cnf. Next, change DNS.1 to your local domain name. You can also use multiple here by using DNS.2, DNS.3 and so on.

After saving the file, open your command line again and run the following:

``` bash
openssl req -nodes -new -keyout server.key -out server.csr -config server.cnf
```

### Generate the certificate

Stay in the command line and run the following next:

``` bash
openssl x509 -days 3650 -req -in server.csr -CA root.cer -CAkey root.key -set_serial 123 -out server.cer -extfile server.cnf -extensions x509_ext
```

Here you are required to enter the pass phrase you entered before, I hope you still remember it. Otherwise, you sadly have to start again.

Great, we now have an SSL certificate valid for ten years.

Setting up Node.js and a HTTPS server
-------------------------------------

If you haven’t installed npm and node yet, you should do now to follow along. Here are instructions for [MacOS](https://nodesource.com/blog/installing-nodejs-tutorial-mac-os-x/), [Linux](https://www.ostechnix.com/install-node-js-linux/), [Windows](http://blog.teamtreehouse.com/install-node-js-npm-windows) and [Linux subystem on Windows](https://daverupert.com/2018/04/developing-on-windows-with-wsl-and-visual-studio-code/#installing-node).

So, now we have npm and node installed we first have to init the project. Open your command line and move to your projects folder and init npm with:

``` bash
npm init
```

This will create a package.json file. Next, we need to install express.

``` bash
npm i express -g --save
```

This will add express as a dependency to our project. Now open your index.js (The entry point you selected before when using npm init – it is index.js by default if you didn’t select another one before) and add the following:

``` js
const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');

const sslOptions = {
    key: fs.readFileSync("./cert/server.key"),
    cert: fs.readFileSync("./cert/server.cer")
};

https.createServer(sslOptions, app).listen(3001);

app.get('/', (req, res) => res.send('Hello SSL!'))
```

Now go back to your command line and run:

``` bash
node index.js
```

If you now open https://justmarkup.localhost:3001 (replace justmarkup.localhost with the name of your local domain) in your browser you should see “Hello SSL!”. There is still one problem, while we can serve the local domain now via https it is still considered invalid by browsers, so let’s change this.

Install the Certificate Authority
---------------------------------

On every OS there are different ways, how to install the Certificate Authority. Please see this [post](https://www.dionysopoulos.me/255-forge-your-own-ssl-certificates-for-local-development.html#Install_the_Certificate_Authority_529) to find out how to install it on your OS. Note that for Firefox you need an additional installation as they use their own certificate authority store.

In all cases you need to install the root.cer and not the server.cer – took me some time to figure this out.

After installing it and restarting the browser, the ceritificate is now valid and you can test everything related to https on your local machine. 🎉

![Screenshot showing justmarkup.localhost running on https with the green secure mark](https://justmarkup.com/log/wp-content/uploads/2018/05/https.png)

Note: I got most of the information from [this post on stackexchange](https://unix.stackexchange.com/questions/382786/the-correct-way-of-implementing-ssl-on-localhost/382811#382811) and this [post](https://www.dionysopoulos.me/255-forge-your-own-ssl-certificates-for-local-development.html#Install_the_Certificate_Authority_529
). Thanks a lot for providing the information and giving me the starting point for this article.

Update 07.02.2018: Updated the example and included the -days option as mentioned by [Josh Walcher](https://twitter.com/josh_walcher). Using this with a value of 3650 means you don’t have to renew the certificate every month as it will be valid for 10 years.