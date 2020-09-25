import { Model } from "mongoose";
import User, { IUser } from "../../mongoose/models/user";
import { IRoom } from "../../mongoose/models/room";

import { UserInputError } from "apollo-server-express";

interface LogUserArgs {
  email: string;
}
interface RegisterUserArgs {
  email: string;
  name: string;
  password: string;
}
interface ContextInterface {
  Models: {
    User: Model<IUser, {}>;
    Room: Model<IRoom, {}>;
  };
}

const Mutation = {
  logUser: async (_: any, args: LogUserArgs, context: ContextInterface) => {
    try {
      const foundUser = await context.Models.User.findOne({
        email: args.email,
      });

      if (!foundUser)
        throw new UserInputError(
          "No such user. Please check your entry or register",
          {
            type: "EMAIL_NOT_IN_USE",
            data: args.email,
          }
        );

      const { _id, name, email, userRooms } = foundUser;

      return {
        _id,
        name,
        email,
        userRooms,
      };
    } catch (error) {
      return error;
    }
  },
  registerUser: async (
    _: any,
    args: RegisterUserArgs,
    context: ContextInterface
  ) => {
    // try find user with this email

    const { email, password, name } = args;

    try {
      const existingUser = await context.Models.User.findOne({ email: email });

      if (existingUser)
        throw new UserInputError(
          "This email is already in use. Try log in with it or use another email",
          {
            data: email,
            type: "EMAIL_IN_USE",
          }
        );

      // if no such user, go add new user to database

      const {
        _id,
        name: newUserName,
        email: newUserEmail,
        userRooms,
      } = await context.Models.User.create({
        email,
        name,
        password,
      });

      return {
        _id,
        newUserName,
        newUserEmail,
        userRooms,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

export default Mutation;
