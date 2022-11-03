import { PropsWithChildren } from "react";

type CardProps = PropsWithChildren & { title: string };

export default function Card({ children, title }: CardProps) {
  return (
    <section className="bg-light-200 rounded-lg py-4 px-2 ">
      <h3 className="font-serif text-lg px-2">{title}</h3>
      {children}
    </section>
  );
}
