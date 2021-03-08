import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBfYSwIwSR1ZLH4EYkd7sdyWS9yQ02vtTA",
    authDomain: "bookstore-dc5e8.firebaseapp.com",
    projectId: "bookstore-dc5e8",
    databaseURL: 'https://bookstore-dc5e8-default-rtdb.firebaseio.com/',
    storageBucket: "bookstore-dc5e8.appspot.com",
    messagingSenderId: "995194890992",
    appId: "1:995194890992:web:3ada6b07a425e8e192b035",
    measurementId: "G-DPTBZEE72C"
};


firebase.initializeApp(firebaseConfig);
const database = firebase.database();
// const db = firebaseApp.database().ref();
// const db = firebaseApp.firestore();

const auth = firebase.auth();

export {  auth, database };
export default firebase;