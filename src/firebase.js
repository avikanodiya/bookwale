import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: "AIzaSyBfYSwIwSR1ZLH4EYkd7sdyWS9yQ02vtTA",
    authDomain: "bookstore-dc5e8.firebaseapp.com",
    projectId: "bookstore-dc5e8",
    storageBucket: "bookstore-dc5e8.appspot.com",
    messagingSenderId: "995194890992",
    appId: "1:995194890992:web:3ada6b07a425e8e192b035",
    measurementId: "G-DPTBZEE72C"
};


const firebaseApp =firebase.initializeApp(config);


const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth};
export default firebase;