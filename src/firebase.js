import { initializeApp } from "firebase/app";
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCBYOdcfsl_RPfXBg60859xOUnyUIWT8uY",
    authDomain: "news-app-bd242.firebaseapp.com",
    projectId: "news-app-bd242",
    storageBucket: "news-app-bd242.appspot.com",
    messagingSenderId: "284389411091",
    appId: "1:284389411091:web:67d7334f501726bcfdb2e6"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
