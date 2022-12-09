import Spinner from "@features/ui/spinner.component";
import { Field, Form, Formik } from "formik";
import Head from "next/head";
import useAuth from "./useAuth.hook";

export default function SignInContainer() {
  const {
    isLoading,
    emailSent,
    initialValues,
    handleEmailSignIn,
    handleGoogleSignIn,
  } = useAuth();
  return (
    <>
      <Head>
        <title>Parafait - Connectez-vous</title>
      </Head>
      <div className="flex flex-col md:mx-auto md:w-1/2 bg-primary-400 p-4 gap-2 text-white rounded-lg">
        <h3 className="font-bold text-xl">Connectez-vous</h3>
        {isLoading ? (
          <Spinner isLoading />
        ) : (
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
        )}
      </div>
    </>
  );
}
