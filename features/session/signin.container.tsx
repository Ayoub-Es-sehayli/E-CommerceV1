import { Field, Form, Formik, FormikHelpers } from "formik";
import useAuth from "./useAuth.hook";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
interface Credentials {
  email: string;
}
export default function SignInContainer() {
  const { isLoggedIn } = useAuth();
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) router.push("/shop");
  }, [isLoggedIn]);
  const handleGoogleSignIn = async () => {
  };
  const initialValues: Credentials = {
    email: "",
  };
  const handleEmailSignIn = async (
    { email }: Credentials,
    { setSubmitting }: FormikHelpers<Credentials>
  ) => {
    setSubmitting(true);
    localStorage.setItem("emailForSignIn", email);
    // console.log(email);
    setEmailSent(true);
    setSubmitting(false);
  };
  return (
    <div className="flex flex-col md:mx-auto md:w-1/2 bg-primary-400 p-4 gap-2 text-white rounded-lg">
      <h3 className="font-bold text-xl">Connectez-vous</h3>
      <Formik initialValues={initialValues} onSubmit={handleEmailSignIn}>
        {({ isSubmitting }) => {
          return (
            <>
              <button
                type="button"
                className="flex justify-center gap-4 p-2 bg-white text-black rounded-lg"
                onClick={handleGoogleSignIn}
              >
                <i className="bi bi-google"></i>
                <span>Google</span>
              </button>
              <span className="daisy-divider font-bold">Ou</span>
              <div className="flex flex-col items-center gap-4 p-2 bg-white text-black rounded-lg">
                <span className="flex gap-4">
                  <i className="bi bi-envelope-fill"></i>
                  <span>Lien Email</span>
                </span>
                <Form className="flex flex-col justify-between gap-2">
                  <Field
                    type="email"
                    name="email"
                    placeholder="votre.email@domaine.com"
                    className="p-2 text-lg rounded-lg outline-none bg-light-200 focus:bg-white border border-primary-400"
                  />
                  <button
                    disabled={emailSent}
                    type="submit"
                    className={`bg-primary-400 p-2 rounded-lg text-white ${
                      isSubmitting ? "daisy-loading" : ""
                    }`}
                  >
                    {emailSent
                      ? "Consulter votre boîte mail"
                      : "Envoyer le lien"}
                  </button>
                </Form>
              </div>
            </>
          );
        }}
      </Formik>
    </div>
  );
}
