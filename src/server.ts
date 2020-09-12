import express from "express";
import cors from "cors";
import http from "http";
import socketio from "socket.io";

import routes from "./router";

const app = express();

app.use(cors());
app.use(routes);

const server = http.createServer(app);

server.listen(5000, () => {
  console.log("Server is listening on port 5000");
});

// socket io
const io = socketio(server);

let userName: string;

io.on("connect", (socket) => {
  console.log("We have a connection", socket.id);

  // listening for events
  socket.on("setUsername", (data: { name: string }) => {
    userName = data.name;

    socket.emit("adminMessage", { name: "admin", content: "Hi kaem, welcome to the chat"})

    // test from here
    socket.emit("adminMessage", { name: "kaem", content: "Hi kaem, welcome to the chat", room: "lobby"})
    socket.emit("adminMessage", { name: "john", content: "Hi kaem, welcome to the chat", room: "john"})
    socket.emit("adminMessage", { name: "mark", content: "Hi kaem, welcome to the chat", room: "mark"})
    socket.emit("adminMessage", { name: "kaem", content: "Hi kaem, welcome to the chat", room: "bday"})
    socket.emit("adminMessage", { name: "admin", content: "Hi kaem, welcome to the chat", room: "lobby"})
    socket.emit("adminMessage", { name: "kaem", content: "Hi kaem, welcome to the chat", room: "tech"})
    socket.emit("adminMessage", { name: "admin", content: "Hi kaem, welcome to the chat", room: "lobby"})
    socket.emit("adminMessage", { name: "mark", content: "Hi kaem, welcome to the chat", room: "mark"})
    socket.emit("adminMessage", { name: "karm", content: "Hi kaem, welcome to the chat", room: "lobby"})
    socket.emit("adminMessage", { name: "karm", content: "Hi kaem, welcome to the chat", room: "lobby"})
    socket.emit("adminMessage", { name: "karm", content: "Hi kaem, welcome to the chat", room: "lobby"})

  });

  

  // disconnect event on socket
  socket.on("disconnect", () => {
    console.log("the socket has disconnected");
  });
});
