import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import { Express } from "express";
import { ReportsModel } from "../models/reports"; // Make sure to import your ReportsModel interface
import { IReportDTO } from "../models/reports"; // Import your DTO interfaces

let app: Express;
let reportId: string;

beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
});

afterAll(async () => {
  await ReportsModel.deleteMany({ownerId: "5e4ba1f05717192b9c565321"});
  await mongoose.connection.close();
});

describe("ReportsController tests", () => {
  test("Test createReport", async () => {
    const reportData: IReportDTO = {
      data: "Test data",
      imageName: "Test image name",
      ownerId: "5e4ba1f05717192b9c565321",
    };

    const response = await request(app)
      .post(`/api/reports`)
      .send(reportData);

    expect(response.statusCode).toBe(201);
    reportId = response.body._id;
  });

  test("Test updateReport", async () => {
    const reportData: IReportDTO = {
      _id: reportId,
      data: "Updated test data",
      imageName: "Updated test image name",
      ownerId: "5e4ba1f05717192b9c565321",
    };

    const response = await request(app)
      .put("/api/reports")
      .send(reportData);

    expect(response.statusCode).toBe(201);
  });

  test("Test getAll", async () => {
    const response = await request(app).get("/api/reports/all");

    expect(response.statusCode).toBe(200);
  });

  test("Test getById", async () => {
    const response = await request(app).get(`/api/reports/${reportId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(reportId);
  });

  test("Test deleteById", async () => {
    const response = await request(app).delete(`/api/reports/${reportId}`);

    expect(response.statusCode).toBe(200);
  });
});
