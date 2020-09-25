import { Model } from "mongoose";
import { IUser } from "../../mongoose/models/user";
import { IRoom } from "../../mongoose/models/room";

import { UserInputError } from "apollo-server-express";

const Query = {
  hello: async () => "Hello there",
};

export default Query;
