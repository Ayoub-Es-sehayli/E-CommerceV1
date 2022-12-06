import useSession from "@features/session/useSession.hook";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { useFirebaseAuth, useFirebaseDb } from "services/firebase-service";
import UserConverter from "./user.converter";

export default function useAuth() {
  const firebaseAuth = useFirebaseAuth();
  const firebaseDb = useFirebaseDb();
  const { isLoggedIn } = useSession();
  const [unauthorized, setUnauthorized] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(firebaseAuth, googleProvider)
      .then((result) => {
        if (result) {
          const credentials = GoogleAuthProvider.credentialFromResult(result);
          if (credentials) {
            signInWithCredential(firebaseAuth, credentials)
              .then(async ({ user }) => {
                const userSnap = await getDoc(
                  doc(firebaseDb, "users", user.uid).withConverter(
                    UserConverter
                  )
                );
                if (userSnap.exists() && userSnap.data().admin) {
                  console.log("Authentication Sucessfull");
                  router.push("/admin/orders");
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
      })
      .catch((error) => {
        console.error("Failed to authenticate user");
      });
  };

  return { handleGoogleSignIn, unauthorized };
}
