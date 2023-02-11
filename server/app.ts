import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { MessageController } from "./Controller/messageController";
import { router } from "./routes";
import { dbUrl, port } from "./config";

mongoose.connect(dbUrl);

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-type,Authorization, X-Requested-With, X-HTTP-Method-Override, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  console.log("request ", req.method, req.originalUrl, req.body);
  next();
});

app.use(router);

const server = http.createServer(app);
const io = new Server(server);

const connectedUsers = {};

io.on("connection", (socket) => {
  console.log(`New client connected : ${socket.id}`);
  socket.on(`disconnect: ${socket.id}`, () => {
    console.log("Client disconnected");
    delete connectedUsers[socket.id];
  });

  socket.on("name", (name: string) => {
    connectedUsers[socket.id] = name;
  });

  socket.on("chat message", (msg: string) => {
    console.log(`Message: ${connectedUsers[socket.id]} - ${msg}`);
    new MessageController().saveMessage(msg, connectedUsers[socket.id]);
    io.emit("chat message", {
      message: msg,
      userName: connectedUsers[socket.id],
    });
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
