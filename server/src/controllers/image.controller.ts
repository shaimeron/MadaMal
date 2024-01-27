import { Request, Response } from "express";
import { IMAGES_DIR } from "../common/imageHandler";
import path from "path";
import fs from "fs";

export class ImageController {
  uploadImage = (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).send("No Image uploaded.");
    }

    if (req.params.fileName) {
      fs.rmSync(path.join(IMAGES_DIR, req.params.fileName), {
        force: true,
      });
    }

    res.status(200).send(req?.file.filename);
  };
}
