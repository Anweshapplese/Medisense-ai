import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfYvjSC2TGAhh2bZRpsIq_-zQM2VssGtw",
  authDomain: "medisense-9edc1.firebaseapp.com",
  projectId: "medisense-9edc1",
  storageBucket: "medisense-9edc1.firebasestorage.app",
  messagingSenderId: "518830518084",
  appId: "1:518830518084:web:fbc1d25af13d2eda4b7111"
};

const app = initializeApp(firebaseConfig);

// Export auth so you can use it in SignIn.jsx
export const auth = getAuth(app);