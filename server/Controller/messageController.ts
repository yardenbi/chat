import { Message } from "../models/message";
import { MessageService } from "../service/messageService";

export class MessageController {
  messageService = null;

  constructor() {
    this.messageService = new MessageService();
  }

  getMessages = async (req, res) => {
    try {
      const { offset, limit } = req.query;
      const messages = await this.messageService.getMessages({ offset, limit });
      res.json({ messages: messages });
    } catch (error) {
      res.status(500).send(error);
    }
  };

  saveMessage = async (message: string, userName: string) => {
    try {
      const newMessgae = new Message({
        userName,
        message,
      });

      await newMessgae.save();
    } catch (error) {
      console.log({ error });
    }
  };
}
