const CACHE_VERSION = 1;
const CACHE_FILES = [];

self.addEventListener('install', function(event) {        
    event.waitUntil(
        caches.open(CACHE_VERSION).then(function(cache) {
            console.log('Caching files: ' + JSON.stringify(CACHE_FILES));
            cache.addAll(CACHE_FILES);
        })
    );
    self.skipWaiting();
});

self.addEventListener("fetch", function(event) {            
    event.respondWith(
        caches.match(event.request).then(function(cached) {
            if (cached) {
                console.log('Loaded from cache: ' + event.request.url);
                return cached;
            } else {
                console.log('Loaded from network: ' + event.request.url);
                return fetch(event.request).then(function(response) {                                      
                    if(!response || response.status !== 200 || response.type !== 'basic' || event.request.method != 'GET') {
                        return response;
                    }
                    var responseToCache = response.clone();
                    caches.open(CACHE_VERSION).then(function(cache) {
                        console.log('Caching file: ' + event.request.url);
                        cache.put(event.request, responseToCache);
                    });
                    return response;
                });
            }
        }) 
    );
    return fetch(event.request);
});

self.addEventListener('activate', function(event) {    
    event.waitUntil(
        caches.keys().then(function(cacheVersions) {         
             cacheVersions.map(function(cacheVersion) {       
                if (cacheVersion == CACHE_VERSION) return;
                console.log('Cleaning ' + cacheVersion);
                return caches.delete(cacheVersion);
            })
        })
    );
   event.waitUntil(self.clients.claim());
});