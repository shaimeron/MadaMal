import {saveFile, getFileByName} from '../common/imageHandler';
import {Request, Response} from "express";
import fs from "fs";

export class ImageController {
    uploadImage = (req: Request, res: Response) => {
        if (!req.file) {
            return res.status(400).send('No Image uploaded.');
        }

        saveFile(req.file, (err) => {
            if (err) {
                return res.status(500).send('Server error in saving Image.');
            }

            res.json({message: 'Image uploaded successfully', filename: req.body.imageName});
        });
    };

    getImage = (req: Request, res: Response) => {
        const filepath = getFileByName(req.params.filename);

        if (!fs.existsSync(filepath)) {
            return res.status(404).send('Image not found');
        }

        res.sendFile(filepath);
    };
}
