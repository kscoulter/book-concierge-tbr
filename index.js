import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";

firebase.initializeApp({
    apiKey: "",
    authDomain: "book-concierge-tbr.firebaseapp.com",
    projectId: "book-concierge-tbr",
    storageBucket: "book-concierge-tbr.appspot.com",
    messagingSenderId: "540759665824",
    appId: "1:540759665824:web:e10ed7bab9ae785284edc5",
    measurementId: "G-VNQPF6M7GS"
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();

if (window.location.hostname.includes("localhost")) {
  auth.useEmulator("http://localhost:9099");
  firestore.useEmulator("localhost", 8080);
  functions.useEmulator("localhost", 5001);
}

console.log("Connected!")