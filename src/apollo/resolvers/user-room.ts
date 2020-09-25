import { Model } from "mongoose";
import { IUser } from "../../mongoose/models/user";
import { IRoom, IMessage } from "../../mongoose/models/room";

const UserRoom = {
  messages: async (
    parent: { messages: IMessage[] },
    _: any,
    context: { Models: { User: Model<IUser, {}>; Room: Model<IRoom, {}> } }
  ) => {
    const generateMessage = async (message: IMessage) => {
      const { _id, content, createdAt, authorID } = message;
      const foundUser = await context.Models.User.findById(authorID);
      if (!foundUser)
        throw new Error(
          "No such author even if their message exists. Needs more work here"
        );
      return {
        _id,
        author: foundUser.name,
        content,
        createdAt,
      };
    };

    const getAuthoredMessages = async () => {
      const promisedAuthoredMessages = parent.messages.map((message) =>
        generateMessage(message)
      );

      return Promise.all(promisedAuthoredMessages);
    };

    try {
      const authoredMessages = await getAuthoredMessages();
      return authoredMessages;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

export default UserRoom;
