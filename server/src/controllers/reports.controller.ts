import { Request, Response } from "express";
import {
  IReportDTO,
  IUpdateInReportDTO,
  reportsModel,
} from "../models/reports";

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
    const reportDto: IReportDTO = req.body;
    const obj = await reportsModel.create(reportDto);
    res.status(201).send(obj);
  }

  async updateReport(req: Request, res: Response) {
    const { _id, ...restOfDTO }: IReportDTO = req.body;
    const obj = await reportsModel.updateOne({ _id }, restOfDTO);
    res.status(201).send(obj);
  }

  async deleteById(req: Request, res: Response) {
    const _id: string = req.params.id;
    const obj = await reportsModel.deleteOne({ _id });
    res.send(
      `${obj.deletedCount ? "" : "failed to "}delete report by id: ${_id}`
    );
  }

  async addUpdateToReport(req: Request, res: Response) {
    const { reportId, ...updateBody }: IUpdateInReportDTO = req.body;

    await reportsModel.updateOne(
      { _id: reportId },
      { $push: { updates: updateBody } }
    );
    res.send(`added update to report ${reportId}`);
  }

  changeUpdateInReport(req: Request, res: Response) {
    res.send("delete student by id: " + req.params.id);
  }

  deleteUpdateFromReport(req: Request, res: Response) {
    res.send("delete student by id: " + req.params.id);
  }
}
