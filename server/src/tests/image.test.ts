import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import { Express } from "express";
import { unlinkSync } from "fs";
import path from "path";
import { IMAGES_DIR } from "../common/imageHandler";

let app: Express;

beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("ImageController tests", () => {
  test("Test uploadImage with wrong file name", async () => {
    const filePath = path.resolve(__dirname, "test_image.jpg");

    const response = await request(app)
      .post("/api/image/uploadImage/wrong_name.jpg")
      .attach("file", filePath);

    expect(response.statusCode).toBe(500);
    expect(response.text).toBeTruthy();
  });

  test("Test uploadImage without file", async () => {
    const response = await request(app)
      .post("/api/image/uploadImage/test_image.jpg");

    expect(response.statusCode).toBe(400);
    expect(response.text).toBe("No Image uploaded.");
  });
});
