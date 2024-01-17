import initApp from "./app";
import https from 'https';
import http from 'http';
import fs from 'fs';
import { Server } from 'socket.io';
import {messageModel} from "./models/messages/messages.model";

initApp().then((app) => {
  // if (process.env.NODE_ENV !== 'production') {
  // console.log('development');
    const server = http.createServer(app);
    const socketIO = new Server(server, {
        cors: {
            origin: "*", // Replace with your client app's URL
            methods: ["GET", "POST"]
        }
    });

    socketIO.on('connection', (socket) => {
        console.log('New client connected');

        messageModel.find().sort({ timestamp: 1 }).limit(50).exec()
            .then(messages => {
                socket.emit('chat history', messages);
            })
            .catch(err => {
                // Handle error
                console.error('Error fetching chat history:', err);
            });

        socket.on('chat message', (data) => {
            const newMessage = new messageModel({ username: data.username, message: data.message });
            newMessage.save();
            socketIO.emit('chat message', data);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    server.listen(process.env.PORT);
// }
  // const options = {
  //   key: fs.readFileSync('../client-key.pem'),
  //   cert: fs.readFileSync('../client-cert.pem')
  // };
  // https.createServer(options, app).listen(process.env.HTTPS_PORT);
});
