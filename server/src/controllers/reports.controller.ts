import {Request, Response} from "express";
import {IReportDTO, IReportForDisplay, IReportItem, IUpdateInReportDTO, ReportsModel,} from "../models/reports";
import {deleteImage} from "../common/imageHandler";
import {UsersModel} from "../models/users";
import mongoose from "mongoose";

export class ReportsController {
  async getAll(req: Request, res: Response) {
    try {
    const reports: IReportForDisplay[] = await ReportsModel.aggregate([
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
          updatesCount: {
            $cond: {
              if: { $isArray: "$updates" },
              then: { $size: "$updates" },
              else: "0",
            },
          },
        },
      },
      { $unset: ["updates"] },
    ]);

    res.send(reports);
    } catch (e) {
      res.sendStatus(500);
    }
  }

  async getById(req: Request, res: Response) {

    try {
      const report = await ReportsModel.findById(req.params.id);
      res.send(report);
    } catch (e) {
      res.sendStatus(500);
    }
  }

  async getUpdatesByReportId(req: Request, res: Response) {
    try {
    const updates: IReportItem[] = (
      await ReportsModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(req.params.reportId),
          },
        },
        {
          $lookup: {
            from: UsersModel.collection.name,
            localField: "updates.ownerId",
            foreignField: "_id",
            as: "updatesOwner",
          },
        },
        {
          $set: {
            updates: {
              $map: {
                input: "$updates",
                in: {
                  $mergeObjects: [
                    "$$this",
                    {
                      ownerName: {
                        $arrayElemAt: [
                          "$updatesOwner.fullname",
                          {
                            $indexOfArray: [
                              "$updatesOwner.id",
                              "$$this.ownerId",
                            ],
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        { $unset: "updatesOwner" },
        {
          $project: {
            updates: 1,
            _id: 0,
          },
        },
      ])
    )[0]?.updates;

    res.send(updates);
    } catch (e) {
        res.sendStatus(500);
    }
  }

  async createReport(req: Request, res: Response) {
    try {
      const reportDto: IReportDTO = req.body;
      const obj = await ReportsModel.create(reportDto);
      res.status(201).send(obj);
    } catch (e) {
        res.sendStatus(500);
    }
  }

  async updateReport(req: Request, res: Response) {
    try {
      const { _id, ...restOfDTO }: IReportDTO = req.body;
      const obj = await ReportsModel.updateOne({ _id }, restOfDTO);
      res.status(201).send(obj);
    } catch (e) {
        res.sendStatus(500);
    }
  }

  async deleteById(req: Request, res: Response) {
    try {
      const _id: string = req.params.id;
      const report = await ReportsModel.findById(_id);
      const obj = await report.deleteOne();
      if (report.imageName) deleteImage(report.imageName);

      res.send(
        `${obj.deletedCount ? "" : "failed to "}delete report by id: ${_id}`
      );
    } catch (e) {
        res.sendStatus(500);
    }
  }

  async addUpdateToReport(req: Request, res: Response) {
    try {
      const { reportId, ...updateBody }: IUpdateInReportDTO = req.body;

      await ReportsModel.updateOne(
        { _id: reportId },
        { $push: { updates: updateBody } }
      );
      res.send(`added update to report ${reportId}`);
    } catch (e) {
        res.sendStatus(500);
    }
  }

  async changeUpdateInReport(req: Request, res: Response) {
    try {
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
    } catch (e) {
        res.sendStatus(500);
    }
  }

  async deleteUpdateFromReport(req: Request, res: Response) {
    try {
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
    } catch (e) {
        res.sendStatus(500);
    }
  }
}
