import { Server } from "socket.io";
import { messageModel } from "./models/messages/messages.model";
import https from "https";
import http from "http";

export const startSocketIO = (server: http.Server | https.Server) => {
  const socketIO = new Server(server, {
    cors: {
      origin: "*", // Replace with your client app's URL
      methods: ["GET", "POST"],
    },
  });

  socketIO.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("request chat history", () => {
      messageModel
        .find()
        .sort({ timestamp: 1 })
        .limit(50)
        .exec()
        .then((messages) => {
          socket.emit("chat history", messages);
        })
        .catch((err) => {
          console.error("Error fetching chat history:", err);
        });
    });
    socket.on("chat message", (data) => {
      const newMessage = new messageModel({
        username: data.username,
        message: data.message,
      });
      newMessage.save();
      socketIO.emit("chat message", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
