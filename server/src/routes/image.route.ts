import express, {Router} from "express";
import {ImageController} from "../controllers";
import multer from "multer";
import {imagesDirName} from "../common";
const router: Router = express.Router();
const storage = multer.memoryStorage();

const uploadImage = multer({ dest: imagesDirName, storage: storage });

const imageController = new ImageController();

router.post("/uploadImage", uploadImage.single('image'), imageController.uploadImage);
router.get("/getImage/:filename", imageController.getImage);

export default router;