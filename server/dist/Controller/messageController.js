"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const message_1 = require("../models/message");
const messageService_1 = require("../service/messageService");
class MessageController {
    constructor() {
        this.messageService = null;
        this.getMessages = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { offset, limit } = req.query;
                const messages = yield this.messageService.getMessages({ offset, limit });
                res.json({ messages: messages });
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
        this.saveMessage = (message, userName) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newMessgae = new message_1.Message({
                    userName,
                    message,
                });
                yield newMessgae.save();
            }
            catch (error) {
                console.log({ error });
            }
        });
        this.messageService = new messageService_1.MessageService();
    }
}
exports.MessageController = MessageController;
//# sourceMappingURL=messageController.js.map