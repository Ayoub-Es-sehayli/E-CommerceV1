import algoliaadminsearch from "algoliasearch";
import algoliasearch from "algoliasearch/lite";
import { NextRouter } from "next/router";

export const useAlgoliaSearchClient = () => {
  const algoliaSearchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
    process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!
  );
  return algoliaSearchClient;
};
export const useAlgoliaAdminClient = () => {
  const algoliaAdminClient = algoliaadminsearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
    process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_KEY!
  );
  return algoliaAdminClient;
};
const stateMapping = {
  stateToRoute: (uiState: any) => {
    const indexUiState = uiState["dev_products"];
    return {
      q: indexUiState.query,
      category: indexUiState.hierarchicalMenu
        ? indexUiState.hierarchicalMenu["category.lvl0"]
        : indexUiState.hierarchicalMenu,
      brand: indexUiState.refinementList?.brand,
      price: indexUiState.range?.price,
      page: indexUiState.page,
    };
  },
  routeToState: (routeState: any) => {
    return {
      ["dev_products"]: {
        query: routeState.q,
        hierarchicalMenu: {
          "category.lvl0": routeState.category,
        },
        refinementList: {
          brand: routeState.brand,
        },
        range: {
          price: routeState.price,
        },
        page: routeState.page,
      },
    };
  },
};
export const algoliaRoutingConfig = (router: NextRouter) => {
  return {
    stateMapping: stateMapping,
  };
};
