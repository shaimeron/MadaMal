import env from "dotenv";
import express, {Express} from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import {IMAGES_DIR} from "./common/imageHandler";
import cors from "cors";
import path from "path";
import apiRouter from './routes/index'
import {openapiSpecification} from "./routes/utils";

env.config();

const initApp = (): Promise<Express> => {
    return new Promise<Express>((resolve) => {
        const db = mongoose.connection;
        db.once("open", () => console.log("Connected to Database"));
        db.on("error", (error) => console.error(error));
        const url = process.env.DB_URL;
        mongoose.connect(url!).then(() => {
            const app = express();
            app.use(cors());
            app.use(bodyParser.json({limit: "50mb"}));
            app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
            app.use((req, res, next) => {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Methods", "*");
                res.header("Access-Control-Allow-Headers", "*");
                next();
            });

            app.use('/api', apiRouter);
            app.use("/api", express.static(IMAGES_DIR));

            app.use(
                "/api/api-docs",
                swaggerUi.serve,
                swaggerUi.setup(openapiSpecification)
            );

            if (process.env.NODE_ENV === "production") {
                app.get("*", (req, res) => {
                    if (!req.path.startsWith("/api")) {
                        const filePath = `../client/dist${
                            req.path === "/" ? "/index.html" : req.path
                        }`;
                        res.sendFile(path.resolve(filePath));
                    }
                });
            }

            resolve(app);
        });
    });
};

export default initApp;
