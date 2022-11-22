import algoliaadminsearch from "algoliasearch";
import algoliasearch from "algoliasearch/lite";
import { NextRouter, useRouter } from "next/router";

export const algoliaSearchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID!,
  process.env.ALGOLIA_API_KEY!
);
export const algoliaAdminClient = algoliaadminsearch(
  process.env.ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_KEY!
);
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
      // page: indexUiState.page,
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
        // page: routeState.page,
      },
    };
  },
};
export const algoliaRoutingConfig = (router: NextRouter) => {
  return {
    stateMapping: stateMapping,
  };
};
