// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
import { environment } from './environments/environment'
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js');
// Initialize the Firebase app in the service worker by passing in the
firebase.initializeApp({
    'messagingSenderId': environment.firebase.messagingSenderId,
    'projectId': environment.firebase.projectId,
    'apiKey': environment.firebase.apiKey,
    'authDomain': environment.firebase.authDomain,
    'databaseURL': environment.firebase.databaseURL,
    'storageBucket': environment.firebase.storageBucket,
    'appId': environment.firebase.appId,
    'measurementId': environment.firebase.measurementId
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
