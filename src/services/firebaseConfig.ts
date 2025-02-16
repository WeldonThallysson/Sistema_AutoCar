// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSQtaXackUQ0F-DydCw6q4qUdcXoTU_TA",
  authDomain: "webcarros-94d79.firebaseapp.com",
  projectId: "webcarros-94d79",
  storageBucket: "webcarros-94d79.appspot.com",
  messagingSenderId: "1000427950064",
  appId: "1:1000427950064:web:24e8b3afefd26745679735",
  measurementId: "G-HDJ2SKW8WH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)
const analytics = getAnalytics(app);

export {db,auth,storage,analytics}