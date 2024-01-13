import { Schema, model } from "mongoose";

export interface IReportItem {
    creationDate: Date
    ownerId: string,
    data: string
}

export interface IReport extends IReportItem {
    updates: IReportItem[];
}

const reportItemSchema = new Schema<IReportItem>({
    data: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
  });

const reportsSchema = new Schema<IReport>({
    ...reportItemSchema.obj,
    updates: {
        type: [reportItemSchema],
        default: []
    }
})

export const reportsModel = model<IReport>("reports", reportsSchema);

