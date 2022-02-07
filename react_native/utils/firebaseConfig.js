var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

const firebaseConfig = {
    apiKey: "*",
    authDomain: "skinnefy-2b361.firebaseapp.com",
    databaseURL: "https://skinnefy-2b361.firebaseio.com",
    projectId: "*",
    storageBucket: "skinnefy-2b361.appspot.com",
    messagingSenderId: "*",
    appId: "*",
    measurementId: "*"
};

firebase.initializeApp(firebaseConfig);
export default firebase;