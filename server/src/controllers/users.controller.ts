import { Request, Response } from "express";
import userModel from "../models/user_model";

export class UsersController {
  async getById(req: Request, res: Response) {
    const report = await userModel.findById(req.params.id).select('-password -__v -refreshTokens');
    res.send(report);
  }
}
