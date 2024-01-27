import express, { Router } from "express";
import { ImageController } from "../controllers";
import { uploadImage } from "./utils";

const router: Router = express.Router();

const imageController = new ImageController();

/**
 * @swagger
 * /uploadImage/{userId}:
 *   post:
 *     summary: Uploads an image for a specific user.
 *     description: Allows a user to upload an image file to their profile. The image file should be sent as form data.
 *     tags:
 *       - Images
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         type: string
 *         description: The unique identifier of the user.
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
/**
 * @swagger
 * /getImage/{userId}:
 *   get:
 *     summary: Retrieves the image path for a specific user.
 *     description: Provides the ability to retrieve the image path associated with a given user's profile.
 *     tags:
 *       - Images
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         type: string
 *         description: The unique identifier of the user.
 *     responses:
 *       200:
 *         description: Image path retrieved successfully.
 *         content:
 *           string:
 *             schema:
 *               type: string
 *               format: string
 *       404:
 *         description: No image found for the given user ID.
 *       500:
 *         description: Internal server error.
 */
router.get("/getImage/:userId", imageController.getImage);
export default router;
