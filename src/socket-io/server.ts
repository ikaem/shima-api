import socketio from "socket.io";
import http from "http";

import { addUserToRoom, createRoom, removeUser } from "./rooms";

const ioServer = (server: http.Server) => {
  const io = socketio(server);

  io.on("connect", (socket) => {
    console.log("We have a connection", socket.id);

    // listening for events
    socket.on("join", (data: { name: string; room: string }, callback) => {
      const { username, error } = addUserToRoom(data.name, data.room);

      if (error) return callback({ error });

      socket.join(data.room, () => {
        socket.emit("adminMessage", {
          message: { name: "admin", content: `Welcome` },
          room: data.room,
        });
        socket.to(data.room).emit("adminMessage", {
          message: {
            name: "admin",
            content: `${data.name} "has joined the room`,
          },
          room: data.room,
        });

        io.to(data.room).emit("adminMessage", {
          message: {
            name: "admin",
            content: `You all have fun`,
          },
          room: data.room,
        });
      });

      return callback({ roomName: data.room });
    });

    socket.on(
      "message",
      (data: { name: string; room: string; message: string }) => {
        io.to(data.room).emit("roomMessage", {
          room: data.room,
          message: {
            name: data.name,
            content: data.message,
          },
        });
      }
    );

    socket.on(
      "createRoom",
      (data: { name: string; room: string }, callback) => {
        const { error, roomName } = createRoom(data.room);

        if (error) return callback({ error });

        const { error: addToRoomError, username } = addUserToRoom(
          data.name,
          roomName as string
        );

        if (addToRoomError) return callback({ error: addToRoomError });

        socket.join(data.room, () => {
          socket.emit("adminMessage", {
            message: { name: "admin", content: `Welcome` },
            room: data.room,
          });
          socket.to(data.room).emit("adminMessage", {
            message: {
              name: "admin",
              content: `${data.name} "has joined the room`,
            },
            room: data.room,
          });

          io.to(data.room).emit("adminMessage", {
            message: {
              name: "admin",
              content: `You all have fun`,
            },
            room: data.room,
          });
        });

        return callback({ roomName });
      }
    );

    // disconnect event on socket
    socket.on("disconnect", (data: { username: string }) => {
      console.log("the socket has disconnected");

      // remove user from users object

      const { error, username } = removeUser(data.username);

      if (error) console.log("There is no such user");

      // emit message that this user has left

      io.emit("adminMessage", {
        message: {
          name: "admin",
          content: `${data.username} has left the chat`,
        },
        room: "lobby",
      });

      // close the underlying connection

      setTimeout(() => {
        socket.disconnect(true);
      }, 2000);
    });
  });

  //   return io;
};

export default ioServer;
