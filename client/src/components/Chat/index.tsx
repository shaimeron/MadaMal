import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { serverURL } from "../../api";

const socket = socketIOClient(serverURL);

interface IMessage {
  username: string;
  message: string;
}

export const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    socket.on("chat history", (history: IMessage[]) => {
      setMessages(history);
    });

    socket.on("chat message", (msg: IMessage) => {
      setMessages((msgs) => [...msgs, msg]);
    });

    return () => {
      socket.off("chat history");
      socket.off("chat message");
    };
  }, []);

  const sendMessage = (): void => {
    if (message && username) {
      const data: IMessage = { username, message };
      socket.emit("chat message", data);
      setMessage("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.username}</strong>: {msg.message}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};
