import Head from "next/head";
import AnnoucementItem from "./annoucement-item.component";
import useAnnoucements from "./useAnnoucements.hook";

export default function AnnoucementsContainer() {
  const { items, fileRef, handleOnClick, annoucementCount } = useAnnoucements();
  return (
    <>
      <Head>
        <title>Gestion des Annonces</title>
      </Head>
      <div className="flex flex-col gap-0">
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
      <input type="file" ref={fileRef} className="hidden" accept="image/*" />
    </>
  );
}
