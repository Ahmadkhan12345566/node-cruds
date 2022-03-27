// const firebase = require('firebase-admin');
// const config = require('config');
//
// const  db = firebase.initializeApp(config.firebaseConfig);
//
//
// module.exports = db;


var admin = require("firebase-admin");

var serviceAccount = require("./keys.json");

const  db = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
// admin.firestore();
module.exports = db;
