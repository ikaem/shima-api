import express from "express";
import cors from "cors";
import http from "http";

import routes from "./router";
import ioServer from "./socket-io/server";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});

ioServer(server);
