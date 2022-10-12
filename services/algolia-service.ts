import algoliasearch from "algoliasearch/lite";

export const algoliaSearchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID!,
  process.env.ALGOLIA_API_KEY!
);
