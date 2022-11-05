const { credential } = require("firebase-admin");
const firebase = require("firebase-admin");
const serviceAccount = require("./introduction-to-backend-gdsc-firebase-adminsdk-8plr3-8586f95c19.json");

firebase.initializeApp({
  credential: credential.cert(serviceAccount),
});

const db = firebase.firestore();
const usersCollection = db.collection("users");

module.exports = usersCollection;
