importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyCzgPeUiVag2w6oa0nf_pTCh63ydau3rM4",
  authDomain: "farm-link-73545.firebaseapp.com",
  projectId: "farm-link-73545",
  storageBucket: "farm-link-73545.appspot.com",
  messagingSenderId: "303641118278",
  appId: "1:303641118278:web:056c04e2f49ad7ea80ec47",
  measurementId: "G-K86WCXJEHC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});