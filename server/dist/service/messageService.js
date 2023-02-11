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
exports.MessageService = void 0;
const message_1 = require("../models/message");
class MessageService {
    constructor() {
        this.getMessages = ({ offset, limit, }) => __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield message_1.Message.find()
                    .sort({ createdAt: -1 })
                    .skip(offset)
                    .limit(limit);
                return messages.reverse();
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.MessageService = MessageService;
//# sourceMappingURL=messageService.js.map