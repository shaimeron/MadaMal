import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import { Express } from "express";
import { UsersModel } from "../models/users/user.model";

let app: Express;
const user = {
  email: "testUser@test.com",
  password: "1234567890",
  fullname: "Test User",
};

beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
});

afterAll(async () => {
  await UsersModel.deleteMany({ email: user.email });
  await mongoose.connection.close();
});

let accessToken: string;
let refreshToken: string;
let newRefreshToken: string;

describe("Auth tests", () => {
  test("Test Register", async () => {
    const response = await request(app).post("/api/auth/register").send(user);
    expect(response.statusCode).toBe(201);
  });

  test("Test Register exist email", async () => {
    const response = await request(app).post("/api/auth/register").send(user);
    expect(response.statusCode).toBe(406);
  });

  test("Test Register missing password", async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: "test@test.com",
    });
    expect(response.statusCode).toBe(400);
  });

  test("Test Login", async () => {
    const response = await request(app).post("/api/auth/login").send(user);
    expect(response.statusCode).toBe(200);
    accessToken = response.body.accessToken;
    refreshToken = response.body.refreshToken;
    expect(accessToken).toBeDefined();
  });

  jest.setTimeout(10000);


});
