import React, { useEffect, useState } from "react";
import Chat from "./components/Chat";
import { QueryClient, QueryClientProvider } from "react-query";
import { Input, Modal } from "./components/styled";
import socketio from "socket.io-client";
import { ENDPOINT } from "./config";
import UserNameModal from "./components/UserNameModal";

const queryClient = new QueryClient();

function App() {
  const [socket, setSocket] = useState(null);
  const [userName, setUerName] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);

  useEffect(() => {
    const newSocket = socketio(ENDPOINT, { transports: ["websocket"] });
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {isNameSet ? null : (
        <UserNameModal
          setUerName={setUerName}
          setIsNameSet={setIsNameSet}
          userName={userName}
          socket={socket}
        />
      )}
      <div style={{ marginTop: "20px", paddingLeft: "35px" }}>
        My Name: {userName}
        <Chat userName={userName} socket={socket} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
