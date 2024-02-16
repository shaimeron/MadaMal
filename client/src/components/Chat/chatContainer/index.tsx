import React, { useState, useEffect, useRef } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { AddMessage } from "../addMessage";
import { IMessage, socket } from "../socketUtils";

export const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.emit("request chat history"); // Request chat history upon connection

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

  return (
    <div>
      <AddMessage />
      <br />
      <br />
      <List
        style={{
          maxHeight: 400,
          overflow: "auto",
          backgroundColor: "#f0f0f0",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}
                  >
                    {msg.username}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" style={{ color: "#555" }}>
                    {msg.message}
                  </Typography>
                }
              />
            </ListItem>
            {index < messages.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </React.Fragment>
        ))}
        <div ref={messagesEndRef} />
      </List>
    </div>
  );
};
