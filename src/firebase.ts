import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyCf5gXW8l6NDCXp4UK2iHUh9PaD7ndKwLI",
  authDomain: "auth-pixematv.firebaseapp.com",
  projectId: "auth-pixematv",
  storageBucket: "auth-pixematv.appspot.com",
  messagingSenderId: "412616509795",
  appId: "1:412616509795:web:b21a3bf2b993dc9bd2ab56"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

