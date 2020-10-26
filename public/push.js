var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BOG-Wc0VsQelgD5fZ0tDVomnpylaF5P_4NUdeSYOP9UPgcdWDXjWbAqhcskalHsEfa27SA-Nr4J6HsSsVBc5ug0",
    "privateKey": "zS37rhhxAMjagd3KvfNVgV4yEUWQJWTOf1y9s81WG2U"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fKLdi8oHM0c:APA91bEtt6pA3lEncs0_7OsuQuVtkxsKKd6jmf70SqwJ2VftHazb2_8_5CUC1nLip657uLIcmJU_Ep74WzZxpepOA7r5Wq8rAnj7-TCMD_eTvzHSO8bO6E7IB8IR2BXziPTG78poubP8",
    "keys": {
        "p256dh": "BIgNbbxnXTFSJMGGMdVjCMVT3EeiePM0bEy//I8HKcwVaPm8AwxK5Ss4OYhUcwUNfjyDiIqVebim80WV967nhHE=",
        "auth": "Hn1iWk/fA0OR30i0K7nexw=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '751924251925',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);