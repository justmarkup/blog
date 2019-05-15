"use strict";

const version = '1.0.0::';

const offlineResources = [
    '',
    '/offline/',
    'js/main.js'
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches
        .open(version + 'resources')
        .then(function(cache) {
            return cache.addAll(offlineResources);
        })
    );
});

self.addEventListener("fetch", function(event) {
    if (event.request.method !== 'GET') {
        return;
    }
    if (event.request.headers.get('Accept').includes('text/html')) {
        event.respondWith(
            caches
            .match(event.request)
            .then(function(cached) {
                const networked = fetch(event.request)
                    .then(fetchedFromNetwork, unableToResolve)
                    .catch(unableToResolve);

                return cached || networked;

                function fetchedFromNetwork(response) {
                    const cacheCopy = response.clone();

                    caches
                        .open(version + 'pages')
                        .then(function add(cache) {
                            cache.put(event.request, cacheCopy);
                        })
                    return response;
                }

                function unableToResolve() {
                    return caches.match(request)
                        .then(responseFromCache => {
                            return responseFromCache || caches.match('/offline');
                        });
                }
            })
        );
        return;
    }

    event.respondWith(
        caches.match(event.request)
        .then(responseFromCache => {

            return responseFromCache || fetch(event.request)
                .then(responseFromFetch => {

                    if (event.request.url.match(/\.(jpe?g|png|gif|svg)/) && !event.request.url.match(/buysellads/)) {
                        let copy = responseFromFetch.clone();
                        try {
                            event.waitUntil(
                                caches.open(version + 'images')
                                .then(imagesCache => {
                                    imagesCache.put(event.request, copy);
                                })
                            );
                        } catch (error) {
                            console.error(error);
                        }
                    }
                    return responseFromFetch;
                })
                .catch(fetchError => {
                    console.error(fetchError);
                    return new Response('<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>', { headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'no-store' } });
                });
        })
    );
});

self.addEventListener("activate", function(event) {

    event.waitUntil(
        caches
        .keys()
        .then(function(keys) {
            return Promise.all(
                keys
                .filter(function(key) {
                    return !key.startsWith(version);
                })
                .map(function(key) {
                    return caches.delete(key);
                })
            );
        })
    );
});