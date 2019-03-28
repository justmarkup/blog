---
title: Implementing push notifications on the front-end and back-end
description: 
date: 2017-02-07T17:43:07+00:00
tags:
    - article
layout: layouts/post.njk
---

As promised in my [article](https://justmarkup.com/log/2017/02/introducing-iss-observer-com/) introducing iss-observer.com here are the technical details about implementing push notifications. Originally, I wanted to focus on the specific issues I encountered on [iss-observer.com](https://iss-observer.com) but thought it may be more useful to show a minimal version and mention some issues as a side note. It should also be noted that some parts of the front-end are based on this [tutorial](https://developers.google.com/web/fundamentals/getting-started/codelabs/push-notifications/?hl=en)

Info: If studying actual code is more your thing, you can find the code on [Github](https://github.com/justmarkup/demos/tree/gh-pages/push-notifications) and there is also a working [demo](https://push-notifications-vwursywdxa.now.sh) showing the code in action.

![Screenshot of the notification from iss-observer.com](https://justmarkup.com/log/wp-content/uploads/2017/02/notification-chrome-mobile.png)

Front-end
---------

Let’s start with the front-end part. First we add a feature test to check if the browser supports push notifications, and if it does load our JavaScript.

``` js
if ('serviceWorker' in navigator && 'PushManager' in window) {
  var s = document.createElement('script');
  s.src = '/script/push.js';
  s.async = true;
  document.head.appendChild(s);
}
```

Before starting with coding we need some prerequisites. We will need Application Server Keys (VAPID Key). You can get them either via this [site](https://web-push-codelab.appspot.com/) or by installing the web-push library (which we will need later on the back-end) with `npm install -g web-push` and executing `web-push generate-vapid-keys` on the terminal. In both cases you will get a public key and a private key, which you should save at safe place.

### Note on GCM

Before the application server key / VAPID spec has been defined the first browser (Chrome, Opera) adding support for push notifications used GCM (Google Cloud Messaging) for handling notifications. All latest browser versions except for [Samsung Internet](https://github.com/web-push-libs/web-push#browser-support) now support VAPID. In this article, we won’t cover GCM, if you want to add support for current Samsung Internet (Version 5) and older versions of Chrome or Opera you can learn about more about it [here](https://web-push-book.gauntface.com/chapter-06/01-non-standards-browsers/).

With that in place, have a look at the JavaScript file “push.js” where we will handle the Service Worker Registration and the subscription of notifications:

``` js
'use strict';

const appServerKey = 'BHLCrsFGJQIVgg-XNp8F59C8UFF49GAVxvYMvyCURim3nMYI5TMdsOcrh-yJM7KbtZ3psi5FhfvaJbU_11jwtPY';

const pushWrapper = document.querySelector('.push-wrapper');
const pushButton = document.querySelector('.push-button');

let hasSubscription = false;
let serviceWorkerRegistration = null;
let subscriptionData = false;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function updatePushButton() {
  pushWrapper.classList.remove('hidden');
  
  if (hasSubscription) {
    pushButton.textContent = `Disable Push Notifications`;
  } else {
    pushButton.textContent = `Enable Push Notifications`;
  }
}

function subscribeUser() {
  serviceWorkerRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(appServerKey)
  })
  .then(function(subscription) {

    fetch('/push/subscribe',{
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscription)
    })
    .then(function(response) {
      return response;
    })
    .then(function(text) {
      console.log('User is subscribed.');
      hasSubscription = true;

      updatePushButton();
    })
    .catch(function(error) {
      hasSubscription = false;
      console.error('error fetching subscribe', error);
    });
    
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
  });
}

function unsubscribeUser() {
  serviceWorkerRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      subscriptionData = {
        endpoint: subscription.endpoint
      };
      
      fetch('/push/unsubscribe',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscriptionData)
      })
      .then(function(response) {
        return response;
      })
      .then(function(text) {
        hasSubscription = false;

        updatePushButton();
      })
      .catch(function(error) {
        hasSubscription = true;
        console.error('error fetching subscribe', error);
      });

      hasSubscription = false;

      updatePushButton();
      return subscription.unsubscribe();
    }
  });
}

function initPush() {

  pushButton.addEventListener('click', function() {
    if (hasSubscription) {
      unsubscribeUser();
    } else {
      subscribeUser();
    }
  });

  // Set the initial subscription value
  serviceWorkerRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    hasSubscription = !(subscription === null);

    updatePushButton();
  });
}

navigator.serviceWorker.register('sw.js')
.then(function(sw) {
  serviceWorkerRegistration = sw;
  initPush();
})
.catch(function(error) {
  console.error('Service Worker Error', error);
});
```

First, we define the `appServerKey` (the public VAPID Key mentioned above) and some elements and variables. Next, we add a function called "urlB64ToUint8Array" we will later use to convert the public key, which is base 64 URL safe encoded, to a UInt8Array.

After that, we define a function called "updatePushButton" - we will call this every time the status of the notifications changes and update our UI according to it.

Next, we have the function "subscribeUser" to subscribe users. You may notice that we already defined serviceWorkerRegistration at the beginning of the file. If you go to the end of the file you will see that we override this when registering the service worker so it contains the [service worker registration](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration).

``` js
serviceWorkerRegistration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: urlB64ToUint8Array(appServerKey)
})
```

The subscribe() method of the PushManager returns a Promise and needs two configuration parameters:  
userVisibleOnly: A Boolean indicating that the returned push subscription will only be used for messages whose effect is made visible to the user. It is required to set this to true.  
applicationServerKey: The public key (we generated above) your push server will use to send messages to client apps via a push server. This needs to be a UInt8Array so we use our function mentioned before to convert our key.

``` js
.then(function(subscription) {
  fetch('/push/subscribe',{
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(subscription)
  })
```

Next, we send the push subscription details to the server. We can safely use the Fetch API here as every browser who supports push notifications also supports fetch. After we got back the response, we update the UI to show that the subscription was successfull or not. This is also the best place to send additional info to the user. For example, on iss-observer a user can decide if they want to receive notifications for sightings and the morning or/and evening and I also send the information about the country, region and city they want to get notifications to the server where I save the information and use them when deciding if a notification should be send.

After that, we define the unsubscribe function called "unsubscribeUser". Here, we are using the getSubscription() method of the PushManager to get the current subscription details and send it to the server via the fetch API to remove the subscription from the database.

Next, we define our init function "initPush". Here, we have an `EventListener` for our push button, which will either call the subscribe or unsubscribe function depending on if we already have a subscription or not. There we also set the initial subscription value.

You can find the full code used used here on [Github](https://github.com/justmarkup/demos/blob/gh-pages/push-notifications/public/script/push.js).

Last in our file we register the service worker.

The Service Worker
------------------

Here we will focus on the two events, "push" and "nofificationclick" we will need to handle notifications.

``` js
self.addEventListener('push', function(event) {

  let notificationData = {};

  try {
    notificationData = event.data.json();
  } catch (e) {
    notificationData = {
      title: 'Default title',
      body: 'Default message',
      icon: '/default-icon.png'
    };
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title, {
      body: notificationData.body,
      icon: notificationData.icon
    })
  );

});
```

First we have a look at the "push" event in our service worker. There we check if we get a payload (title, body, icon..) from the server and if not fall back to a default message. After that, we use the showNotification() method to show the notification to the user.

Note: In addition to title, body and icon the payload can also have other [options](https://web-push-book.gauntface.com/chapter-05/02-display-a-notification/#visual-options) like badge, tag or vibrate. At the time of writing this (February 2017) many of these are only available in some browsers. Therefore we will concentrate on title, body and icon which are supported in all browsers supporting push notifications.

``` js
self.addEventListener('notificationclick', function(event) {

  // close the notification
  event.notification.close();

  // see if the current is open and if it is focus it
  // otherwise open new tab
  event.waitUntil(

    self.clients.matchAll().then(function(clientList) {
  
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
  
      return self.clients.openWindow('/');
    })
  );
});
```

The notificationclick event will be triggered once the user clicks on the notification. We first close the notification. Next we check if the user has already a page open and focus it or otherwise open a new window with our site.

Back-end
--------

Moving on to the back-end where I used the [Web Push library](https://github.com/web-push-libs/web-push). We will use the Node.js version, but there are also libraries for PHP, Java and C# [available](https://github.com/web-push-libs) if you prefer any of these languages.

Note: I assume you have basic knowledge of Node.js and have used Express before. If this is new to you, I recommend reading about it first.

Okay, first of all we install the Web Push library with `npm install web-push --save` and require it in our app with `const webPush = require('web-push');`.

``` js
webPush.setVapidDetails(
  'mailto:hallo@justmarkup.com',
  "YOUR_PUBLIC_VAPID_KEY", // process.env.VAPID_PUBLIC_KEY,
  "YOUR_PRIVATE_VAPID_KEY", // process.env.VAPID_PRIVATE_KEY
);
```

Next, we define the VAPID Details, these are the keys we generated at the beginning. In addition to this, we need to either set an email adress with the prefix mailto: or the URL of our site - this is in case a push service has to contact you for whatever reason. As you can see in the comments in the code I prefer to save these values as an environment variable `process.env.VAPID_PUBLIC_KEY` - you may use other methods to save and get these values but the private key should always be saved safely and should never be exposed to the public; There is a reason it is called private key.

Next, have a look at our subscribe function:

``` js
app.post('/push/subscribe', function (req, res) {

  const subscription = {
    endpoint: req.body.endpoint,
    keys: {
      p256dh: req.body.keys.p256dh,
      auth: req.body.keys.auth
    }
  };
  
  const payload = JSON.stringify({
    title: 'Welcome',
    body: 'Thank you for enabling push notifications',
    icon: '/android-chrome-192x192.png'
  });

  const options = {
    TTL: 3600 // 1sec * 60 * 60 = 1h
  };

  webPush.sendNotification(
    subscription, 
    payload,
    options
    ).then(function() {
      console.log("Send welcome push notification");
      res.status(200).send('subscribe');
      return;
    }).catch(err => {
      console.error("Unable to send welcome push notification", err );
      res.status(500).send('subscription not possible');
      return;
  });

})
```

By sending the subscription details to the sever we will get the endpoint and the p256dh and auth keys. To keep this example short I will not show how to save the data in a database. For example, in my demo I used [Mongo DB](https://github.com/justmarkup/demos/blob/gh-pages/push-notifications/controllers/push.js#L19) to save the subscriptions.

Here we will return a first notification welcoming the user once they subscribed. sendNotification() accepts three arguments: the subscription details we got from the browser, payload (title, body, icon...) and options. You can read more about the possible options [here](https://github.com/web-push-libs/web-push#sendnotificationpushsubscription-payload-options).

Info: The default TTL (Time To Live) defined by the web push library is four weeks. This means if you send a notification and the user is offline for two weeks and goes online again they will still get the notification. It is probably a good idea to change this to a shorter period as getting weeks old push notifications (which should always be important and time relevant) is probably not what you want.

``` js
app.post('/push/unsubscribe', function (req, res) {

  // remove from database
  Push.findOneAndRemove({endpoint: endpoint}, function (err,data){
    if(err) { 
      console.error('error with unsubscribe', error);
      res.status(500).send('unsubscription not possible'); 
    }
    console.log('unsubscribed');
    res.status(200).send('unsubscribe');
  });

})
```

When a user unsubscribes we remove the saved entry from our database so we know we don't need to try sending notifications to them again.

More information
----------------

You will probably have different use cases and you can't and shouldn't copy paste this, but I hope this tutorial showed you how to implement push notifications on the front-end and back-end.

Here is the live [demo](https://push-notifications-vwursywdxa.now.sh) used in this article and I also published the code on [Github](https://github.com/justmarkup/demos/blob/gh-pages/push-notifications/).

If you want to learn more about Web Push I highly recommend this free [book](https://web-push-book.gauntface.com/) or have a look at the examples on [servicewore.rs](https://serviceworke.rs/).

If you have any issues implementing push notifications feel free to contact me on [twitter](https://twitter.com/justmarkup) or via [Email](mailto:hallo@justmarkup.com).