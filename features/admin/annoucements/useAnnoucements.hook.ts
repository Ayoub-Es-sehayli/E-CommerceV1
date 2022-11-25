import useThumbnail from "@features/ui/useThumbnail.hook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadString } from "firebase/storage";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { firebaseDb, firebaseStorage } from "services/firebase-service";
import AnnoucementModel from "./annoucement.mode";

export default function useAnnoucements() {
  const qs = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const getThumbnail = useThumbnail("annoucements");
  const [toastMessage, setToastMessage] = useState("");
  const [id, setId] = useState<string>();
  const [toastOpen, setToastOpen] = useState(false);
  const { data } = useQuery(
    ["annoucements"],
    () => {
      return getDocs(collection(firebaseDb, "annoucements")).then((result) =>
        result.docs.map((a) => {
          return {
            id: a.id,
            src: a.data().src,
          } as AnnoucementModel;
        })
      );
    },
    {
      initialData: [],
    }
  );
  const { data: items } = useQuery(
    ["annoucement-thumbnails"],
    () =>
      Promise.all(
        data.map(async (item) => {
          const src = await getThumbnail(item.src);
          return {
            id: item.id,
            src: src,
          } as typeof item;
        })
      ),
    {
      initialData: [],
      enabled: data.length > 0,
    }
  );
  const mutation = useMutation({
    mutationFn: async (result: string) => {
      // Upload the image
      const productsRef = ref(firebaseStorage, "annoucements");
      let thumbnailId: string = `annoucement-${items.length}`;
      if (id) {
        thumbnailId = id;
      }
      const docRef = doc(firebaseDb, "annoucements", thumbnailId);
      const storageRef = ref(productsRef, thumbnailId);
      const uploadResult = await uploadString(storageRef, result, "data_url");
      if (!id) {
        await setDoc(docRef, {
          src: uploadResult.ref.name,
        });
      } else {
        await updateDoc(docRef, {
          src: uploadResult.ref.name,
        });
      }
    },
    onSuccess: () => {
      qs.refetchQueries(["annoucements"]);
      setToastMessage("Annonce téléchargée vers le serveur avec succès");
      setToastOpen(true);
    },
    onError: () => {
      setToastMessage("Un erreur est survenue");
      setToastOpen(true);
    },
  });
  const handleFileOnChange = useCallback(
    async (e: ChangeEvent) => {
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
      mutation.mutate(await result);
    },
    [id]
  );
  const annoucementCount = useMemo(() => {
    return items.length;
  }, [items]);
  const handleOnClick = useCallback(
    (id?: string) => {
      setId(id);
      fileRef.current?.click();
    },
    [items]
  );

  return {
    items,
    annoucementCount,
    fileRef,
    handleOnClick,
    handleFileOnChange,
    toastMessage,
    toastOpen,
    setToastOpen,
  };
}
