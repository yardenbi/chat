import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { Input } from "./styled";
const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, { transports: ["websocket"] });
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <>
      {/* <p>
        It's <time dateTime={response}>{response}</time>
      </p> */}
      <div
        style={{
          height: "800px",
          width: "800px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // border: "1px solid",
        }}
      >
        <Input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
      </div>
    </>
  );
}

export default App;
