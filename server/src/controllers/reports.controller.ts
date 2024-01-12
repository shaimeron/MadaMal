import { Request, Response } from "express";
import { reportsModel } from "../models";

export class ReportsController {
  async getAll(req: Request, res: Response) {
    const reports = await reportsModel.find();
    res.send(reports);
  }

  async getById(req: Request, res: Response) {
    const report = await reportsModel.findById(req.params.id);
    res.send(report);
  }

  async createReport(req: Request, res: Response) {
    const obj = await reportsModel.create(req.body);
    res.status(201).send(obj);
  }

  updateReport(req: Request, res: Response) {
    res.send("put student by id: " + req.params.id);
  }

  deleteById(req: Request, res: Response) {
    res.send("delete student by id: " + req.params.id);
  }

  addUpdateToReport(req: Request, res: Response) {
    res.send("delete student by id: " + req.params.id);
  }

  changeUpdateInReport(req: Request, res: Response) {
    res.send("delete student by id: " + req.params.id);
  }

  deleteUpdateFromReport(req: Request, res: Response) {
    res.send("delete student by id: " + req.params.id);
  }
}
