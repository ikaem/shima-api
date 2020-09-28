import { Model } from "mongoose";

import { UserInputError } from "apollo-server-express";

import { IUser } from "../../mongoose/models/user";

const Mutation = {
  logUser: async (
    _: any,
    args: { email: string },
    context: { Models: { User: Model<IUser, {}> } }
  ) => {
    console.log("im here");
    const { email: loginEmail } = args;
    const {
      Models: { User },
    } = context;

    try {
      const foundUser = await User.findOne({ email: loginEmail });

      if (!foundUser)
        throw new UserInputError("No such user", {
          type: "INVALID_EMAIL",
          data: loginEmail,
        });

      const { _id, name, email } = foundUser;
      return { _id, name, email };
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

export default Mutation;
