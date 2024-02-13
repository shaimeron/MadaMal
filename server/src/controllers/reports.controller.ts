import { Request, Response } from "express";
import {
  IReport,
  IReportDTO,
  IUpdateInReportDTO,
  ReportsModel,
} from "../models/reports";
import { deleteImage } from "../common/imageHandler";
import { UsersModel } from "../models/users";

export class ReportsController {
  async getAll(req: Request, res: Response) {
    const reports: IReport[] = await ReportsModel.aggregate([
      {
        $lookup: {
          from: UsersModel.collection.name,
          localField: "ownerId",
          foreignField: "_id",
          as: "ownerName",
        },
      },
      {
        $set: {
          ownerName: { $arrayElemAt: ["$ownerName.fullname", 0] },
        },
      },
    ]);

    res.send(reports);
  }

  async getById(req: Request, res: Response) {
    const report = await ReportsModel.findById(req.params.id);
    res.send(report);
  }

  async createReport(req: Request, res: Response) {
    const reportDto: IReportDTO = req.body;
    const obj = await ReportsModel.create(reportDto);
    res.status(201).send(obj);
  }

  async updateReport(req: Request, res: Response) {
    const { _id, ...restOfDTO }: IReportDTO = req.body;
    const obj = await ReportsModel.updateOne({ _id }, restOfDTO);
    res.status(201).send(obj);
  }

  async deleteById(req: Request, res: Response) {
    const _id: string = req.params.id;
    const report = await ReportsModel.findById(_id);
    const obj = await report.deleteOne();
    if (report.imageName) deleteImage(report.imageName);

    res.send(
      `${obj.deletedCount ? "" : "failed to "}delete report by id: ${_id}`
    );
  }

  async addUpdateToReport(req: Request, res: Response) {
    const { reportId, ...updateBody }: IUpdateInReportDTO = req.body;

    await ReportsModel.updateOne(
      { _id: reportId },
      { $push: { updates: updateBody } }
    );
    res.send(`added update to report ${reportId}`);
  }

  async changeUpdateInReport(req: Request, res: Response) {
    const { reportId, _id, data }: IUpdateInReportDTO = req.body;
    const obj = await ReportsModel.updateOne(
      { _id: reportId, updates: { $elemMatch: { _id } } },
      { $set: { "updates.$.data": data } }
    );
    res.send(
      `${
        obj.acknowledged ? "" : "failed to "
      }change update ${_id} in report ${reportId}`
    );
  }

  async deleteUpdateFromReport(req: Request, res: Response) {
    const { reportId, updateId } = req.params;
    const obj = await ReportsModel.updateOne(
      { _id: reportId },
      {
        $pull: {
          updates: { _id: updateId },
        },
      }
    );
    res.status(201).send(obj);
  }
}
