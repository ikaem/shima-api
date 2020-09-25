import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar DateTime
  type Query {
    hello: String
  }

  type Mutation {
    logUser(email: String!): LoggedUser,
    registerUser(email: String!, password: String!, name: String!): LoggedUser
  }

  type Message {
    _id: String
    author: String
    content: String
    createdAt: DateTime
  }

  type UserRoom {
    _id: String
    name: String
    privateRoom: Boolean
    messages: [Message]
    seen: Boolean
  }

  type LoggedUser {
    _id: String
    name: String
    email: String
    userRooms: [UserRoom]
  }
`;

export default typeDefs;
