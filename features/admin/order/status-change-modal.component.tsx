import EOrderStatus from "@features/ui/order-status.enum";
import * as Dialog from "@radix-ui/react-dialog";

type ModalProps = {
  status: {
    label: string;
    variant: string;
  };
  HandleStatusChange: (status: EOrderStatus) => void;
};
export default function StatusChangeModal({
  HandleStatusChange,
  status,
}: ModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <label
          className={`text-${status.variant} hover:underline hover:cursor-pointer`}
        >
          {status.label}
        </label>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className="fixed inset-x-1/3 top-1/3 flex flex-col w-1/3 rounded-lg  bg-white border border-primary-600 p-4">
          <Dialog.Title className="font-bold text-lg">
            Changer l'état de la commande
          </Dialog.Title>
          <div className="flex flex-col w-full gap-4">
            <Dialog.Close
              asChild
              className="bg-info py-2 rounded-md hover:cursor-no-drop text-white"
            >
              Commandée
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                className="bg-warning py-2 rounded-md hover:cursor-pointer font-bold"
                onClick={() => HandleStatusChange(EOrderStatus.Validated)}
              >
                Validée
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                className="bg-warning py-2 rounded-md hover:cursor-pointer font-bold"
                onClick={() => HandleStatusChange(EOrderStatus.Delivering)}
              >
                En Cours de livraison
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                className="bg-primary-200 py-2 rounded-md hover:cursor-pointer font-bold"
                onClick={() => HandleStatusChange(EOrderStatus.Delivered)}
              >
                Livrée
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                className="bg-accent py-2 rounded-md hover:cursor-pointer text-white"
                onClick={() => HandleStatusChange(EOrderStatus.Cancelled)}
              >
                Annuler la commande
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
