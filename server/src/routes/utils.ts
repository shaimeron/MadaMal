import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { IMAGES_DIR } from "../common/imageHandler";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, IMAGES_DIR);
  },
  filename: function (req, file, cb) {
    const fileNameForSave =
      (req.params.fileName ?? uuidv4()) + path.extname(file.originalname);
    return cb(null, fileNameForSave);
  },
});

export const uploadImage = multer({ storage });
