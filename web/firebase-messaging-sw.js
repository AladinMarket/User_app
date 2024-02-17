importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyCp2HwWHBxJQVAEbPncXiVIa0e_nWQsqIc",
           authDomain: "oasis-347316.firebaseapp.com",
           projectId: "oasis-347316",
           storageBucket: "oasis-347316.appspot.com",
           messagingSenderId: "423688034256",
           appId: "1:423688034256:web:6964c3d20c14de0f174bd5",
           measurementId: "G-PN2VFY4DBV"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});