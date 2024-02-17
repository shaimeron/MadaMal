import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { selectUserId } from "@/store/user";
import { useAppSelector } from "@/hooks/store";
import { IMessagesDTO, socket } from "../socketUtils";

export const AddMessage: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const userId: string = useAppSelector(selectUserId);

  const sendMessage = (): void => {
    if (message) {
      const data: IMessagesDTO = { userId, message };
      socket.emit("chat message", data);
      setMessage("");
    }
  };

  return userId ? (
    <>
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
        style={{ marginTop: "10px" }}
      >
        Send
      </Button>
    </>
  ) : (
    <></>
  );
};
