import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadString } from "firebase/storage";
import { useEffect, useMemo, useRef, useState } from "react";
import { firebaseDb, firebaseStorage } from "services/firebase-service";
import AnnoucementModel from "./annoucement.mode";

export default function useAnnoucements() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<AnnoucementModel[]>([]);
  const handleOnClick = (id?: string) => {
    if (fileRef.current) {
      fileRef.current.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files![0];

        if (!file) return;
        const result: Promise<string> = new Promise((resolve, reject) => {
          let reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        const draft = [...items];
        // Upload the image
        const productsRef = ref(firebaseStorage, "annoucements");
        let thumbnailId: string = `annoucement${items.length}`;
        if (id) {
          thumbnailId = id;
        }
        const annoucementRef = doc(firebaseDb, "annoucements", thumbnailId);
        const thumbnailRef = ref(
          productsRef,
          thumbnailId + "-" + new Date().toString()
        );
        const uploadResult = await uploadString(
          thumbnailRef,
          await result,
          "data_url"
        );
        if (!id) {
          const item = {
            id: thumbnailId,
            src: uploadResult.ref.name,
          };
          await setDoc(annoucementRef, {
            src: uploadResult.ref.name,
          });
          draft.push(item);
        } else {
          await updateDoc(annoucementRef, {
            src: uploadResult.ref.name,
          });
          setItems(
            draft.map((item) => {
              if (item.id === id) {
                item.src = uploadResult.ref.name;
              }
              return item;
            })
          );
        }
        alert("Annonce sauvegardée avec succès!");
      };
      fileRef.current.click();
    }
  };

  const annoucementCount = useMemo(() => {
    return items.length;
  }, [items]);

  useEffect(() => {
    const newAnnoucements: typeof items = [];
    getDocs(collection(firebaseDb, "annoucements")).then((result) => {
      result.forEach((annoucement) => {
        const data = annoucement.data();
        newAnnoucements.push({
          id: annoucement.id,
          src: data.src,
        });
      });
      setItems(newAnnoucements);
    });
  }, []);

  return { items, annoucementCount, fileRef, handleOnClick };
}
