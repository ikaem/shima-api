import socketio from "socket.io";
import http from "http";

import { addUserToRoom } from "./rooms";

const ioServer = (server: http.Server) => {
  const io = socketio(server);

  io.on("connect", (socket) => {
    console.log("We have a connection", socket.id);

    // listening for events
    socket.on("join", (data: { name: string; room: string }, callback) => {
      // here we check that the user is not in the room already

      const { username, error } = addUserToRoom(data.name, data.room);

      // if error, we send callback to frontend, and we return
    //   if (error) return callback(error);

      // if there is no error, we will join, because then it can be only username

      socket.join(data.room, () => {
        // console.log(socket.rooms);

        socket.emit("adminMessage", {
          name: "admin",
          content: `Welcome`,
          room: data.room,
        });
        socket.to(data.room).emit("adminMessage", {
          name: "admin",
          content: `${data.name} "has joined the room`,
          room: data.room,
        });

        io.to(data.room).emit("adminMessage", {
          name: "admin",
          content: `You all have fun`,
          room: data.room,
        });
      });

      //   io.to(data.room).emit("adminMessage", {
      //     name: "admin",
      //     content: `This will work first time, on first app run`,
      //     room: data.room,
      //   });

      //   socket.to(data.room).emit("adminMessage", {
      //     name: "admin",
      //     content: `This will not work first time on first app run, but subsequent messaging will work`,
      //     room: data.room,
      //   });
    });

    socket.on(
      "message",
      (data: { name: string; room: string; message: string }) => {
        console.log("this is message from the room:", data.message);

        // sending message back to the room on the frontend...

        io.to(data.room).emit("roomMessage", {
          room: data.room,
          message: {
            name: data.name,
            content: data.message,
          },
        });
      }
    );

    // console.log("checking rooms again", socket.rooms);

    // disconnect event on socket
    socket.on("disconnect", () => {
      console.log("the socket has disconnected");
    });
  });

  //   return io;
};

export default ioServer;
