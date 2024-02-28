import express, { Router } from "express";
import { ImageController } from "../controllers";
import { uploadImage } from "./utils";

const router: Router = express.Router();

const imageController = new ImageController();

/**
 * @swagger
 * api/image/uploadImage/{userId}:
 *   post:
 *     summary: Uploads an image to server.
 *     description: upload an image file to the server and if fileName received so delete the file. The image file should be sent as form data. the response is the name of the created file
 *     tags:
 *       - Images
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: false
 *         type: string
 *         description: The previus image file name of the report.
 *       - in: formData
 *         name: image
 *         type: file
 *         required: true
 *         description: The image file to upload.
 *     responses:
 *       200:
 *         description: Image uploaded successfully.
 *       400:
 *         description: Bad request, such as missing file or invalid user ID.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/uploadImage/:fileName?",
  uploadImage.single("image"),
  imageController.uploadImage
);

export default router;
