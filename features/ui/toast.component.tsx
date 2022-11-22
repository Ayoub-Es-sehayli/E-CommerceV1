import * as ToastPrimitive from "@radix-ui/react-toast";
import { FC, PropsWithChildren } from "react";

const Toast: FC<
  ToastPrimitive.ToastProps &
    PropsWithChildren & {
      title: string;
      content: string;
    }
> = ({ title, content, children, ...props }) => {
  return (
    <ToastPrimitive.Root
      {...props}
      className="flex bg-white border-primary p-4 gap-8 rounded-lg border"
    >
      {title && (
        <ToastPrimitive.Title className="font-bold">
          {title}
        </ToastPrimitive.Title>
      )}
      <ToastPrimitive.Description>{content}</ToastPrimitive.Description>
      {children && (
        <ToastPrimitive.Action asChild altText="">
          {children}
        </ToastPrimitive.Action>
      )}
      <ToastPrimitive.Close aria-label="Close">
        <span aria-hidden className="bi-x text-lg"></span>
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
};

export default Toast;
