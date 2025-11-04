import { ApolloServer } from "@apollo/server";

import { graphSchema } from "./schema/schema.js";
import { graphQLResolver } from "./resolvers/resolvers.js";

export const connectGraphql = () => {
  const server = new ApolloServer({
    typeDefs: graphSchema,
    resolvers: graphQLResolver,
  });
  return server;
};
