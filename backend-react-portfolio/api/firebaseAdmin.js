const admin = require("firebase-admin");
const serviceAccount = require("../config/portfolio-mern-279ca-firebase-adminsdk-o7szu-11682fbe71.json"); // Update path as needed

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
