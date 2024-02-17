import React, { useState, useEffect, useRef } from "react";
import { Divider, Grid, List } from "@mui/material";
import { AddMessage } from "../addMessage";
import { IMessage, socket } from "../socketUtils";
import { ChatListItem } from "../chatListItem";

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
    <Grid display="flex" direction="column" spacing={2}>
      <Grid item>
        <AddMessage />
      </Grid>

      <Grid item sx={{ paddingTop: "25px" }}>
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
            <>
              <ChatListItem message={msg} />
              {index < messages.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Grid>
    </Grid>
  );
};
