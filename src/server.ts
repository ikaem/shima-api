import express from "express";
import cors from "cors";
import http from "http";

import routes from "./router";
import ioServer from "./socket-io/server";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(routes);

const server = http.createServer(app);

server.listen(5000, () => {
  console.log("Server is listening on port 5000");
});

ioServer(server);





// // socket io
// const io = socketio(server);

// io.on("connect", (socket) => {
//   console.log("We have a connection", socket.id);

//   // listening for events
//   socket.on("join", (data: { name: string; room: string }) => {
//     // here we check that the user is not in the room already

//     // then we send admin message saying welcome

//     // we send it just to the socket here
//     socket.emit("adminMessage", {
//       name: "admin",
//       content: `Hi ${data.name}, welcome to the chat`,
//       room: data.room,
//     });

//     // we send to everyone here in this room, but the user
//     socket.to(data.room).emit("adminMessage", {
//       name: "admin",
//       content: `${data.name} "has joined the room`,
//       room: data.room,
//     });

//     // we send to everyone here in the chat
//     socket.emit("adminMessage", {
//       name: "admin",
//       content: `You all have fun`,
//       room: data.room,
//     });
//   });

//   // disconnect event on socket
//   socket.on("disconnect", () => {
//     console.log("the socket has disconnected");
//   });
// });
