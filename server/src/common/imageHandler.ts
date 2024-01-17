import path from 'path';
import fs from "fs";

export const imagesDirName: string = 'images';

const IMAGES_DIR = path.join(__dirname, imagesDirName);

export const saveFile = (file, callback): void => {
    const newPath = path.join(IMAGES_DIR, file.originalname);
    fs.writeFile(newPath, file.buffer, callback);
};

export const getFileByName = (filename: string) => {
    return path.join(IMAGES_DIR, filename);
};

