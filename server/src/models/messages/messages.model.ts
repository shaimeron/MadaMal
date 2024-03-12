import mongoose, {ObjectId, Schema} from "mongoose";
import {UsersModel} from "../users";

export interface IMessage {
  _id?: ObjectId;
  message: string;
  userId: ObjectId;
  timestamp: Date;
}

export interface IMessageForClient extends Omit<IMessage, "userId"> {
  username: string;
}

const messageSchema = new mongoose.Schema<IMessage>({
  message: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: UsersModel.collection.name,
  },
  timestamp: { type: Date, default: Date.now },
});

export const MessageModel = mongoose.model("Message", messageSchema);
