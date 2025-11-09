import { auth } from "./config.js";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

export const LoginUserEmailPassword = (email, password) => {
  if (!email || !password) return;
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user)
    .catch((error) => Promise.reject({
      errorCode: error.code,
      errorMessage: error.message,
    }));
};

export const LoginUserGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => result.user)
    .catch((error) => Promise.reject({
      errorCode: error.code,
      errorMessage: error.message,
    }));
};

export const LogoutUser = () => {
  return signOut(auth)
    .then(() => {
      console.log("Sesión cerrada correctamente ✅");
    })
    .catch((error) =>
      Promise.reject({
        errorCode: error.code,
        errorMessage: error.message,
      })
    );
  };