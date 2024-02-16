import { serverURL } from "@/api";
import socketIOClient from "socket.io-client";

export const socket = socketIOClient(serverURL);

export interface IMessage {
  username: string;
  message: string;
}
