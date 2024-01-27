import env from "dotenv";
env.config();
import express, { Express } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import reportsRoute from "./routes/reports.route";
import usersRoute from "./routes/users.route";
import authRoute from "./routes/auth_route";
import cors from "cors";
import imageRoute from "./routes/image.route";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MadaMal API",
      version: "1.0.0",
    },
  },
  apis: [`${__dirname}/routes/*.ts`], // Path to the API docs
};
const openapiSpecification = swaggerJSDoc(options);

const initApp = (): Promise<Express> => {
  const promise = new Promise<Express>((resolve) => {
    const db = mongoose.connection;
    db.once("open", () => console.log("Connected to Database"));
    db.on("error", (error) => console.error(error));
    const url = process.env.DB_URL;
    mongoose.connect(url!).then(() => {
      const app = express();
      app.use(express.static("public"));
      app.use(
        cors({
          origin: "*",
          // Replace with your client app's URL

          methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "*"],
        })
      );
      app.use(bodyParser.json({ limit: "50mb" }));
      app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
      app.use("/reports", reportsRoute);
      app.use("/auth", authRoute);
      app.use("/image", imageRoute);
      app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(openapiSpecification)
      );
      app.use("/users", usersRoute);
      resolve(app);
    });
  });
  return promise;
};

export default initApp;
