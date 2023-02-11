import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { ENDPOINT, limit } from "../config";
import Message from "./Message";
import {
  Button,
  ChatContainer,
  FlexColumn,
  FlexRow,
  Input,
  MassagesContainer,
  MessageInputContainer,
} from "./styled";

function Chat({ userName, socket }) {
  const overflowedDivRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userMessgae, setUserMessage] = useState(null);

  const { data, refetch } = useQuery("repoData", () =>
    fetch(`${ENDPOINT}/messages?limit=${limit}&offset=${messages.length}`).then(
      (res) => res.json()
    )
  );

  useEffect(() => {
    overflowedDivRef.current.scrollTop = overflowedDivRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (data?.messages?.length) {
      setMessages([...data.messages, ...messages]);
      setUserMessage(null);
    } else setUserMessage("No More Messages");
  }, [data]);

  useEffect(() => {
    socket?.on("chat message", (msg) => {
      setMessages([...messages, msg]);
    });
  }, [messages, socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("chat message", message);
    setMessage("");
  };

  return (
    <>
      <ChatContainer>
        <MassagesContainer ref={overflowedDivRef}>
          <FlexColumn gap={{ row: 10 }}>
            <Button
              type="buttom"
              onClick={(e) => {
                e.preventDefault();
                refetch();
              }}
            >
              Load More
            </Button>
            <FlexRow justifyContent="center">
              {userMessgae ? userMessgae : null}
            </FlexRow>
          </FlexColumn>
          {messages.map((msg, index) => (
            <div
              style={{
                justifyContent: msg.userName === userName ? "right" : "left",
                width: "100%",
                display: "flex",
              }}
              key={index}
            >
              <Message userName={msg.userName} message={msg.message} />
            </div>
          ))}
        </MassagesContainer>
        <MessageInputContainer onSubmit={sendMessage}>
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </MessageInputContainer>
      </ChatContainer>
    </>
  );
}

export default Chat;
