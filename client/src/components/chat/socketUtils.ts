import {serverURL} from "@/api";
import socketIOClient from "socket.io-client";

export const socket = socketIOClient(serverURL, {
  path: "/api/socket.io",
});

export interface IMessagesDTO {
  userId: string;
  message: string;
}

export interface IMessage {
  username: string;
  message: string;
  timestamp: Date;
  _id: string;
}
