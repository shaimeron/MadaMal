import {Request, Response} from "express";
import {deleteImage} from "../common/imageHandler";

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
