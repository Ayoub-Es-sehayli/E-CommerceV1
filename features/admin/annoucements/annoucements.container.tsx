import Toast from "@features/ui/toast.component";
import { ToastProvider, ToastViewport } from "@radix-ui/react-toast";
import Head from "next/head";
import AnnoucementItem from "./annoucement-item.component";
import useAnnoucements from "./useAnnoucements.hook";

export default function AnnoucementsContainer() {
  const {
    items,
    fileRef,
    handleOnClick,
    handleFileOnChange,
    annoucementCount,
    setToastOpen,
    toastMessage,
    toastOpen,
  } = useAnnoucements();
  return (
    <>
      <Head>
        <title>Gestion des Annonces</title>
      </Head>
      <div className="flex flex-col gap-1">
        <header className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <h1 className="text-primary-400 font-bold text-xl font-serif">
              Annonces [992 x 348]
            </h1>
            <button
              onClick={() => handleOnClick()}
              className={`text-white bg-primary-400 ${
                annoucementCount < 5 ? "" : "hidden"
              } p-2 rounded-lg hover:opacity-80`}
            >
              Ajouter
            </button>
          </div>
        </header>
        <section className="flex flex-col gap-2 items-center">
          {items.map((item) => (
            <AnnoucementItem
              key={item.id}
              {...item}
              handleOnClick={handleOnClick}
            />
          ))}
        </section>
      </div>
      <input
        type="file"
        ref={fileRef}
        onChange={handleFileOnChange}
        className="hidden"
        accept="image/*"
      />
      <ToastProvider>
        <Toast
          content=""
          title={toastMessage}
          open={toastOpen}
          onOpenChange={setToastOpen}
        />
        <ToastViewport className="fixed bottom-0 right-0 flex flex-col gap-3 outline-none p-6" />
      </ToastProvider>
    </>
  );
}
