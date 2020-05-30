let webPush = require("web-push");
const vapidKeys = {
  publicKey:
    "BGW0gvRXIvMsHgZrvSnDc0D3A1T6-zkg5g8YlWzaQykzKjcajzu81pPiJGwUy0N97_wjBrdXt_JjfGFqpGxBY_o",
  privateKey: "JJAveUd_2HQHjJmgKIGQaLjVZJjpnPSYfLANS997B5U",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
let pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/fhSh6ahtut0:APA91bFXRbkm1Lm3-a1-yhpCowmHlgYSrbv1H3NpO_KThFc2gaVEDun9SGjnPf2OTa1DwAvpcKyVmQwbYTMiydLysnKq_fQ0XS7Vi0M_gEWHEd6NCJ1UAL31-8WjjKKcOLoX_DhJ73Oy",
  keys: {
    p256dh:
      "BMzjmtJXbqavsxk9g1N9I+LS+AM3LbycQgXgeXW9t7mGWsP9nCOYGWf17JOKcBg1mBhN4uE6jPL30ItXAWluAOA=",
    auth: "aaoOuIzBu8Cn+MEMTvXJag==",
  },
};
let payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";
let options = {
  gcmAPIKey: "1060509168221",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
