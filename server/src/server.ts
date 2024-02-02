import initApp from "./app";
// import https from "https";
import http from "http";
import { startSocketIO } from "./socketIO";

initApp().then((app) => {
  // if (process.env.NODE_ENV !== 'production') {
  // console.log('development');
  const server = http.createServer(app);
  startSocketIO(server);

  server.listen(process.env.PORT);
  // }
  // const options = {
  //   key: fs.readFileSync('../client-key.pem'),
  //   cert: fs.readFileSync('../client-cert.pem')
  // };
  // https.createServer(options, app).listen(process.env.HTTPS_PORT);
});
