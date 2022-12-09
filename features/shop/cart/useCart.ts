import useSession from "@features/session/useSession.hook";
import EOrderStatus from "@features/ui/order-status.enum";
import { clearCartItems } from "@store/cart.slice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useFirebaseDb } from "services/firebase-service";
import CheckoutFormModel from "./checkout.schema";

export default function useCart() {
  const firebaseDb = useFirebaseDb();
  const { isLoggedIn } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { items } = useAppSelector((state) => state.CartSlice);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialValues: CheckoutFormModel = {
    items: items.map<{ id: string; quantity: number }>((item) => {
      return { id: item.id, quantity: item.quantity };
    }),
    shipping: {
      address: "",
      city: "",
    },
    recipient: {
      firstName: "",
      lastName: "",
      tel: "",
    },
    clientId: undefined,
  };
  const handleSubmit = async (
    values: CheckoutFormModel,
    { setSubmitting, resetForm }: FormikHelpers<CheckoutFormModel>
  ) => {
    setSubmitting(true);
    try {
      if (!isLoggedIn) {
        localStorage.setItem("checkoutForm", JSON.stringify(values));
        localStorage.setItem("redirectUrl", "/shop/cart");
        router.push("/session/login");
      } else {
        // Push to firebase
        localStorage.removeItem("checkoutForm");
        values.clientId = localStorage.getItem("userId")!;
        values.status = {
          type: EOrderStatus.Ordered,
          date: Timestamp.fromDate(new Date()),
        };
        await addDoc(collection(firebaseDb, "orders"), {
          ...values,
          total,
          history: [values.status],
        });
        resetForm({
          values: { ...initialValues, items: [] },
        });
        dispatch(clearCartItems());
        alert("Votre commande a été passée avec succès!");
        router.push("/shop");
      }
    } catch (error) {
      console.error(error);
    }
    setSubmitting(false);
  };
  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      if (item.salePercentage) {
        return sum + item.salePrice! * item.quantity;
      }
      if (item.price) {
        return sum + item.price * item.quantity;
      }
      return 0;
    }, 0);
  }, [items]);

  return { items, isLoading, initialValues, handleSubmit, total };
}
