// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDskx6-x4KrO9qIDvYQnVsOUM7rI1mxCYo",
  authDomain: "enterprise-computing-aac9c.firebaseapp.com",
  projectId: "enterprise-computing-aac9c",
  storageBucket: "enterprise-computing-aac9c.appspot.com",
  messagingSenderId: "275216002684",
  appId: "1:275216002684:web:77ade3b68b34d8ece163f9",
  measurementId: "G-0FD61DQV74"
};

// // Initialize Firebase
// const analytics = getAnalytics(app);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };