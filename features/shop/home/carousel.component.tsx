import Link from "next/link";

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
  return (
    <div className="daisy-carousel relative rounded-t-2xl w-full overflow-scroll lg:overflow-hidden">
      <CarouselItem id="slide1" src="https://placeimg.com/390/234/nature" />
      <CarouselItem id="slide2" src="https://placeimg.com/390/234/nature" />

      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a
          href="#slide1"
          className="hidden lg:btn btn-circle bi bi-chevron-left"
        ></a>
        <a
          href="#slide2"
          className="hidden lg:btn btn-circle bi bi-chevron-right"
        ></a>
      </div>
    </div>
  );
}
