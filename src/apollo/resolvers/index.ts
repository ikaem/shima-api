import Query from "./query";
import Mutation from "./mutation";
import LoggedUser from "./logged-user";
import UserRoom from "./user-room";
import { GraphQLDateTime } from "graphql-iso-date";

export default {
  Query,
  Mutation,
  LoggedUser,
  UserRoom,
  DateTime: GraphQLDateTime,
};
