import multer from "multer";
import {v4 as uuidv4} from "uuid";
import {IMAGES_DIR} from "../common/imageHandler";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, IMAGES_DIR);
  },
  filename: function (req, file, cb) {
    return cb(null, uuidv4() + path.extname(file.originalname));
  },
});

export const uploadImage = multer({ storage });

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MadaMal API",
      version: "1.0.0",
    },
  },
  apis: [`${__dirname}/routes/*.ts`, `${__dirname}/routes/*.js`], // Path to the API docs
};
export const openapiSpecification = swaggerJSDoc(options);

