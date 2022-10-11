import { HTMLProps, PropsWithChildren } from "react";

type Props = PropsWithChildren &
  HTMLProps<HTMLLabelElement> & {
    modalName: string;
  };
export default function Modal({ children, modalName, className }: Props) {
  return (
    <>
      <input type="checkbox" id={modalName} className="daisy-modal-toggle" />
      <label className="daisy-modal" htmlFor={modalName}>
        <label className={`daisy-modal-box relative ${className}`}>
          {children}
        </label>
      </label>
    </>
  );
}
