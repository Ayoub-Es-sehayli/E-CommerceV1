import ProductCard from "@features/ui/product-card.component";
import { ProductSchema } from "@features/ui/product.schema";
import Spinner from "@features/ui/spinner.component";
import { Form, Formik } from "formik";
import Head from "next/head";
import ProductForm from "./product-form.component";
import useProduct from "./useProduct.hook";

export default function ProductContainer() {
  const {
    product,
    isLoading,
    brands,
    categories,
    handleSubmit,
    handleThumbnailReplace,
  } = useProduct();

  return (
    <>
      <Head>
        <title>Nouveau Produit</title>
      </Head>
      {isLoading ? (
        <Spinner isLoading />
      ) : (
        <Formik
          enableReinitialize
          initialValues={product}
          onSubmit={handleSubmit}
          validationSchema={ProductSchema}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col mx-auto gap-1">
              <div className="flex px-4 py-1 justify-center gap-8">
                <section className="flex flex-col">
                  <h1 className="font-bold text-xl text-primary-400">
                    Product
                  </h1>
                  {/* Display Form */}
                  <ProductForm
                    brands={brands}
                    categories={categories}
                    handleThumbnailReplace={(e) =>
                      handleThumbnailReplace(e, setFieldValue)
                    }
                  />
                </section>
                {/* Preview Card */}
                <section className="w-1/4 my-auto">
                  <ProductCard item={values} />
                </section>
              </div>
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-400  text-white font-bold text-lg py-2 px-6 rounded-md mx-auto"
              >
                Sauvegarder
              </button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}
