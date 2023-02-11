"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const messageController_1 = require("./Controller/messageController");
const routes_1 = require("./routes");
const config_1 = require("./config");
mongoose_1.default.connect(config_1.dbUrl);
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization, X-Requested-With, X-HTTP-Method-Override, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,UPDATE,OPTIONS");
    console.log("request ", req.method, req.originalUrl, req.body);
    next();
});
app.use(routes_1.router);
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
const connectedUsers = {};
io.on("connection", (socket) => {
    console.log(`New client connected : ${socket.id}`);
    socket.on(`disconnect: ${socket.id}`, () => {
        console.log("Client disconnected");
        delete connectedUsers[socket.id];
    });
    socket.on("name", (name) => {
        connectedUsers[socket.id] = name;
    });
    socket.on("chat message", (msg) => {
        console.log(`Message: ${connectedUsers[socket.id]} - ${msg}`);
        new messageController_1.MessageController().saveMessage(msg, connectedUsers[socket.id]);
        io.emit("chat message", {
            message: msg,
            userName: connectedUsers[socket.id],
        });
    });
});
server.listen(config_1.port, () => console.log(`Listening on port ${config_1.port}`));
//# sourceMappingURL=app.js.map