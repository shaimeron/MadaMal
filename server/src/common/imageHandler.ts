import path from "path";

export const imagesDirName: string = "images";
const innerImagesDirName: string = path.join("public", imagesDirName);

export const IMAGES_DIR = path.join(
  path.join(__dirname, "..", ".."),
  innerImagesDirName
);
