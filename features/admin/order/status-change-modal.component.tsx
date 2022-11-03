import Modal from "@features/ui/modal.component";
import EOrderStatus from "@features/ui/order-status.enum";

type ModalProps = {
  HandleStatusChange: (status: EOrderStatus) => void;
};
export default function StatusChangeModal({ HandleStatusChange }: ModalProps) {
  return (
    <Modal
      modalName="status-modal"
      className="mt-36 place-self-start relative flex flex-col w-1/3 rounded-lg gap-4 bg-white border border-primary-600 p-4"
    >
      <h1 className="font-bold text-lg">Changer l'état de la commande</h1>
      <div className="flex flex-col gap-2 w-full text-center text-black">
        <label className="bg-info py-2 rounded-md hover:cursor-no-drop text-white">
          Commandée
        </label>
        <label
          className="bg-warning py-2 rounded-md hover:cursor-pointer font-bold"
          onClick={() => HandleStatusChange(EOrderStatus.Validated)}
        >
          Validée
        </label>
        <label
          className="bg-warning py-2 rounded-md hover:cursor-pointer font-bold"
          onClick={() => HandleStatusChange(EOrderStatus.Delivering)}
        >
          En Cours de livraison
        </label>
        <label
          className="bg-primary-200 py-2 rounded-md hover:cursor-pointer font-bold"
          onClick={() => HandleStatusChange(EOrderStatus.Delivered)}
        >
          Livrée
        </label>
        <label
          className="bg-accent py-2 rounded-md hover:cursor-pointer text-white"
          onClick={() => HandleStatusChange(EOrderStatus.Cancelled)}
        >
          Annuler la commande
        </label>
      </div>
    </Modal>
  );
}
