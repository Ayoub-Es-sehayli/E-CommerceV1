import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { InstantSearch } from "react-instantsearch-hooks-web";
import {
  algoliaRoutingConfig,
  algoliaSearchClient,
} from "services/algolia-service";
import Footer from "./footer.component";
import NavBar from "./navbar/navbar.component";
import { SideBar } from "./navbar/sidebar.component";
import useUILoaders from "./useUILoaders.hook";

export default function ShopLayout({ children }: PropsWithChildren) {
  const { isLoading } = useUILoaders();
  const router = useRouter();
  return (
    <InstantSearch
      searchClient={algoliaSearchClient}
      indexName="dev_products"
      routing={algoliaRoutingConfig(router)}
    >
      <div className="daisy-drawer">
        <input
          id="nav-drawer"
          type="checkbox"
          className="daisy-drawer-toggle"
        />
        <div className="daisy-drawer-content h-screen flex flex-col justify-between">
          <header>
            <NavBar
              attributes={["category.lvl0", "category.lvl1", "category.lvl2"]}
            />
          </header>
          <main className="container mx-auto mb-4 lg:my-4 px-4">
            {children}
          </main>
          <Footer />
        </div>
        <SideBar
          attributes={["category.lvl0", "category.lvl1", "category.lvl2"]}
        />
      </div>
    </InstantSearch>
  );
}
