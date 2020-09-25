import { Model } from "mongoose";
import { IUser } from "../../mongoose/models/user";
import { IRoom } from "../../mongoose/models/room";

const LoggedUser = {
  userRooms: async (
    parent: { userRooms: { seen: boolean; roomID: string; _id: string }[] },
    _: any,
    context: { Models: { User: Model<IUser, {}>; Room: Model<IRoom, {}> } }
  ) => {
    const { userRooms } = parent;

    // first create callback function that takes a single room and goes to search for this room the db

    const generateRoom = async (userRoom: {
      seen: boolean;
      roomID: string;
    }) => {
      const { seen, roomID } = userRoom;
      // find room
      const foundRoom = await context.Models.Room.findById(roomID);

      if (!foundRoom)
        throw new Error(
          "No such room even if the user has it. Needs more work here"
        );

      const { name, privateRoom, messages } = foundRoom;

      return {
        _id: roomID,
        seen,
        privateRoom,
        name,
        messages,
      };
    };

    // this function to actuall map over all parent rooms and generate array of full rooms

    const getFullRooms = async () => {
      const promisedFullRooms = userRooms.map((userRoom) =>
        generateRoom(userRoom)
      );

      return Promise.all(promisedFullRooms);
    };

    try {
      const fullRooms = await getFullRooms();
      return fullRooms;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

export default LoggedUser;
