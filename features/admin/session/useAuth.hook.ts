import useSession from "@features/session/useSession.hook";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import {
  firebaseAuth,
  firebaseDb,
  googleProvider,
} from "services/firebase-service";
import UserConverter from "./user.converter";

export default function useAuth() {
  const { isLoggedIn } = useSession();
  const [unauthorized, setUnauthorized] = useState(false);
  const handleGoogleSignIn = async () => {
    await signInWithPopup(firebaseAuth, googleProvider).then((result) => {
      if (result) {
        const credentials = GoogleAuthProvider.credentialFromResult(result);
        if (credentials) {
          signInWithCredential(firebaseAuth, credentials)
            .then(async ({ user }) => {
              const userSnap = await getDoc(
                doc(firebaseDb, "users", user.uid).withConverter(UserConverter)
              );
              if (userSnap.exists() && userSnap.data().admin) {
                console.log("Authentication Sucessfull");
              } else {
                signOut(firebaseAuth);
                setUnauthorized(true);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.error("Failed to authenticate user");
        }
      }
    });
  };

  return { handleGoogleSignIn, unauthorized };
}
