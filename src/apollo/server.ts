import { ApolloServer } from "apollo-server-express";
import e from "express";
import typeDefs from "./type-defs";
import resolvers from "./resolvers";
import Models from "../mongoose/models";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { Models }
  },
});

// export default (app: e.Application) => {
//   server.applyMiddleware({ app, path: "/graphql" });
// };

export default {
  attach: (app: e.Application) => {
    server.applyMiddleware({ app, path: "/graphql" });
  },
  log: () => console.log(server),
};
