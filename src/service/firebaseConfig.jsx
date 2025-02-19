// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCESgPCsmGLWW737kqD178cRD-1SOy_JNk",
    authDomain: "js-portfolio-666f9.firebaseapp.com",
    projectId: "js-portfolio-666f9",
    storageBucket: "js-portfolio-666f9.firebasestorage.app",
    messagingSenderId: "393780211348",
    appId: "1:393780211348:web:7b0caebd9ba76670b5ce81",
    measurementId: "G-S1KLQ6VGHX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);