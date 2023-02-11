import express from "express";
import { MessageController } from "../Controller/messageController";

export const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

router.get("/messages", new MessageController().getMessages);

module.exports = { router };
