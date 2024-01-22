import {saveFile, getFileUserId} from '../common/imageHandler';
import {Request, Response} from "express";

export class ImageController {
    uploadImage = (req: Request, res: Response) => {
        if (!req.file) {
            return res.status(400).send('No Image uploaded.');
        }

        saveFile(req.file, req.params.userId, (err) => {
            if (err) {
                return res.status(500).send('Server error in saving Image.');
            }

            res.status(200).send('Image saved.');
        });
    };

    getImage = async (req: Request, res: Response) => {
        const filepath = await getFileUserId(req.params.userId);

        res.send(filepath);
    };
}
