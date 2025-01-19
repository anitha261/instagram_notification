importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC4rFw_o84J0YxgbA3FwLMzxyTzy3B7qm0",
    authDomain: "instagram-2ad86.firebaseapp.com",
    projectId: "instagram-2ad86",
    storageBucket: "instagram-2ad86.firebasestorage.app",
    messagingSenderId: "126779412383",
    appId: "1:126779412383:web:66729c1b8131a9d18c77aa",
    measurementId: "G-GT267FDNH0"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message:', payload);

    const notificationTitle = payload.notification?.title || 'Background Notification';
    const notificationBody = payload.notification?.body || 'Background Body';

    // Display the notification
    self.registration.showNotification(notificationTitle, {
        body: notificationBody,
        icon: payload.notification?.icon || '/default-icon.png',
    });

    // Send notification data to backend for MySQL storage
    fetch('http://localhost:5000/store-notification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: notificationTitle,
            body: notificationBody,
            type: 'background', // Indicate background notification
            source: 'Instagram', // Example source
        }),
    })
        .then((response) => response.json())
        .then((data) => console.log('Notification stored in MySQL:', data))
        .catch((error) => console.error('Error storing notification in MySQL:', error));
});
 