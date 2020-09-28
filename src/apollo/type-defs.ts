import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    logUser(email: String!): LoggedUser
  }

  type LoggedUser {
    _id: String
    name: String
    email: String
  }
`;

export default typeDefs;
