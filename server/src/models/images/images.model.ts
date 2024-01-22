import mongoose from "mongoose";

const imagesSchema = new mongoose.Schema({
    userId: String,
    imageName: String,
});

export const imageModel = mongoose.model('Image', imagesSchema);