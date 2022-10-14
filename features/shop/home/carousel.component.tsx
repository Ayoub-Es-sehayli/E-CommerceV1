import Link from "next/link";
import { useState } from "react";

function CarouselItem({ id, src }: { id: string; src: string }) {
  return (
    <Link href="">
      <a id={id} className="daisy-carousel-item w-full">
        <img src={src} className="w-full h-36 md:h-72 lg:h-96" />
      </a>
    </Link>
  );
}
export function Carousel() {
  const items: { id: string; src: string }[] = [
    { id: "slide1", src: "https://placeimg.com/390/234/nature" },
    { id: "slide2", src: "https://placeimg.com/390/234/arch" },
    { id: "slide3", src: "https://placeimg.com/390/234/animals" },
    { id: "slide4", src: "https://placeimg.com/390/234/people" },
    { id: "slide5", src: "https://placeimg.com/390/234/tech" },
  ];
  const [current, setCurrent] = useState<number>(0);
  return (
    <>
      <div className="daisy-carousel relative rounded-t-2xl w-full lg:hidden">
        {items.map((item) => (
          <CarouselItem {...item} />
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
