import path from "path";
import fs from "fs";

export const imagesDirName: string = "images";
const innerImagesDirName: string = path.join("public", imagesDirName);

export const IMAGES_DIR = path.join(
  path.join(__dirname, "..", ".."),
  innerImagesDirName
);

export const deleteImage = (imageName: string): void => {
  try {
    fs.rmSync(path.join(IMAGES_DIR, imageName), {
      force: true,
    });
  } catch (error) {
    console.log(`failed to delete image with name: ${imageName}`);
  }
};
