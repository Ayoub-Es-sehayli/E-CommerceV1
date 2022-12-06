import { useAppDispatch, useAppSelector } from "@store/hooks";
import { login, logout } from "@store/session.slice";
import {
  ActionCodeSettings,
  GoogleAuthProvider,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithCredential,
  signInWithEmailLink,
  signInWithPopup,
} from "firebase/auth";
import { FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useFirebaseAuth } from "services/firebase-service";
import useSession from "./useSession.hook";
interface Credentials {
  email: string;
}
export default function useAuth() {
  const firebaseAuth = useFirebaseAuth();
  const { isLoggedIn } = useSession();
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // Confirm Email Sign In
  useEffect(() => {
    if (isSignInWithEmailLink(firebaseAuth, location.href)) {
      setIsLoading(true);
      let email = localStorage.getItem("emailForSignIn");
      while (!email) {
        email = prompt("Donner votre email pour confirmation");
      }
      signInWithEmailLink(firebaseAuth, email, location.href).then(() => {
        setIsLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) router.push("/shop");
  }, [isLoggedIn]);
  const handleGoogleSignIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(firebaseAuth, googleProvider)
      .then((result) => {
        if (result) {
          const credentials = GoogleAuthProvider.credentialFromResult(result);
          if (credentials) {
            alert(`Is Google Auth ${result.user.uid}`);
            // signInWithCredential(firebaseAuth, credentials).catch((error) => {
            //   console.log(error);
            // });
          } else {
            console.error("Failed to authenticate user");
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const initialValues: Credentials = {
    email: "",
  };
  const handleEmailSignIn = async (
    { email }: Credentials,
    { setSubmitting }: FormikHelpers<Credentials>
  ) => {
    setSubmitting(true);
    const emailLinkConfig: ActionCodeSettings = {
      url: "http://localhost:3001/session/login?method=email",
      handleCodeInApp: true,
    };
    await sendSignInLinkToEmail(firebaseAuth, email, emailLinkConfig);
    localStorage.setItem("emailForSignIn", email);
    setEmailSent(true);
    setSubmitting(false);
  };

  return {
    isLoading,
    emailSent,
    initialValues,
    handleEmailSignIn,
    handleGoogleSignIn,
  };
}
