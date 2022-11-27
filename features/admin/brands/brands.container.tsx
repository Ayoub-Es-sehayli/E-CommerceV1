import CustomField from "@features/ui/custom-field.component";
import Toast from "@features/ui/toast.component";
import * as Dialog from "@radix-ui/react-dialog";
import { ToastProvider, ToastViewport } from "@radix-ui/react-toast";
import { useAppSelector } from "@store/hooks";
import { useMutation } from "@tanstack/react-query";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Field, Form, Formik, FormikHelpers } from "formik";
import Head from "next/head";
import { FormEvent, useCallback, useMemo, useState } from "react";

const BrandForm = ({
  value,
  handleChange: changeAction,
  handleSubmit: submitAction,
}: {
  value: string;
  handleChange: (value: string) => void;
  handleSubmit: () => void;
}) => {
  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const v = (event.target as HTMLInputElement).value;
    changeAction(v);
  };
  return (
    <Dialog.Portal>
      <Dialog.Overlay />
      <Dialog.Content className="fixed inset-x-1/3 top-1/3 flex flex-col gap-1 w-1/3 rounded-lg  bg-white border border-primary-600 p-4">
        <Dialog.Title className="text-lg font-bold">Marque</Dialog.Title>
        <form className="flex flex-col gap-2">
          <input
            name="name"
            value={value}
            onChange={handleChange}
            className="rounded-lg border p-2 focus:outline-2 focus:outline-primary-600 text-lg text-black"
          />
          <Dialog.Close>
            <button
              onClick={submitAction}
              type="button"
              className="text-lg bg-primary-400 text-white p-2 rounded-lg"
            >
              Sauvegarder
            </button>
          </Dialog.Close>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
const ConfirmDialog = ({
  value,
  action,
}: {
  value: string;
  action: () => void;
}) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay />
      <Dialog.Content className="fixed inset-x-1/3 top-1/3 flex flex-col gap-3 w-1/3 rounded-lg  bg-white border border-primary-600 p-4">
        <Dialog.Title className="text-lg font-bold">
          Voulez vous vraiment supprimer la marque "{value}"?
        </Dialog.Title>
        <Dialog.Close>
          <button className="text-lg bg-accent text-white p-2 rounded-lg">
            Annuler
          </button>
        </Dialog.Close>
        <Dialog.Close>
          <button
            onClick={action}
            className="text-lg bg-primary-600 text-white p-2 rounded-lg"
          >
            Ok
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
const useBrands = () => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const brands = useAppSelector((state) => state.UISlice.brands);
  const columnHelper = createColumnHelper<typeof brands[number]>();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const addBrand = useCallback(() => {
    setToastMessage(`adding ${name}`);
    setToastOpen(true);
  }, [name]);
  const editBrand = useCallback(() => {
    setToastMessage(`editing ${id} ${name}`);
    setToastOpen(true);
  }, [id, name]);
  const deleteBrand = useCallback(
    (brandId: string) => {
      setToastMessage(`deleting ${brandId}`);
      setToastOpen(true);
    },
    [id]
  );
  const columns: ColumnDef<typeof brands[number], any>[] = [
    columnHelper.accessor("id", {
      header: "Code",
    }),
    columnHelper.accessor("name", {
      header: "Marque",
    }),
    {
      id: "actions",
      header: () => (
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              onClick={() => {
                setId("");
                setName("");
              }}
              className=" bg-primary-200 bi bi-plus px-5 py-0.5 rounded-md hover:bg-primary-400 hover:text-white"
            ></button>
          </Dialog.Trigger>
          <BrandForm
            value={""}
            handleChange={setName}
            handleSubmit={addBrand}
          />
        </Dialog.Root>
      ),
      cell: ({ row: { getValue } }) => (
        <span className="flex gap-2">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button
                onClick={() => {
                  setId(getValue("id"));
                  setName(getValue("name"));
                }}
                className="bi bi-pencil bg-primary-400 text-white py-0.5 px-1 rounded-md hover:bg-primary-200 hover:text-black"
              />
            </Dialog.Trigger>
            <BrandForm
              value={name}
              handleChange={setName}
              handleSubmit={editBrand}
            />
          </Dialog.Root>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="bi bi-eraser bg-accent text-white py-0.5 px-1 rounded-md hover:bg-accent-200 hover:text-black"></button>
            </Dialog.Trigger>
            <ConfirmDialog
              value={name}
              action={() => deleteBrand(getValue("id"))}
            />
          </Dialog.Root>
        </span>
      ),
    },
  ];
  const data = useMemo(() => brands, [brands]);
  const table = useReactTable({
    columns: columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
  });
  // const mutation = useMutation({
  //   mutationFn: () => {
  //     return new Promise((resolve, reject) => {})
  //   }
  // })
  return { table, toastOpen, toastMessage, setToastOpen };
};
export default function BrandsContainer() {
  const { table, toastOpen, toastMessage, setToastOpen } = useBrands();
  return (
    <>
      <Head>
        <title>Gestion des Marques</title>
      </Head>
      <ToastProvider>
        <table className="w-full text-left m-4">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-1">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Toast
          title={toastMessage}
          content=""
          duration={3000}
          onOpenChange={setToastOpen}
          open={toastOpen}
        ></Toast>
        <ToastViewport className="fixed bottom-0 right-0 flex flex-col gap-3 outline-none p-6" />
      </ToastProvider>
    </>
  );
}
