import { getDownloadURL, ref } from "firebase/storage";
import { useCallback } from "react";
import { useFirebaseStorage } from "services/firebase-service";

export default function useThumbnail(folder?: string) {
  const firebaseStorage = useFirebaseStorage();
  const getThumbnail = useCallback((thumbnail: string) => {
    let result = Promise.resolve(thumbnail as string);
    try {
      // TODO: Combine the first two conditions
      if (!thumbnail || thumbnail.length === 0) {
        // Invalid thumbnail
      } else if (thumbnail.includes("data:image")) {
        result = Promise.resolve(thumbnail as string);
      } else {
        result = getDownloadURL(
          ref(firebaseStorage, `/${folder ? folder : "products"}/${thumbnail}`)
        );
      }
    } catch (error) {
    } finally {
      return result;
    }
  }, []);

  return getThumbnail;
}
