import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const useFirebaseConfig = () => {
  const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };
  return firebaseConfig;
};
const useFirebaseApp = () => {
  const firebaseConfig = useFirebaseConfig();
  const firebaseApp = initializeApp(firebaseConfig);
  return firebaseApp;
};

export const useFirebaseDb = () => {
  const firebaseApp = useFirebaseApp();
  const firebaseDb = getFirestore(firebaseApp);
  return firebaseDb;
};
export const useFirebaseAuth = () => {
  const firebaseApp = useFirebaseApp();
  const firebaseAuth = getAuth(firebaseApp);
  firebaseAuth.languageCode = "fr";
  return firebaseAuth;
};

export const useFirebaseStorage = () => {
  const firebaseApp = useFirebaseApp();
  const firebaseStorage = getStorage(firebaseApp);
  return firebaseStorage;
};
