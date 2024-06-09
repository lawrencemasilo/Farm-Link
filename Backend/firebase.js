// Initialise the Firebase Admin SDK
const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging();

module.exports = messaging;