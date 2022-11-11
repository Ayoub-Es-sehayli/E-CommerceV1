import Spinner from "@features/ui/spinner.component";
import useThumbnail from "@features/ui/useThumbnail.hook";
import { useEffect, useState } from "react";
import AnnoucementModel from "./annoucement.mode";

type ItemProps = AnnoucementModel & {
  handleOnClick: (id: string) => void;
};
function useAnnoucement(src: string) {
  const [image, setImage] = useState<string>(src);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getThumbnail = useThumbnail("annoucements");
  useEffect(() => {
    setIsLoading(true);

    getThumbnail(src).then((thumbnail) => {
      setImage(thumbnail);
    });

    setIsLoading(false);
  }, [src]);

  return { image, isLoading };
}
export default function AnnoucementItem({ id, src, handleOnClick }: ItemProps) {
  const { image, isLoading } = useAnnoucement(src);
  return (
    <article className="relative group">
      <img src={image} alt="Annonce" className={isLoading ? "hidden" : ""} />
      <Spinner isLoading={isLoading} />
      <span className="hidden absolute group-hover:flex inset-0 items-center justify-center  bg-grey-200 backdrop-blur-sm">
        <button
          onClick={() => handleOnClick(id)}
          className="flex gap-1 items-center bi bi-upload bg-tranparent border-2 border-white text-white  hover:text-black hover:bg-white rounded-lg p-2"
        >
          <span>Changer</span>
        </button>
      </span>
    </article>
  );
}
