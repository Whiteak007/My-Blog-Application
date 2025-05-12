import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getEvn } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAtEr9_aFdjpmU1YDUDDLBsj_4Ys84N1xU",
    authDomain: "coderak-developer.firebaseapp.com",
    projectId: "coderak-developer",
    storageBucket: "coderak-developer.firebasestorage.app",
    messagingSenderId: "948700220475",
    appId: "1:948700220475:web:e276b89b285ed5f930a01e"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }