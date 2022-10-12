import { FirebaseOptions, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  ActionCodeSettings,
  getAuth,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};
const firebaseApp = initializeApp(firebaseConfig);

const firebaseDb = getFirestore(firebaseApp);

const firebaseAuth = getAuth(firebaseApp);
firebaseAuth.languageCode = "fr";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({});
export async function googleSignIn() {
  signInWithRedirect(firebaseAuth, googleProvider);
}

export async function sendEmailLink(email: string) {
  const emailLinkConfig: ActionCodeSettings = {
    url: "http://localhost:3001/session/login",
    handleCodeInApp: true,
  };
  await sendSignInLinkToEmail(firebaseAuth, email, emailLinkConfig);
}
export async function emailLinkSignIn(email: string, link: string) {
  await signInWithEmailLink(firebaseAuth, email, link);
}
export async function firebaseLogout() {
  signOut(firebaseAuth);
}

const firebaseStorage = getStorage(firebaseApp);

export { firebaseAuth, firebaseDb, firebaseStorage };
