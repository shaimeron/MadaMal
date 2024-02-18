import React, {useMemo} from "react";
import {Box, ListItem, ListItemText, Typography} from "@mui/material";
import {IMessage} from "../socketUtils";
import {dateFormater} from "@/utils/date";

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
          <Box display="flex" flexDirection="row">
            <Typography variant="body2" style={{ fontWeight: "bold" }}>
              {message.username}
            </Typography>
            <Typography
              variant="body2"
              style={{ fontWeight: "bold", padding: "0px 5px" }}
            >
              -
            </Typography>
            <Typography variant="body2" style={{ fontWeight: "bold" }}>
              {dateDisplay}
            </Typography>
          </Box>
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
