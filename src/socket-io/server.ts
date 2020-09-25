import socketio from "socket.io";
import http from "http";

import { addUserToRoom, createRoom, removeUser } from "./rooms";

const ioServer = (server: http.Server) => {
  const io = socketio(server);

  io.on("connect", (socket) => {
    console.log("We have a connection", socket.id);
    console.log("This is the handshake", socket.handshake.query.username);

    // listening for events
    socket.on("join", async (data: { name: string; room: string }, ack) => {
      const { username, error } = addUserToRoom(
        data.name,
        data.room,
        socket.id
      );

      if (error) return ack({ error });

      await new Promise((resolve) =>
        resolve(
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
          })
        )
      );

      if (!Object.keys(socket.rooms).includes(data.room)) return ack({ error });

      return ack({ roomName: data.room });
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
      async (data: { name: string; room: string }, ack) => {
        const { error, roomName } = createRoom(data.room);

        if (error) return ack({ error });

        const { error: addToRoomError, username } = addUserToRoom(
          data.name,
          roomName as string
        );

        if (addToRoomError) return ack({ error: addToRoomError });

        await new Promise((resolve) =>
          resolve(
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
            })
          )
        );

        if (!Object.keys(socket.rooms).includes(data.room))
          return ack({ error });

        return ack({ roomName: data.room });
      }
    );

    // disconnect event on socket
    socket.on("disconnect", () => {

      // remove user from users object
      const { error, username } = removeUser(socket.id);

      if (error) console.log("There is no such user");

      // emit message that this user has left

      io.emit("adminMessage", {
        message: {
          name: "admin",
          content: `${username} has left the chat, sure.`,
        },
        room: "lobby",
      });

      // close the underlying connection

      setTimeout(() => {
        socket.disconnect(true);
      }, 2000);
    });
  });

};

export default ioServer;
