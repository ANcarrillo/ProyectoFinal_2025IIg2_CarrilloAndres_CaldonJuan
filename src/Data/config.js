// Config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBE5WbhqAIaG6ebOabAD5PWViAe38hEFAc",
  authDomain: "noticiasuniia.firebaseapp.com",
  projectId: "noticiasuniia",
  storageBucket: "noticiasuniia.appspot.com", // ← CORREGIDO
  messagingSenderId: "956709782191",
  appId: "1:956709782191:web:a4e6f4e39260bf84e40a5a",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
