import { Message } from "../models/message";

export class MessageService {
  getMessages = async ({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }) => {
    try {
      const messages = await Message.find()
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit);
      return messages.reverse();
    } catch (error) {
      throw error;
    }
  };
}
