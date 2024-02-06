import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { IMAGES_DIR } from "../common/imageHandler";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, IMAGES_DIR);
  },
  filename: function (req, file, cb) {
    return cb(null, uuidv4() + path.extname(file.originalname));
  },
});

export const getImageUrl = (imageUrl: string) => {
  if (imageUrl.length === 0 || imageUrl.includes('http')) {
    return imageUrl;
  }

  return `${process.env.SERVER_URL}:${process.env.PORT}/${imageUrl}`
}

export const uploadImage = multer({ storage });
