"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../Controller/messageController");
exports.router = express_1.default.Router();
exports.router.get("/", (req, res) => {
    res.send({ response: "I am alive" }).status(200);
});
exports.router.get("/messages", new messageController_1.MessageController().getMessages);
module.exports = { router: exports.router };
//# sourceMappingURL=index.js.map