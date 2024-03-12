import { ObjectId, Schema, model } from "mongoose";
import { UsersModel } from "../users";

export interface IReportItem {
  creationDate: Date;
  ownerId: ObjectId;
  data: string;
  ownerName?: string;
}

export interface IReport extends IReportItem {
  updates: IReportItem[];
  imageName: string;
}

export interface IReportForDisplay extends Omit<IReportItem, "updates"> {
  updatesCount: number;
}

const reportItemSchema = new Schema<IReportItem>({
  data: {
    type: String,
    required: true,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: UsersModel.collection.name,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

const reportsSchema = new Schema<IReport>({
  ...reportItemSchema.obj,
  updates: {
    type: [reportItemSchema],
    default: [],
  },
  imageName: {
    type: String,
  },
});

export const ReportsModel = model<IReport>("reports", reportsSchema);
