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
  test("Test uploadImage with file", async () => {
    const filePath = path.resolve(__dirname, "test_image.jpg"); // Path to your test image file

    const response = await request(app)
      .post("/images/upload")
      .attach("file", filePath);

    expect(response.statusCode).toBe(200);
    expect(response.text).toBeTruthy(); // Expect a non-empty response indicating the uploaded filename

    // Clean up the uploaded file
    unlinkSync(path.join(IMAGES_DIR, response.text));
  });

  test("Test uploadImage without file", async () => {
    const response = await request(app)
      .post("/images/upload");

    expect(response.statusCode).toBe(400);
    expect(response.text).toBe("No Image uploaded.");
  });

  // Add more tests as needed for different scenarios
});
