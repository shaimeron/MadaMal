import env from "dotenv";
env.config();
import express, { Express } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import reportsRoute from "./routes/reports.route";
import authRoute from "./routes/auth_route";
import cors from "cors";
import imageRoute from "./routes/image.route";

const initApp = (): Promise<Express> => {
  const promise = new Promise<Express>((resolve) => {
    const db = mongoose.connection;
    db.once("open", () => console.log("Connected to Database"));
    db.on("error", (error) => console.error(error));
    const url = process.env.DB_URL;
    mongoose.connect(url!).then(() => {
      const app = express();
      app.use(cors({
        origin: "*", // Replace with your client app's URL
        methods: ["GET", "POST"]
      }))
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use("/reports", reportsRoute);
      app.use("/auth", authRoute);
      app.use('/image', imageRoute);
      resolve(app);
    });
  });
  return promise;
};

export default initApp;


