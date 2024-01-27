import { Request, Response } from "express";

export class ImageController {
  uploadImage = (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).send("No Image uploaded.");
    }

    res.status(200).send(req?.file.filename);
  };

  getImage = async (req: Request, res: Response) => {
    // const filepath = await getFileUserId(req.params.userId);
    // res.send(filepath);
  };
}
