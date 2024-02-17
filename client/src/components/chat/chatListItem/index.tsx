import React, { useMemo } from "react";
import { ListItem, ListItemText, Typography } from "@mui/material";
import { IMessage } from "../socketUtils";
import { dateFormater } from "@/utils/date";

interface IChatListItemProps {
  message: IMessage;
}

export const ChatListItem: React.FC<IChatListItemProps> = ({ message }) => {
  const dateDisplay = useMemo(
    () => dateFormater(message.timestamp),
    [message.timestamp]
  );

  return (
    <ListItem alignItems="flex-start" id={message._id}>
      <ListItemText
        primary={
          <Typography variant="body2" style={{ fontWeight: "bold" }}>
            {message.username} - {dateDisplay}
          </Typography>
        }
        secondary={
          <Typography variant="subtitle1" style={{ color: "#555" }}>
            {message.message}
          </Typography>
        }
      />
    </ListItem>
  );
};
