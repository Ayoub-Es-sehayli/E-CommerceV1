import Link from "next/link";
import { useState } from "react";

type ItemProps = {
  id: string;
  src: string;
};
function CarouselItem({ id, src }: ItemProps) {
  return (
    <Link href="">
      <a id={id} className="daisy-carousel-item w-full">
        <img src={src} className="w-full h-36 md:h-72 lg:h-96" />
      </a>
    </Link>
  );
}
type CarouselProps = {
  annoucements: ItemProps[];
};
export function Carousel({ annoucements: items }: CarouselProps) {
  const [current, setCurrent] = useState<number>(0);
  return (
    <>
      <div className="daisy-carousel relative rounded-t-2xl w-full lg:hidden">
        {items.map((item) => (
          <CarouselItem key={item.id} {...item} />
        ))}
      </div>
      <div className="hidden lg:flex relative rounded-t-2xl w-full ">
        <CarouselItem {...items[current]} />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <button
            className="hidden lg:daisy-btn daisy-btn-circle bi bi-chevron-left"
            disabled={current === 0}
            onClick={() => setCurrent(current - 1)}
          ></button>
          <button
            className="hidden lg:daisy-btn daisy-btn-circle bi bi-chevron-right"
            disabled={current + 1 === items.length}
            onClick={() => setCurrent(current + 1)}
          ></button>
        </div>
      </div>
    </>
  );
}
