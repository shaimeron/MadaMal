import {Server} from "socket.io";
import https from "https";
import http from "http";
import {SocketIOController} from "./controllers";
import {IMessageForClient} from "./models/messages";

const socketIOController = new SocketIOController();

export const startSocketIO = (server: http.Server | https.Server) => {
  const socketIO = new Server(server, {
    path: "/api/socket.io/",
    cors: {
      origin: "*", // Replace with your client app's URL
      methods: ["GET", "POST"],
    },
  });

  socketIO.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("request chat history", async () => {
      try {
        const messages: IMessageForClient[] =
          await socketIOController.getChetHistory();
        socket.emit("chat history", messages);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    });
    socket.on("chat message", async (data) => {
      const messageToReturn: IMessageForClient =
        await socketIOController.newMessage(data);
      socketIO.emit("chat message", messageToReturn);
    });

    socket.on("disconnect", () => {
      socketIOController.onDisconnect();
    });
  });
};
