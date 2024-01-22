import path from 'path';
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';
import {imageModel} from "../models/images/images.model";

export const imagesDirName: string = 'images';
const innerImagesDirName: string = path.join('public', imagesDirName);

const IMAGES_DIR = path.join(path.join(__dirname, '..', '..'), innerImagesDirName);

export const saveFile = (file, userId, callback): void => {
    const fileName = uuidv4() + path.extname(file.originalname);
    const newPath = path.join(IMAGES_DIR, fileName);
    const newImage = new imageModel({userId: userId, imageName: fileName});
    newImage.save();

    fs.writeFile(newPath, file.buffer, callback);
};

export const getFileUserId = async (userId: string) => {
    const imageEntity = await imageModel.findOne({userId: userId});
    return path.join(imagesDirName, imageEntity.imageName);
};

