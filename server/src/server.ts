import initApp from "./app";
import https from "https";
import http from "http";
import fs from "fs";
import { startSocketIO } from "./socketIO";

initApp().then((app) => {
  let server: http.Server | https.Server;

  if (process.env.NODE_ENV !== "production") {
    console.log("development");
    server = http.createServer(app);
    server.listen(process.env.PORT);
  } else {
    console.log("PRODUCTION");

    const httpsOptions = {
      key: fs.readFileSync("../client-key.pem"),
      cert: fs.readFileSync("../client-cert.pem"),
    };
    server = https.createServer(httpsOptions, app);
    server.listen(process.env.HTTPS_PORT);
  }

  startSocketIO(server);
});
