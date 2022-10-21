import algoliasearch from "algoliasearch/lite";
import { NextRouter, useRouter } from "next/router";
const { history } = require("instantsearch.js/es/lib/routers");
const { simple } = require("instantsearch.js/es/lib/stateMappings");

export const algoliaSearchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID!,
  process.env.ALGOLIA_API_KEY!
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
          "category.lv0": routeState.category,
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
