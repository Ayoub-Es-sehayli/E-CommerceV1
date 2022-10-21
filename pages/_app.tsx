import "bootstrap-icons/font/bootstrap-icons.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ReactElement, ReactNode } from "react";
import { InstantSearch } from "react-instantsearch-hooks-web";
import { Provider } from "react-redux";
import {
  algoliaRoutingConfig,
  algoliaSearchClient,
} from "services/algolia-service";
import { store } from "store";
import "../styles/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();
  return (
    <InstantSearch
      searchClient={algoliaSearchClient}
      indexName="dev_products"
      routing={algoliaRoutingConfig(router)}
    >
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </InstantSearch>
  );
}
