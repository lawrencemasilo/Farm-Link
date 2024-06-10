import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
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
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

// Request permission to send notifications and get the token
export const getFcmToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      const currentToken = await getToken(messaging, { vapidKey: 'BAQ7l61hwNoO8Yhdi-B8GQxL2QeftR5P4pu5BrKV09jPV4-024c5zqqB09odlZWCp8qI7SVkBhC7yrijRQO5OSo' });
      if (currentToken) {
        console.log('FCM Token:', currentToken);
        return currentToken;
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    } else {
      console.log('Unable to get permission to notify.');
    }
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err);
  }
};

// Handle incoming messages
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // Customize notification here
});