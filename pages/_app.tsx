import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "store";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { InstantSearch } from "react-instantsearch-hooks-web";
import { algoliaSearchClient } from "services/algolia-service";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <InstantSearch searchClient={algoliaSearchClient} indexName="dev_products">
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </InstantSearch>
  );
}
