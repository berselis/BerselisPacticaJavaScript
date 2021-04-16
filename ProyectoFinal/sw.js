const CACHE_NAME = 'ToDoListApp001';
let UrlsToCache = [
    'css/style.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css',
    'img/bjmm.ico',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js',
    'js/function.js',
    '404.html',
    'index.html'
];

self.addEventListener('install', (event) => {
    console.log('Service Worker: Proceso de installación...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(UrlsToCache);
            }).then(() => {
                console.log('Proceso de instalacion completado');
            })
    )
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }

                let fetchRequest = event.request.clone();
                return fetch(fetchRequest).then((response)=>{
                    if(!response || response.status !== 200 || response.type !== 'basic'){
                        return response;
                    }

                    let responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                    .then((cache)=>{
                        cache.put(event.request, responseToCache);
                    });
                    return response;
                });
            }
        )
    );
});
