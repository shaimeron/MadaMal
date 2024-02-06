import { api } from "@/api";

export const uploadImage = async (imageFile: File) => {
  const image = new FormData();
  image.append("image", imageFile);
  return await api.image.uploadImage(image);
};
