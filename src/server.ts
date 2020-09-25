import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import http from "http";

import routes from "./router";
import ioServer from "./socket-io/server";
import dbConnection from "./mongoose/db-connection";
import apolloServer from "./apollo/server";

const PORT = process.env.PORT || 5000;
const DB_HOST = process.env.DB_HOST as string;

const app = express();
// connect to the database
dbConnection.connect(DB_HOST);

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false })); // not needed
app.use(routes);

const server = http.createServer(app);
apolloServer.attach(app);
ioServer(server);

server.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
