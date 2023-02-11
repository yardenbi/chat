"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const body_parser_1 = __importDefault(require("body-parser"));
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization, X-Requested-With, X-HTTP-Method-Override, Accept");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,UPDATE,OPTIONS");
    console.log("request ", req.method, req.originalUrl, req.body);
    next();
});
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);
let interval;
io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});
const getApiAndEmit = (socket) => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
};
server.listen(port, () => console.log(`Listening on port ${port}`));
//# sourceMappingURL=app.js.map