const firebase = require('firebase');
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "rhododendron-club.firebaseapp.com",
    databaseURL: "https://rhododendron-club.firebaseio.com",
    projectId: "rhododendron-club",
    storageBucket: "rhododendron-club.appspot.com",
    messagingSenderId: "846020634194",
    appId: "1:846020634194:web:47747ce18cd55b78dba18b",
    measurementId: "G-4GZ370GHHY"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
const storage = firebase.storage();
const database = firebase.database();
const functions = firebase.functions();

module.exports = {
    firebase, provider, auth, storage, database, functions
}