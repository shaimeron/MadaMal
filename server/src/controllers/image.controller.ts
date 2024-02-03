import { Request, Response } from "express";
import { IMAGES_DIR, deleteImage } from "../common/imageHandler";
import path from "path";
import fs from "fs";

export class ImageController {
  uploadImage = (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).send("No Image uploaded.");
    }

    const fileName = req.params.fileName;
    if (fileName) deleteImage(fileName);

    res.status(200).send(req?.file.filename);
  };
}
