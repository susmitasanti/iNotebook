/* eslint-disable no-restricted-globals */
var staticCacheName = "pwa";

self.addEventListener("install", function (event) {
  event.waitUntil(preLoad());
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    checkResponse(event.request).catch(function () {
      console.log("Fetch from cache successful!");
      return returnFromCache(event.request);
    })
  );
  console.log("Fetch successful!");
  event.waitUntil(addToCache(event.request));
});

self.addEventListener("sync", (event) => {
  if (event.tag === "syncMessage") {
    console.log("Sync successful!");
  }
});

self.addEventListener("push", function (event) {
  if (event && event.data) {
    var data = event.data.json();
    if (data.method == "pushMessage") {
      console.log("Push notification requested");

      if (Notification.permission === "granted") {
        event.waitUntil(
          self.registration
            .showNotification("To Do List", {
              body: data.message,
            })
            .catch(function (error) {
              console.error("Error showing notification:", error);
            })
        );
      } else if (Notification.permission === "denied") {
        console.error("Notification permission denied.");
        // Handle the case where notification permission is denied, such as showing a message to the user.
      } else {
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            console.log(
              "Notification permission granted, showing notification"
            );
            self.registration.showNotification("To Do List", {
              body: data.message,
            });
          } else {
            console.error("Notification permission denied.");
            // Handle the case where notification permission is denied after requesting.
          }
        });
      }
    }
  }
});

var filesToCache = ["/index.html"];

var preLoad = function () {
  return caches.open("index").then(function (cache) {
    return cache.addAll(filesToCache);
  });
};

var checkResponse = function (request) {
  return new Promise(function (fulfill, reject) {
    fetch(request)
      .then(function (response) {
        if (response.status !== 404) {
          fulfill(response);
        } else {
          reject();
        }
      })
      .catch(reject);
  });
};

var addToCache = function (request) {
  return caches.open("index").then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
};

var returnFromCache = function (request) {
  return caches.open("index").then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status == 404) {
        return cache.match("index.html");
      } else {
        return matching;
      }
    });
  });
};

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            return name !== staticCacheName;
          })
          .map((name) => {
            return caches.delete(name);
          })
      );
    })
  );
});
