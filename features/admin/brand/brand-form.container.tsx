import CustomField from "@features/ui/custom-field.component";
import Spinner from "@features/ui/spinner.component";
import Toast from "@features/ui/toast.component";
import { ToastProvider, ToastViewport } from "@radix-ui/react-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { Field, Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useFirebaseDb } from "services/firebase-service";
import * as yup from "yup";
const useBrandForm = () => {
  const firebaseDb = useFirebaseDb();
  const [toastMessage, setToastMessage] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const router = useRouter();

  const validationSchema = yup.object({
    id: yup.string(),
    name: yup.string().required("Merci de donner le nom de la marque"),
  });
  const initialValues: yup.InferType<typeof validationSchema> = {
    id: router.query.id as string,
    name: router.query.name as string,
  };
  const qs = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (model: typeof initialValues) => {
      if (!initialValues.id && !initialValues.name) {
        // Add new brand
        setToastMessage(`La marque est ajouté avec succès!`);
        const brandRef = await addDoc(collection(firebaseDb, "brands"), {
          name: model.name,
        });
        return;
      }
      // Edit existing brand
      await updateDoc(doc(firebaseDb, "brands", model.id!), {
        name: model.name,
      });
      setToastMessage(`La marque est modifiée avec succès!`);
    },
    onSuccess: () => {
      qs.invalidateQueries(["brands"]);
      setToastOpen(true);
      router.push("/admin/brands");
    },
  });
  const onSubmit = (values: typeof initialValues) => {
    mutation.mutate(values);
  };
  return {
    initialValues,
    onSubmit,
    validationSchema,
    toastOpen,
    toastMessage,
    setToastOpen,
  };
};

export default function BrandFormContainer() {
  const { toastOpen, toastMessage, setToastOpen, ...formProps } =
    useBrandForm();
  return (
    <>
      <Head>
        <title>Administration Parafait - Formulaire des Marques</title>
      </Head>
      <section>
        <ToastProvider>
          <Formik {...formProps}>
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-2 mx-auto w-1/2">
                <h1 className="text-lg font-bold">Marque</h1>
                <Field type="hidden" name="id" />
                <CustomField
                  name="name"
                  className="rounded-lg border p-2 focus:outline-2 focus:outline-primary-600 text-lg text-black"
                />
                <button
                  type="submit"
                  className="flex justify-center text-lg bg-primary-400 text-white p-2 rounded-lg"
                >
                  {isSubmitting ? <Spinner isLoading /> : "Sauvegarder"}
                </button>
              </Form>
            )}
          </Formik>
          <Toast
            title={toastMessage}
            content=""
            duration={3000}
            onOpenChange={setToastOpen}
            open={toastOpen}
          ></Toast>
          <ToastViewport className="fixed bottom-0 right-0 flex flex-col gap-3 outline-none p-6" />
        </ToastProvider>
      </section>
    </>
  );
}
