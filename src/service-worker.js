(function () {
  const CACHE_NAME = "portfolio-app-cache-v1";
  const CACHE_URLS = [
    "/",
    "/index.html",
    "/src/assets/images/*.*",
    "/*.js",
    "/*.css",
  ];

  const onInitCache = async () => {
    try {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(CACHE_URLS);
    } catch (error) {
      console.error("Service Worker: Cache initialization failed:", error);
    }
  };

  const onActivateCache = async () => {
    try {
      const cacheNames = await caches.keys();

      await Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Service Worker: Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    } catch (error) {
      console.error("Service Worker: Activation failed:", error);
    }
  };

  const onCheckNetwork = (request, timeout) => {
    return new Promise((resolve, reject) => {
      const timerId = setTimeout(reject, timeout);
      fetch(request)
        .then((response) => {
          clearTimeout(timerId);
          const clonedResponse = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clonedResponse);
          });
          resolve(response);
        })
        .catch((err) => {
          clearTimeout(timerId);
          reject(err);
        });
    });
  };

  const getCachedData = async (request) => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);

    return cachedResponse || Promise.reject("no-match-in-cache");
  };

  self.addEventListener("install", (event) => {
    event.waitUntil(onInitCache());
  });

  self.addEventListener("activate", (event) => {
    event.waitUntil(onActivateCache());
  });

  self.addEventListener("fetch", (event) => {
    event.respondWith(
      onCheckNetwork(event.request, 400).catch(() =>
        getCachedData(event.request)
      )
    );
  });
})();
