import React, {useState, useEffect, useRef} from "react";
import socketIOClient from "socket.io-client";
import { serverURL } from "../../api";
import {Button, Divider, List, ListItem, ListItemText, TextField, Typography} from "@mui/material";
import {userSlice} from "../../store/user";

const socket = socketIOClient(serverURL);

interface IMessage {
  username: string;
  message: string;
}

export const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [username] = useState<string>(userSlice.name);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

  useEffect(() => {
      socket.emit('request chat history'); // Request chat history upon connection

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
          <TextField
              label="Type a message"
              variant="outlined"
              fullWidth
              margin="normal"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button
              variant="contained"
              color="primary"
              onClick={sendMessage}
              style={{marginTop: '10px'}}
          >
              Send
          </Button>
          <br/>
          <br/>
          <List style={{
              maxHeight: 400,
              overflow: 'auto',
              backgroundColor: '#f0f0f0',
              padding: '10px',
              borderRadius: '10px'
          }}>
              {messages.map((msg, index) => (
                  <React.Fragment key={index}>
                      <ListItem alignItems="flex-start">
                          <ListItemText
                              primary={<Typography variant="subtitle1"
                                                   style={{fontWeight: 'bold'}}>{msg.username}</Typography>}
                              secondary={<Typography variant="body2" style={{color: '#555'}}>{msg.message}</Typography>}
                          />
                      </ListItem>
                      {index < messages.length - 1 && <Divider variant="inset" component="li"/>}
                  </React.Fragment>
              ))}
          <div ref={messagesEndRef}/>
          </List>
      </div>
  );
};
