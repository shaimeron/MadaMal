import { PipelineStage } from "mongoose";
import {
  IMessage,
  IMessageForClient,
  IMessagesDTO,
  MessageModel,
} from "../models/messages";
import { UsersModel } from "../models/users";

const messageUserNameAggregation: PipelineStage[] = [
  {
    $lookup: {
      from: UsersModel.collection.name,
      localField: "userId",
      foreignField: "_id",
      as: "username",
    },
  },
  {
    $set: {
      username: { $arrayElemAt: ["$username.fullname", 0] },
    },
  },
  { $unset: ["userId"] },
];

export class SocketIOController {
  async getChetHistory(): Promise<IMessageForClient[]> {
    return await MessageModel.aggregate([
      ...messageUserNameAggregation,
      { $sort: { timestamp: 1 } },
      { $limit: 50 },
    ]);
  }

  async newMessage(data: IMessagesDTO): Promise<IMessageForClient> {
    const savedMessage: IMessage = await MessageModel.create(data);
    return (
      await MessageModel.aggregate([
        {
          $match: {
            _id: savedMessage._id,
          },
        },
        ...messageUserNameAggregation,
      ])
    )[0];
  }

  onDisconnect() {
    console.log("Client disconnected");
  }
}
