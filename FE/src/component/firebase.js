import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCHX4NJMZddlsP86RGL74fp3nH4m4tPMLI",
    authDomain: "neural-arcade-300912.firebaseapp.com",
    projectId: "neural-arcade-300912",
    storageBucket: "neural-arcade-300912.appspot.com",
    messagingSenderId: "654403317150",
    appId: "1:654403317150:web:8cc955b29c7b2339103a8f",
    measurementId: "G-EE3CNVXSWM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);