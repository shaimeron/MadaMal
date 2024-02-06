import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import { Express } from "express";
import User from "../models/user_model";

let app: Express;
let userId: string;

beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("UsersController tests", () => {
  test("Test getById", async () => {
    // First, create a user
    const user = await User.create({
      email: "testUser@example.com",
      password: "password",
      fullname: "Test User",
      imageUrl: "https://example.com/avatar.jpg"
    });
    userId = user._id;

    const response = await request(app)
      .get(`/users/${userId}`)
      .send();

    expect(response.statusCode).toBe(200);
    // Add assertions for the response body as needed
  });

  test("Test updateUser", async () => {
    const updatedData = {
      password: "newpassword",
      fullname: "Updated Name",
      imageUrl: "https://example.com/newavatar.jpg"
    };

    const response = await request(app)
      .put(`/users/${userId}`)
      .send(updatedData);

    expect(response.statusCode).toBe(200);
    // Add assertions for the response body as needed
  });

  // Add more tests as needed for error cases, missing fields, etc.
});
